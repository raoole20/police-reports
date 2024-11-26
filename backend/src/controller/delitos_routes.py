import json
from flask import Blueprint, current_app, jsonify, request
from flask_jwt_extended import jwt_required
from utils.index import decrypt, encrypt

delitos_routes = Blueprint("delitos_routes", __name__)


@delitos_routes.route("/", methods=["GET"])
@jwt_required()
def getAll():
    query = """
        SELECT id, nombre, descripcion
        FROM cops_sql.delitos
    """

    conexion = current_app.config["MYSQL_CONNECTION"]
    cursor = conexion.connection.cursor()
    cursor.execute(query)
    cops = cursor.fetchall()

    columnas = ["id", "nombre", "descripcion"]

    # Convertir cada tupla en un diccionario
    datos = [dict(zip(columnas, tupla)) for tupla in cops]
    json_data = datos

    return jsonify(
        {"message": "Lista Delitos", "error": False, "data":json_data}
    )

@delitos_routes.route("/", methods=["POST"])
@jwt_required()
def createDelitos():
    data = request.get_json()
    nombre = data.get("nombre")
    descripcion = data.get("descripcion")
    
    query = """
        INSERT INTO cops_sql.delitos (nombre, descripcion) VALUES('{}', '{}')
    """.format(nombre, descripcion)

    print(query)
    try:
        conexion = current_app.config["MYSQL_CONNECTION"]
        cursor = conexion.connection.cursor()
        try:
            cursor.execute(query)
            cursor.connection.commit()

            return jsonify({"error": False, "message": "Datos guardados correctamente", 'data': None}), 201
        except Exception as e:
            print(e)
            if(e.args[0] == 1452):
                return jsonify({"error": True, "message": "El id del policia no existe",}), 400
            
            return jsonify({"error": True, "message": "Error al guardar los datos", "data": e.__str__()}), 500
    except Exception as e:
        print(e)
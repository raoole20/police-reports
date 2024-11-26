import json
from flask import Blueprint, current_app, jsonify, request
from flask_jwt_extended import jwt_required
from utils.index import decrypt, encrypt

reports_router = Blueprint("reports_router", __name__)


@reports_router.route("/", methods=["GET"])
# @jwt_required()
def getAll():
    query = """
        SELECT id, fecha, id_policia, descripcion, estatus, ciudadanos_id, direcciones_id1 FROM cops_sql.reportes
    """

    conexion = current_app.config["MYSQL_CONNECTION"]
    cursor = conexion.connection.cursor()
    cursor.execute(query)
    cops = cursor.fetchall()

    columnas = ["id", "fecha", "id_policia", "descripcion", "estatus", "ciudadanos_id", "direcciones_id1"]

    # Convertir cada tupla en un diccionario
    datos = [dict(zip(columnas, tupla)) for tupla in cops]
    json_data = json.dumps(datos, ensure_ascii=False, indent=4)

    return jsonify(
        {"message": "Lista reportes", "error": False, "data":json_data}
    )

@reports_router.route("/", methods=["POST"])
def createReports():
    data = request.get_json()
    descripcion = data.get("descripcion")
    policeID = data.get("id_policia")
    status = data.get("estatus")
    citizenID = data.get("ciudadanos_id")
    addressID = data.get("direcciones_id1")    

    query = """
        INSERT INTO cops_sql.reportes (fecha, id_policia, descripcion, estatus) VALUES(CURRENT_DATE(), {}, '{}', '{}')
    """.format(policeID, descripcion, status)

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
        return jsonify({"error": True, "message": "Internl server error"}), 500


@reports_router.route("/<int:report_id>", methods=["PUT"])
def updateReport(report_id):
    data = request.get_json()
    status = data.get("estatus")

    query = """
        UPDATE cops_sql.reportes SET estatus = '{}' WHERE id = {}
    """.format(status, report_id)

    try:
        conexion = current_app.config["MYSQL_CONNECTION"]
        cursor = conexion.connection.cursor()
        try:
            cursor.execute(query)
            cursor.connection.commit()

            return jsonify({"error": False, "message": "Datos actualizados correctamente", 'data': None}), 201
        except Exception as e:
            print(e)
            return jsonify({"error": True, "message": "Error al actualizar los datos", "data": e.__str__()}), 500
    except Exception as e:
        print(e)
        return jsonify({"error": True, "message": "Internl server error"}), 500
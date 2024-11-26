from datetime import datetime 
import json
from flask import Blueprint, current_app, jsonify, request
from flask_jwt_extended import jwt_required
from utils.index import decrypt, encrypt

reports_router = Blueprint("reports_router", __name__)


@reports_router.route("/", methods=["GET"])
# @jwt_required()
def getAll():
    query = """
       SELECT 
            r.id AS reporte_id,
            r.fecha,
            r.descripcion,
            r.estatus,
            c.id AS ciudadano_id,
            c.nombre,
            c.apellido,
            c.cedula,
            c.sexo,
            c.estado_civil,
            c.fecha_nacimiento,
            p.id AS policia_id,
            p.nombre AS policia_nombre,
            p.apellido AS policia_apellido
        FROM 
            cops_sql.reportes r
        JOIN 
            ciudadanos c ON c.id = r.ciudadanos_id
        JOIN 
            policias p ON p.id = r.id_policia;
    """

    conexion = current_app.config["MYSQL_CONNECTION"]
    cursor = conexion.connection.cursor()
    cursor.execute(query)
    cops = cursor.fetchall()
    columnas = [
        "reporte_id", "fecha", "descripcion", "estatus", 
        "ciudadano_id", "nombre", "apellido", "cedula", 
        "sexo", "estado_civil", "fecha_nacimiento", 
        "policia_id", "policia_nombre", "policia_apellido"
    ]


    # Convertir cada tupla en un diccionario
    datos = [dict(zip(columnas, tupla)) for tupla in cops]

    return jsonify(
        {"message": "Lista reportes", "error": False, "data":datos}
    )


#   descripcion:     string;
#     fecha:           string;
#     cargos:          string | number[];
@reports_router.route("/<int:pID>/<int:cID>", methods=["POST"])
def createReports(pID, cID):
    data = request.get_json()
    descripcion = data.get("descripcion")
    fecha = data.get("fecha")
    cargos = data.get("cargos")  # array 

    # Validar que la fecha esté en el formato correcto
    try:
        datetime.strptime(fecha, '%Y-%m-%d')
    except ValueError:
        return jsonify({"error": True, "message": "Fecha no válida, debe estar en formato YYYY-MM-DD"}), 400

    query = """
        INSERT INTO cops_sql.reportes
          (fecha, id_policia, descripcion, ciudadanos_id)
            VALUES('{}', {}, '{}', {})
    """.format(fecha, pID, descripcion, cID)


    print(cargos)

    try:
        conexion = current_app.config["MYSQL_CONNECTION"]
        cursor = conexion.connection.cursor()
        try:
            cursor.execute(query)
            conexion.connection.commit()

            query = """ 
                SELECT LAST_INSERT_ID() as id
            """
            cursor.execute(query)
            report_id = cursor.fetchone()[0]
            print(report_id)
            for cargos in cargos:
                try:
                    query = """
                        INSERT INTO cargos
                        (reportes_id, delitos_id)
                        VALUES({}, {})
                    """.format(report_id,cargos)

                    cursor.execute(query)
                    conexion.connection.commit()
                except Exception as e:
                    print(e)
                    return jsonify({"error": True, "message": "error al crear un cargo", data: e.__str__()}), 400
               
            return jsonify({"error": False, "message": "Datos guardados correctamente", 'data': None}), 201
        except Exception as e:
            print(e)
            if e.args[0] == 1452:
                return jsonify({"error": True, "message": "El id del policia no existe"}), 400
            
            return jsonify({"error": True, "message": "Error al guardar los datos", "data": str(e)}), 500
    except Exception as e:
        print(e)
        return jsonify({"error": True, "message": "Internal server error"}), 500
    

@reports_router.route("/pending", methods=["GET"])
def getCasoPendientes():
    query = """
    SELECT count(*) FROM reportes WHERE estatus = 'IMPUTADO'
    """

    conexion = current_app.config["MYSQL_CONNECTION"]
    cursor = conexion.connection.cursor()
    cursor.execute(query)

    cops = cursor.fetchone()[0]

    return jsonify({"message": "Casos pendientes", "error": False, "data": cops})


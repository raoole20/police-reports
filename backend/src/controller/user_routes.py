import re
from flask import Blueprint, current_app, jsonify, request
from flask_jwt_extended import jwt_required
from utils.index import decrypt, encrypt

user_routes = Blueprint("user_routes", __name__)


@user_routes.route("/", methods=["GET"])
@jwt_required()
def saludo():
    conexion = current_app.config["MYSQL_CONNECTION"]
    cursor = conexion.connection.cursor()
    cursor.execute("SELECT * FROM ciudadanos")
    cuidadanos = cursor.fetchall()

    if not cuidadanos:
        return jsonify(
            {
                "message": "No existe un ciudadano con esa cedula",
                "error": True,
                "data": None,
            }
        ), 404
    cuidadanos_list = []
    column_names = [desc[0] for desc in cursor.description]

    for row in cuidadanos:
        cuidadano_dict = dict(zip(column_names, row))
        cuidadanos_list.append(cuidadano_dict)

    return jsonify(
        {
            "message": "Hola desde la ruta de policias",
            "error": False,
            "data": cuidadanos_list,
        }
    )

@user_routes.route("/<int:cedula>", methods=["GET"])
@jwt_required()
def getByCedula(cedula):
    query = """
        SELECT * FROM ciudadanos WHERE cedula = '{}'
    """.format(cedula)

    conexion = current_app.config["MYSQL_CONNECTION"]
    cursor = conexion.connection.cursor()
    cursor.execute(query)
    cuidadano = cursor.fetchone()


    if not cuidadano:
        return jsonify(
            {
                "message": "No existe un ciudadano con esa cedula",
                "error": True,
                "data": None,
            }
        ), 404
    column_names = [desc[0] for desc in cursor.description]
    cuidadano_dict = dict(zip(column_names, cuidadano))

    return jsonify(
        {
            "message": "Hola desde la ruta de policias",
            "error": False,
            "data": cuidadano_dict,
        }
    )
@user_routes.route("/", methods=["POST"])
def register():
    datos = request.get_json()
    nombre = datos.get("nombre")
    apellido = datos.get("apellido")
    cedula = datos.get("cedula")
    sexo = datos.get("sexo")
    estado_civil = datos.get("estado_civil")
    fecha_nacimiento = datos.get("fecha_nacimiento")

    variables = [nombre, apellido, sexo, estado_civil, fecha_nacimiento]

    if (
        not nombre
        or not apellido
        or not cedula
        or not sexo
        or not estado_civil
        or not fecha_nacimiento
    ):
        return jsonify({"message": "Faltan datos", "error": True})

    # Verificar si todas las variables son de tipo str
    if not all(isinstance(var, str) for var in variables):
        return jsonify({"message": "datos incorrectos, revisar json", "error": True})

    query = """
      INSERT INTO ciudadanos (
        nombre , 
        apellido ,
        cedula ,
        sexo ,
        estado_civil,
        fecha_nacimiento 
        ) VALUES (
            '{}',
            '{}',
            {},
            '{}',
            '{}',
            '{}'
        )
    """.format(nombre, apellido, cedula, sexo, estado_civil, fecha_nacimiento)

    try:
        conexion = current_app.config["MYSQL_CONNECTION"]
        cursor = conexion.connection.cursor()
        try:
            cursor.execute(query)
        except Exception as e:
            print(e)
            code = e.args[0]
            if code == 1062:
                return jsonify(
                    {
                        "error": True,
                        "message": "Ya existe un Ciudadano con esa cedula",
                        "data": None,
                    }
                ), 400
            return jsonify(
                {"error": True, "message": "Error al crear el Ciudadano", "data": str(e)}
            ), 400
        
        query = "SELECT * FROM ciudadanos WHERE cedula = '{}'".format(cedula)
        cursor.execute(query)
        cuidadano = cursor.fetchone()
        column_names = [desc[0] for desc in cursor.description]
        cuidadano_dict = dict(zip(column_names, cuidadano))

        conexion.connection.commit()

        return jsonify({"error": False, "message": "Usuario registrado", "data": cuidadano_dict})
    except Exception as e:
        print(e)
        return jsonify({"message": "Error al registrar usuario", "error": True}), 400

from re import A
from flask import Blueprint, current_app, jsonify, request
from flask_jwt_extended import jwt_required
from utils.index import encrypt

cops_routes = Blueprint("cops_routes", __name__)


@cops_routes.route("/", methods=["GET"])
def saludo():
    conexion = current_app.config["MYSQL_CONNECTION"]
    cursor = conexion.connection.cursor()
    cursor.execute("SELECT id, nombre, apellido, rango, id_policia FROM policias")
    cops = cursor.fetchall()

    column_response = ["id", "nombre", "apellido", "rango", "id_policia"]
    cops_list = []

    for cop in cops:
        cop_dict = dict(zip(column_response, cop))
        cops_list.append(cop_dict)

    return jsonify(
        {"message": "Hola desde la ruta de policias", "error": False, "data": cops_list}
    )


@cops_routes.route("/", methods=["POST"])
@jwt_required()
def create_police():
    datos = request.get_json()
    nombre = datos.get("nombre")
    apellido = datos.get("apellido")
    contrasena = datos.get("contrasena")
    cedula = datos.get("cedula")

    if not nombre or not apellido or not contrasena or not cedula:
        return jsonify({"error": "Faltan datos"}), 400

    key = current_app.config["ENCRYPT_PASSWORD"]
    encrypted_password = encrypt(key, contrasena.encode())

    query = """ 
        INSERT INTO policias (
            nombre,
            apellido,
            contrasena,
            rango,
            id_policia,
            cedula
        ) VALUES (
            '{}',
            '{}',
            '{}',
            'CADETE',
            UUID(),
            '{}'
        )
    """.format(nombre, apellido, encrypted_password, cedula)

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
                        "message": "Ya existe un policia con esa cedula",
                        "data": None,
                    }
                ), 400
            
            return jsonify({"error": True, "message": "Error al crear el policia", "data": str(e)}), 400

        query = "SELECT nombre, apellido, rango, id_policia FROM policias ORDER BY created_at DESC LIMIT 1"
        cursor.execute(query)
        police = cursor.fetchone()
        column_response = ["nombre", "apellido", "rango", "id_policia"]
        police_dict = dict(zip(column_response, police))

        conexion.connection.commit()

        return jsonify(
            {
                "data": police_dict,
                "error": False,
                "message": "Policia creado correctamente",
            }
        ), 201
    except Exception as e:
        print(e)
        return jsonify({"error": True, "message": "Error al crear el policia"}), 500


@cops_routes.route("/<int:police_id>", methods=["GET"])
def get_police_by_id(police_id):
    conexion = current_app.config["MYSQL_CONNECTION"]
    cursor = conexion.connection.cursor()
    cursor.execute("SELECT * FROM policias WHERE id = %s", (police_id,))
    police = cursor.fetchone()

    return police


@cops_routes.route("/<int:police_id>", methods=["PUT"])
def update_police(police_id):
    datos = request.get_json()
    nombre = datos.get("nombre")
    apellido = datos.get("apellido")
    cedula = datos.get("cedula")

    if not nombre or not apellido or not cedula:
        return jsonify({"error": "Faltan datos"}), 400

    return jsonify(
        {"received_data": datos, "message": "¡Datos recibidos correctamente!"}
    )

from flask import Blueprint, current_app, jsonify, request
from utils.index import decrypt

auth_routes = Blueprint("auth_routes", __name__)

# TODO debe retornar un JWT
@auth_routes.route("/login", methods=["POST"]) 
def login():
    datos = request.get_json()
    policia_id = datos.get("policia_id")
    contrasena = datos.get("contrasena")

    query = """SELECT 
                    p.id_policia,
                    p.contrasena
                FROM policias p 
                    WHERE p.id_policia = '{}'""".format(policia_id)

    conexion = current_app.config["MYSQL_CONNECTION"]
    cursor = conexion.connection.cursor()
    cursor.execute(query)
    police = cursor.fetchone()

    if police is not None:
        encrypted_password = police[1]  # Assuming the password is the second field in the tuple
        decryptPass = decrypt(
            current_app.config["ENCRYPT_PASSWORD"], encrypted_password
        )
        decryptPass = decryptPass.decode()

        if contrasena == decryptPass:
            return "Login exitoso"
        else: 
            return "Contraseña incorrecta", 404
    return "policia_id no encontrado", 404

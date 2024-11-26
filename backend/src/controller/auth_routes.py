from flask import Blueprint, current_app, jsonify, request
from flask_jwt_extended import create_access_token
from utils.index import decrypt

import json

auth_routes = Blueprint("auth_routes", __name__)

@auth_routes.route("/login", methods=["POST"]) 
def login():
    datos = request.get_json()
    policia_id = datos.get("policia_id")
    contrasena = datos.get("contrasena")

    query = """SELECT 
                    p.id_policia,
                    p.contrasena,
                    p.nombre,
                    p.apellido,
                    p.id,
                    p.rango
                FROM policias p 
                    WHERE p.id_policia = '{}'""".format(policia_id)

    conexion = current_app.config["MYSQL_CONNECTION"]
    cursor = conexion.connection.cursor()
    cursor.execute(query)
    police = cursor.fetchone()

    print(datos)
    if police is not None:
        encrypted_password = police[1]  # Assuming the password is the second field in the tuple
        decryptPass = decrypt(
            current_app.config["ENCRYPT_PASSWORD"], encrypted_password
        )
        decryptPass = decryptPass.decode()
        
        if contrasena == decryptPass:
            id = police[-2]
            nombre = police[2]
            apellido = police[3]
            rango = police[-1]
            

            access_token = create_access_token(identity=json.dumps({"id": id, "rango": rango}))
            response = {
                "error": False,
                "message": "Inicio de sesión exitoso",
                "data": {
                    "access_token": access_token,
                    "id": id,
                    "rango": rango,
                    "nombre": nombre,
                    "apellido": apellido
                }
            }
            return jsonify(response)
        else: 
            return {
                "error": True,
                "message": "Contraseña incorrecta"
            }, 400
    return jsonify({
        "error": True,
        "message": "Usuario no encontrado",
        "data": None
    }), 404

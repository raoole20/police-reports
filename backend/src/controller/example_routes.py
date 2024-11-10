from flask import Blueprint, jsonify, request

example_routes = Blueprint('example_routes', __name__)

@example_routes.route('/api/saludo', methods=['GET'])
def saludo():
    return jsonify({"message": "¡Hola! Esta es una respuesta GET desde la API de Flask"})

@example_routes.route('/api/datos', methods=['POST'])
def recibir_datos():
    datos = request.get_json()
    return jsonify({"received_data": datos, "message": "¡Datos recibidos correctamente!"})

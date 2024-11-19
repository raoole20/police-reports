from flask import Blueprint, current_app, jsonify, request

cops_routes = Blueprint('cops_routes', __name__)

@cops_routes.route('/', methods=['GET'])
def saludo():
    conexion = current_app.config['MYSQL_CONNECTION']
    cursor = conexion.connection.cursor()
    cursor.execute('SELECT * FROM policias')
    cops = cursor.fetchall()
    
    return jsonify(cops)

@cops_routes.route('/api/', methods=['POST'])
def create_police():
    datos = request.get_json()
    return jsonify({"received_data": datos, "message": "¡Datos recibidos correctamente!"})

from flask import Blueprint, current_app, jsonify, request
from utils.index import encrypt

cops_routes = Blueprint('cops_routes', __name__)

@cops_routes.route('/', methods=['GET'])
def saludo():
    conexion = current_app.config['MYSQL_CONNECTION']
    cursor = conexion.connection.cursor()
    cursor.execute('SELECT * FROM policias')
    cops = cursor.fetchall()
    
    return jsonify(cops)

# TODO debe ser autenticado
@cops_routes.route('/', methods=['POST'])
def create_police():
    datos = request.get_json()
    nombre = datos.get('nombre')
    apellido = datos.get('apellido')
    contrasena = datos.get('contrasena')

    
    if not nombre or not apellido or not contrasena:
        return jsonify({"error": "Faltan datos"}), 400
    
    key = current_app.config['ENCRYPT_PASSWORD']
    encrypted_password = encrypt(key, contrasena.encode())

    query = """ 
        INSERT INTO policias (
            nombre,
            apellido,
            contrasena,
            rango,
            id_policia
        ) VALUES (
            '{}',
            '{}',
            '{}',
            'CADETE',
            UUID()
        )
    """.format(nombre, apellido, encrypted_password)

    conexion = current_app.config['MYSQL_CONNECTION']
    cursor = conexion.connection.cursor()
    cursor.execute(query)

    conexion.connection.commit()

    return jsonify({ 
        "received_data": datos, 
        "message": "Policia creado correctamente"
    }), 201

@cops_routes.route('/<int:police_id>', methods=['GET'])
def get_police_by_id(police_id):
    conexion = current_app.config['MYSQL_CONNECTION']
    cursor = conexion.connection.cursor()
    cursor.execute('SELECT * FROM policias WHERE id = %s', (police_id,))
    police = cursor.fetchone()
    
    return police

@cops_routes.route('/<int:police_id>', methods=['PUT'])
def update_police(police_id):
    datos = request.get_json()
    nombre = datos.get('nombre')
    apellido = datos.get('apellido')
    cedula = datos.get('cedula')
    
    if not nombre or not apellido or not cedula:
        return jsonify({"error": "Faltan datos"}), 400
    
    return jsonify({ 
        "received_data": datos, 
        "message": "¡Datos recibidos correctamente!"
    })



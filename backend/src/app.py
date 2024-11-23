from flask import Flask
from config import config
from controller import example_routes, cops_router, auth_routes
from flask_mysqldb import MySQL

app = Flask(__name__)
conexion = MySQL(app)

# Almacenar la conexión en la variable app
app.config['MYSQL_CONNECTION'] = conexion
app.config['ENCRYPT_PASSWORD'] = b"secret_AES_key_string_to_encrypt/decrypt_with"

@app.route('/')
def index():
    cursor = conexion.connection.cursor()
    cursor.execute('SELECT * FROM usuarios')
    return "Hello, World!"

if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_blueprint(example_routes.example_routes)
    app.register_blueprint(cops_router.cops_routes,url_prefix='/api/cops', connection=conexion)
    app.register_blueprint(auth_routes.auth_routes, url_prefix='/api/auth', connection=conexion)
    app.run()
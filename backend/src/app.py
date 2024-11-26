from flask import Flask
from flask_jwt_extended import JWTManager
from controller import reports_routes, user_routes
from config import config
from controller import example_routes, cops_router, auth_routes
from flask_mysqldb import MySQL
from datetime import timedelta

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Cambia esto por una clave secreta segura
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(weeks=1)
jwt = JWTManager(app)

conexion = MySQL(app)

# Almacenar la conexión en la variable app
app.config['MYSQL_CONNECTION'] = conexion
app.config['ENCRYPT_PASSWORD'] = b"secret_AES_key_string_to_encrypt/decrypt_with"

@app.route('/')
def index():
    return "Hello, World!"

if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_blueprint(example_routes.example_routes)
    app.register_blueprint(cops_router.cops_routes,url_prefix='/api/cops', connection=conexion)
    app.register_blueprint(auth_routes.auth_routes, url_prefix='/api/auth', connection=conexion)
    app.register_blueprint(user_routes.user_routes, url_prefix='/api/ciudadanos', connection=conexion)
    app.register_blueprint(reports_routes.reports_router, url_prefix='/api/reports', connection=conexion)
    app.run()
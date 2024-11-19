from flask import Flask
from config import config
from controller import example_routes, cops_router
from flask_mysqldb import MySQL

app = Flask(__name__)
conexion = MySQL(app)

# Almacenar la conexión en la variable app
app.config['MYSQL_CONNECTION'] = conexion

@app.route('/')
def index():
    cursor = conexion.connection.cursor()
    cursor.execute('SELECT * FROM usuarios')
    return "Hello, World!"

if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_blueprint(example_routes.example_routes)
    app.register_blueprint(cops_router.cops_routes,url_prefix='/api/cops', connection=conexion)
    app.run()
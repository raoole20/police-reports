from flask import Flask
from config import config
from controller.example_routes import example_routes
from flask_mysqldb import MySQL

app = Flask(__name__)
conexion = MySQL(app)

@app.route('/')
def index():
    cursor = conexion.connection.cursor()
    cursor.execute('SELECT * FROM usuarios')
    return "Hello, World!"

if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_blueprint(example_routes)
    app.run()
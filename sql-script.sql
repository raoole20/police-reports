
CREATE TABLE Policias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    rango ENUM('CADETE', 'Oficial') NOT NULL DEFAULT 'CADETE',
    id_policia CHAR(36) UNIQUE DEFAULT (UUID()),
    contrasena VARCHAR(225)
);

-- o deveria ser Ciudadanos? ya que no todos los imputados son criminales
-- y no todos los criminales son imputados, y en tal caso 
-- de que haya sido declarado culpable seria un criminal y no un imputado
CREATE TABLE Ciudadanos ( 
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(225) NOT NULL,
    apellido VARCHAR(225) NOT NULL
    estatus_criminal ENUM('IMPUTADO', 'CULPABLE', 'INOCENTE') NOT NULL DEFAULT 'IMPUTADO',
    cedula INT UNIQUE NOT NULL CHECK (cedula >= 0),
    sexo ENUM('M', 'F') NOT NULL,
    estado_civil ENUM('SOLTERO', 'CASADO', 'DIVORCIADO', 'VIUDO') NOT NULL,
    fecha_nacimiento DATE NOT NULL,
);

CREATE TABLE Contactos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_ciudadano INT FOREIGN KEY REFERENCES Ciudadanos(id),
    tipo ENUM('TELEFONO', 'CORREO') NOT NULL,
    dato VARCHAR(225) NOT NULL,
)

CREATE TABLE Direcciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_ciudadano INT FOREIGN KEY REFERENCES Ciudadanos(id),
    descripcion VARCHAR(225) NOT NULL,
    pais VARCHAR(100) not null,
    estado VARCHAR(100) not null,
    ciudad VARCHAR(100) not null,
    codigo_postal INT not null CHECK (codigo_postal >= 0),
    numero_casa VARCHAR(50) not null CHECK 
);

CREATE TABLE Delitos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(225) NOT NULL,
    descripcion TEXT
);

CREATE TABLE Cargos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descripcion TEXT NOT NULL
);

CREATE TABLE Reportes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE NOT NULL,
    id_policia INT,
    id_imputado INT,
    descripcion TEXT,
    FOREIGN KEY (id_policia) REFERENCES Policias(id),
    FOREIGN KEY (id_imputado) REFERENCES Imputados(id)
);

CREATE TABLE Evidencias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_reporte INT,
    descripcion TEXT NOT NULL,
    tipo VARCHAR(100),
    FOREIGN KEY (id_reporte) REFERENCES Reportes(id)
);

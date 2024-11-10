
CREATE TABLE Policias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    rango ENUM('CADET', 'OFFICER') NOT NULL DEFAULT 'CADET',
    id_policia CHAR(36) UNIQUE DEFAULT (UUID()),
    contrasena VARCHAR(225)
);

-- o deveria ser Ciudadanos? ya que no todos los imputados son criminales
-- y no todos los criminales son imputados, y en tal caso 
-- de que haya sido declarado culpable seria un criminal y no un imputado
CREATE TABLE Imputados ( 
    id INT PRIMARY KEY AUTO_INCREMENT,
    cedula INT UNIQUE NOT NULL CHECK (cedula >= 0),
    nombre VARCHAR(225) NOT NULL,
    apellido VARCHAR(225) NOT NULL
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

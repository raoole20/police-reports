export interface Police {
    rango: string;
    cedula: number;
    nombre: string;
    apellido: string;
    id?: number;
}

export interface PoliceCreate extends Police {
    contrasena: string;
}
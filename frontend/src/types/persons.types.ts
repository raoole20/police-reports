export interface Person {
    id:                    number;
    nombre:                string;
    apellido:              string;
    cedula:                string;
    sexo:                  string;
    estado_civil:          string;
    fecha_nacimiento:      string;
    descripcion_fisica_id: number;
}

export enum EstadoCivil {
    ErrorUndefinedMethodFirstForNilNilClass = "error: undefined method `first' for nil:NilClass",
}

export enum Sexo {
    Agender = "Agender",
    Bigender = "Bigender",
    Female = "Female",
    Genderfluid = "Genderfluid",
    Male = "Male",
    NonBinary = "Non-binary",
    Polygender = "Polygender",
}

export interface BasicCiudadanoData {
  nombre: string;
  apellido: string;
  cedula: number;
  sexo: "M" | "F";
  estado_civil: "SOLTERO" | "CASADO" | "DIVORCIADO" | "VIUDO";
  fecha_nacimiento: string;
}

export interface CiudadanoDescriptionData {
  color_cabello: string;
  color_ojos: string;
  estatura: number;
  peso: number;
  rasgos_faciales: string;
  tipo_cabello: string;
  complexion: string;
  cicatrices: boolean;
  tatuajes: boolean;
  lentes: boolean;
}

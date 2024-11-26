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
  descripcion: string;
  direccion: string;
  tatuajes: string;
  cicatrices: boolean;
  contextura: string;
  lentes: string;
}

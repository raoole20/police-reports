import React from "react";
import { FormCops } from "./form/NewCops";
import { createPolice } from "@/service/police-service";
export default function page() {
  return (
    <div>
      <FormCops defaultValues={{
        nombre: "",
        apellido: "",
        cedula: 0,
        contrasena: "",
        rango: "",
      }}
      callback={createPolice} successText={"Creado"} errorText={"Error al crear"}  
    />
    </div>
  );
}

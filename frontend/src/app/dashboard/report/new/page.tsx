import React from "react";
import ReportFormPage from "./components/Form";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl">Crear un nueva nueva Resena</h1>
          <p className="text-sm mt-2">
            Por favor, llena el siguiente formulario para crear un nuevo reporte.
          </p>
        </div>

        <Button className="bg-primary">Crear Resena</Button>
      </div>

      <ReportFormPage />
    </div>
  );
}

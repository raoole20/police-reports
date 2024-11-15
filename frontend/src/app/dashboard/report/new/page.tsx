import { ReportsForm } from "@/components/forms/reports";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import React from "react";

export default function page() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl">Crear un nueva nueva Resena</h1>
        <p className="text-sm mt-2">
          Por favor, llena el siguiente formulario para crear un nuevo reporte.
        </p>
      </div>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1" className="p-4 border rounded-lg" defaultChecked>
          <AccordionTrigger className="hover:no-underline">Datos Basicos del Ciudadano</AccordionTrigger>
          <AccordionContent>
            <ReportsForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

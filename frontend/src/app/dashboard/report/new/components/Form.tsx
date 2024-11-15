"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { UserForm } from "@/components/forms/user-form";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import DescriptionForm from "@/components/forms/description-form";
import { Separator } from "@/components/ui/separator";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface ReportFormType {
  nombre: string;
  apellido: string;
  cedula: number;
  sexo: "M" | "F";
  estado_civil: "soltero" | "casado" | "divorciado" | "viudo";
  fecha_nacimiento: string;
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

export default function ReportFormPage() {
  const form = useForm<ReportFormType>({
    defaultValues: {},
  });

  const onSubmit = async (data: ReportFormType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Accordion type="multiple" className="space-y-5">
          <AccordionItem
            value="item-1"
            className="p-4 border rounded-lg space-y-8"
            defaultChecked
          >
            <AccordionTrigger className="hover:no-underline">
              Datos Basicos del Ciudadano
            </AccordionTrigger>
            <AccordionContent>
              <UserForm form={form} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="descripcion"
            className="p-4 border rounded-lg space-y-8"
          >
            <AccordionTrigger className="hover:no-underline">
              Descripcion del Ciudadano
            </AccordionTrigger>
            <AccordionContent>
              <DescriptionForm form={form} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="contactos"
            className="p-4 border rounded-lg space-y-8"
          >
            <AccordionTrigger className="hover:no-underline">
              Contactos
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-5">
                <div className="space-y-2">
                  <div>
                    <label>Contacto 1</label>
                    <Input type="text" />
                  </div>

                  <div>
                    <label>Contacto 2</label>
                    <Input type="email" />
                  </div>
                </div>
                <Separator></Separator>
                <Button variant={"default"}>
                  agregar contacto <CirclePlus size={16} />
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </Form>
  );
}

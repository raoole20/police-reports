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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface ReportFormType {
  nombre: string;
  apellido: string;
  cedula: number;
  sexo: "M" | "F";
  estado_civil: "SOLTERO" | "CASADO" | "DIVORCIADO" | "VIUDO";
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
  return (
    <div className="space-y-5">
      <Card className="">
        <CardHeader className="hover:no-underline">
          <CardTitle>Datos Basicos del Ciudadano</CardTitle>
          <CardDescription>
            Ingrese los datos basicos del ciudadano, puede buscar un cuidadano
            ya existente usando el campo de cedula
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>

      <Card>
        <CardHeader className="hover:no-underline">
          <CardTitle>Descripcion del Ciudadano</CardTitle>
          <CardDescription>
            Ingrese los datos fisicos del ciudadano
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DescriptionForm />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      {/* 
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
          </AccordionItem> */}
    </div>
  );
}

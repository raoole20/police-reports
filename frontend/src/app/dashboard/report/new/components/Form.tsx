"use client";
import React from "react";
import { UserForm } from "@/components/forms/user-form";
import DescriptionForm from "@/components/forms/description-form";
import ReportForm from "@/components/forms/report-form";
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
  
      <Card>
        <CardHeader>
          <CardTitle>Reporte</CardTitle>
          <CardDescription>Ingrese los datos del reporte</CardDescription>
        </CardHeader>
        <CardContent>
          <ReportForm />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

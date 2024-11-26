"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { MultiSelect } from "../shared/multi-select";
import { Cctv } from "lucide-react";
import { getAllDelitos } from "@/service/delitos";
import { toast } from "react-toastify";
import { createReports } from "@/service/reports-service";
import { Button } from "../ui/button";
import { useResenaContext } from "../providers/ResenaProvider";

export interface ReportForm {
  fecha: string;
  descripcion: string;
  cargos: string | number[];
}

const reportFormSchema = z.object({
  fecha: z.string(),
  descripcion: z.string(),
  cargos: z
    .array(z.union([z.string(), z.number()]))
    .min(1, "Debe seleccionar al menos un delito"),
});

export default function ReportForm() {
    const { cuidadano } = useResenaContext()
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [delitos, setDelitos] = useState<[]>([]);

  const form = useForm<ReportForm>({
    defaultValues: {},
    resolver: zodResolver(reportFormSchema),
  });

  useEffect(() => {
    const fetchDelitos = async () => {
      getAllDelitos()
        .then((res) => {
          console.log(res);
          if (res.error) {
            throw new Error(res.message);
            return;
          }

          if (res.data?.length > 0) {
            const data = [];

            for (const delito of res.data) {
              data.push({
                value: delito.id,
                label: delito.nombre,
                icon: Cctv,
              });
            }

            setDelitos(data);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error al cargar los delitos");
        });
    };

    fetchDelitos();
  }, []);

//   console.log(fields);

  const onSubmit = (event: ReportForm) => {
    if(!cuidadano?.id){
        return toast.error("No se ha seleccionado un ciudadano");
    }
    createReports(event, cuidadano.id)
      .then((res) => {
        if (res.error) {
          throw new Error(res.message);
        }
        toast.success("Reporte creado");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message || "Error al crear el reporte");
      });
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            name="fecha"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripcion del incidente</FormLabel>
                <FormControl>
                  <Textarea className="w-full" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormField
              name="cargos"
              defaultValue={[]}
              control={form.control}
              render={({ field }) => {
                return (
                    <FormItem>
                        <MultiSelect
                          options={delitos}
                          onValueChange={(event) => {
                            setSelectedFrameworks(event);
                            field.onChange(event);
                          }}
                          defaultValue={selectedFrameworks}
                          placeholder="Seleccionar delito"
                          variant="inverted"
                          animation={2}
                          maxCount={3}
                          value={field.value as any}
                        />
                        <FormMessage />
                    </FormItem>
                );
              }}
            />
          </div>

          <Button type="submit">Crear Reporte</Button>
        </form>
      </Form>
    </div>
  );
}

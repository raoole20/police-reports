/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { CiudadanoDescriptionData } from "@/types/cuidadanos";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useResenaContext } from "../providers/ResenaProvider";
import { toast } from "react-toastify";
import { Textarea } from "../ui/textarea";
import {
  createDescription,
  getDescriptionByUserID,
} from "@/service/description-service";

const ciudadanoDescriptionSchema = z.object({
  color_cabello: z.string().nonempty("Color de cabello es requerido"),
  color_ojos: z.string().nonempty("Color de ojos es requerido"),
  estatura: z.number().min(0, "Estatura debe ser un número positivo"),
  peso: z.number().min(0, "Peso debe ser un número positivo"),
  rasgos_faciales: z.string().nonempty("Descripcion es requerida"),
  // direccion: z.string().required(),
  complexion: z.string().nonempty("Contextura es requerida"),
  cicatrices: z.boolean(),
  tatuajes: z.boolean(),
  lentes: z.boolean(),
});

export default function DescriptionForm() {
  const { cuidadano } = useResenaContext();
  const form = useForm<CiudadanoDescriptionData>({
    defaultValues: {},
    resolver: zodResolver(ciudadanoDescriptionSchema),
  });

  const onSubmit = (data: CiudadanoDescriptionData) => {
    if (!cuidadano || !cuidadano.id) {
      toast.error("No se ha seleccionado un ciudadano");
      return;
    }

    const promise = createDescription(data, cuidadano?.id);
    toast
      .promise(promise, {
        pending: "Creando descripcion del ciudadano",
        success: "Descripcion creada",
        error: "Error al crear descripcion",
      })
      .then((res) => {
        if (res.error) {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message || "Error al crear descripcion");
      });
  };

  useEffect(() => {
    if (cuidadano) {
      // get datos del cuidadano
      if (!cuidadano.id) {
        form.reset({});
        return;
      }
      const promise = getDescriptionByUserID(cuidadano.id)
        .then((res) => {
          console.log(res);
          if (res.error) {
            throw new Error(res.message);
          }

          const { lentes, tatuajes, cicatrices } = res.data!;
          form.reset({
            ...res.data,
            lentes: !!lentes,
            tatuajes: !!tatuajes,
            cicatrices: !!cicatrices,
          });
        })
        .catch((err) => {
          console.error(err);
          form.reset({
            lentes: false,
            tatuajes: false,
            cicatrices: false,
            color_cabello: "",
            color_ojos: "",
            estatura: 0,
            peso: 0,
            complexion: "",
            rasgos_faciales: "",
            tipo_cabello: "",
          });
        });

      toast.promise(promise, {
        pending: "Cargando descripcion del ciudadano",
        success: "Descripcion cargada",
        error: "Error al cargar descripcion",
      });
    } else {
      // toast.error("No se ha seleccionado un ciudadano");
    }
  }, [cuidadano]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-5">
          <div className="flex gap-5 flex-wrap">
            <FormField
              control={form.control}
              name="color_cabello"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color de Cabello</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color_ojos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color de Ojos</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estatura"
              render={({ field: { onChange, ...field } }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Estatura</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min={0}
                        onChange={(e) => onChange(+e.target.value)}
                        {...field}
                      />
                      <Button
                        type="button"
                        className="italic font-bold text-xs"
                        variant={"outline"}
                      >
                        m
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="peso"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>
                    Peso <small>(kg)</small>
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="number"
                        min={0}
                        placeholder="0000"
                        onChange={(e) => onChange(+e.target.value)}
                        {...field}
                      />
                      <Button
                        type="button"
                        className="italic font-bold text-xs"
                        variant="outline"
                      >
                        kg
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="complexion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contextura</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="delgado..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-full w-full">
              <FormField
                control={form.control}
                name="rasgos_faciales"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripcion del sujeto</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-2">
            <h2>Rasgos Especiales</h2>
            <Separator />
            <FormField
              control={form.control}
              name="tatuajes"
              defaultValue={false}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* < placeholder="No" {...field} /> */}
                    <div className="flex gap-2 py-2 items-center cursor-pointer">
                      <Checkbox
                        checked={!!field.value}
                        id="tatuajes"
                        onCheckedChange={(e) => field.onChange(e)}
                      />
                      <label htmlFor="tatuajes" className="cursor-pointer">
                        Tiene tatuajes?
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lentes"
              defaultValue={false}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2 py-2 items-center cursor-pointer">
                      <Checkbox
                        checked={!!field.value}
                        id="lentes"
                        onCheckedChange={(e) => field.onChange(e)}
                        aria-label="select"
                      />
                      <label htmlFor="lentes" className="cursor-pointer">
                        Usa lentes?
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="" type="submit">
            Crear o acualizar descripcion
          </Button>
        </div>
      </form>
    </Form>
  );
}

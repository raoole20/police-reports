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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CiudadanoDescriptionData } from "@/types/cuidadanos";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useResenaContext } from "../providers/ResenaProvider";
import { toast } from "react-toastify";

const ciudadanoDescriptionSchema = z.object({
  color_cabello: z.string().nonempty("Color de cabello es requerido"),
  color_ojos: z.string().nonempty("Color de ojos es requerido"),
  estatura: z.number().min(0, "Estatura debe ser un número positivo"),
  peso: z.number().min(0, "Peso debe ser un número positivo"),
  descripcion: z.string().optional(),
  direccion: z.string().optional(),
  tatuajes: z.string().optional(),
  cicatrices: z.boolean().optional(),
  contextura: z.string().nonempty("Contextura es requerida"),
  lentes: z.string().optional(),
});

export default function DescriptionForm() {
  const { cuidadano } = useResenaContext();
  const form = useForm<CiudadanoDescriptionData>({
    defaultValues: {},
    resolver: zodResolver(ciudadanoDescriptionSchema),
  });

  const onSubmit = (data: CiudadanoDescriptionData) => {
    console.log(data);
  };

  useEffect(() => {
    console.log(cuidadano);
    toast.info("datos del usuario cargados");
  }, [cuidadano]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-5">
          <div className="flex gap-5">
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
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Estatura</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input type="number" min={0} {...field} />
                      <Button
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
              render={({ field }) => (
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
                        {...field}
                      />
                      <Button
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
              name="contextura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contextura</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(e) => field.onChange(e)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={"contextura"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delgado">delgado</SelectItem>
                        <SelectItem value="gordo">gordo</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <h2>Rasgos Especiales</h2>
            <Separator />
            <FormField
              control={form.control}
              name="tatuajes"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* < placeholder="No" {...field} /> */}
                    <div className="flex gap-2 py-2 items-center cursor-pointer">
                      <Checkbox id="tatuajes" {...field} />
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
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2 py-2 items-center cursor-pointer">
                      <Checkbox id="lentes" {...field} aria-label="select" />
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
        </div>
      </form>
    </Form>
  );
}

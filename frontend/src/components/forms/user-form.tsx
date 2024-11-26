"use client";
import React, { useEffect } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCiudadano,
  getCiudadanoByCedula,
} from "@/service/cuidadano-service";
import { Loader2Icon } from "lucide-react";
import { toast } from "react-toastify";
import { useResenaContext } from "../providers/ResenaProvider";

export interface BasicUserData {
  nombre: string;
  apellido: string;
  cedula: number;
  sexo: "M" | "F";
  estado_civil: "SOLTERO" | "CASADO" | "DIVORCIADO" | "VIUDO";
  fecha_nacimiento: string;
}

const formSchema = z.object({
  nombre: z.string().nonempty("El nombre es obligatorio"),
  apellido: z.string().nonempty("El apellido es obligatorio"),
  cedula: z
    .number()
    .min(0, "La cédula no puede ser negativa")
    .nonnegative("La cédula no puede ser negativa"),
  sexo: z.string().nonempty("El sexo es obligatorio"),
  estado_civil: z.string().nonempty("El estado civil es obligatorio"),
  fecha_nacimiento: z
    .string()
    .nonempty("La fecha de nacimiento es obligatoria"),
});

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface UserFormProps {}

export function UserForm({}: UserFormProps) {
  const { setCuidadano } = useResenaContext();
  const [search, setSearch] = React.useState<number | null>(null);
  const [formState, setFormState] = React.useState({
    isNoneEdit: false,
    isCreated: false,
  });

  const form = useForm<BasicUserData>({
    defaultValues: {},
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting } = form.formState;

  const submit = async (values: BasicUserData) => {
    await createCiudadano(values)
      .then((res) => {
        if (res.error) throw new Error(res.message);

        toast.success("Ciudadano creado correctamente");
        setFormState(() => ({ isNoneEdit: true, isCreated: true }));
        setCuidadano(res.data!);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.message || "Error al crear el ciudadano");
      });
  };

  useEffect(() => {
    if (search) {
      toast.info("Buscando ciudadano");
      getCiudadanoByCedula(search)
        .then((res) => {
          if (res.error) throw new Error(res.message);

          const { nombre, apellido, sexo, estado_civil, fecha_nacimiento } =
            res.data!;

          form.setValue("nombre", nombre);
          form.setValue("apellido", apellido);
          form.setValue("sexo", sexo);
          form.setValue("estado_civil", estado_civil);
          form.setValue(
            "fecha_nacimiento",
            new Date(fecha_nacimiento).toISOString().split("T")[0]
          );

          setFormState((last) => ({ ...last, isNoneEdit: true }));
          toast.success("Ciudadano encontrado");
          setCuidadano(res.data!);
        })
        .catch((err) => {
          console.error(err);
          toast.info(err?.message || "Error al buscar el ciudadano");
          form.resetField("nombre");
          form.resetField("apellido");
          form.resetField("sexo");
          form.resetField("estado_civil");
          form.resetField("fecha_nacimiento");
          setCuidadano(null);
          setFormState((last) => ({ ...last, isNoneEdit: false }));
        });
      // .finally
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="cedula"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Cedula</FormLabel>
                  <FormControl>
                    <div className="flex gap-5">
                      <Input
                        disabled={formState.isCreated}
                        placeholder="12345678"
                        type="number"
                        min={0}
                        className="max-w-xs"
                        {...field}
                        onChange={(e) => {
                          onChange(Number(e.target.value));
                        }}
                      />
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSearch(Number(field.value));
                        }}
                      >
                        Buscar cedula
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="nombre"
            render={({ field: { value, ...field } }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="nombre"
                    value={value}
                    {...field}
                    disabled={formState.isNoneEdit}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="apellido"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Doe"
                    disabled={formState.isNoneEdit}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fecha_nacimiento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <FormControl>
                  <Input
                    disabled={formState.isNoneEdit}
                    placeholder="2021-01-01"
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
            name="sexo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sexo</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(e) => field.onChange(e)}
                    disabled={formState.isNoneEdit}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={"Sexo"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Masculino</SelectItem>
                      <SelectItem value="F">Femenino</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estado_civil"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado Civil</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(e) => field.onChange(e)}
                    disabled={formState.isNoneEdit}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={"Estado Civil"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SOLTERO">Soltero</SelectItem>
                      <SelectItem value="CASADO">Casado</SelectItem>
                      <SelectItem value="DIVORCIADO">Divorciado</SelectItem>
                      <SelectItem value="VIUDO">Viudo</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={
            isSubmitting || !form.formState.isValid || formState.isNoneEdit
          }
        >
          {isSubmitting && <Loader2Icon className="animate-spin" />}
          Crear cuidadano
        </Button>
      </form>
    </Form>
  );
}

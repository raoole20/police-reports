/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const schemes = {
  edit: z.object({
    nombre: z.string().nonempty("El nombre es obligatorio"),
    apellido: z.string().nonempty("El apellido es obligatorio"),
    cedula: z
      .number()
      .min(0, "La cedula no puede ser negativa")
      .nonnegative("La cedula no puede ser negativa"),
    contrasena: z
      .string()
      .min(3, "La contraseña debe tener al menos 6 caracteres")
      .nonempty("La contraseña es obligatoria"),
    rango: z.string().nonempty("El rango es obligatorio"),
  }),
};

interface FormProps {
  defaultValues: any;
  resolver?: keyof typeof schemes;
  callback: (values: any) => Promise<any>;
  successText: string;
  errorText: string;
}

export const FormCops = ({
  defaultValues,
  resolver = "edit",
  callback,
  successText,
  errorText,
}: FormProps) => {
  const router = useRouter();
  const form = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(schemes[resolver]),
  });
  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<any>) {
    // console.log(values);
    await callback(values)
      .then((response) => {
        if (response.error) {
          toast.error(response.message);
        } else {
          toast.success(response.message || successText);
          // form.reset();
          router.push("/dashboard/cops");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(errorText);
      });
  }

  return (
    <Card className="m-auto max-w-screen-sm">
      <CardHeader>
        <CardTitle>Registrar Policia</CardTitle>
        <CardDescription>
          Debe llegar todos los campos obligatorios
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="rango"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rango</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Rango" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CADETE">Cadete</SelectItem>
                        <SelectItem value="OFICIAL">Oficial</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 py-2 items-center cursor-pointer">
                      <Input type="text" placeholder="apellido" {...field} />
                    </div>
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
                    <div className="flex gap-2 py-2 items-center cursor-pointer">
                      <Input type="text" placeholder="apellido" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cedula"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cedula</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 py-2 items-center cursor-pointer">
                      <Input
                        type="number"
                        placeholder="30000000"
                        min={0}
                        {...field}
                        onChange={(event) => {
                          field.onChange(parseInt(event.target.value));
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contrasena"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 py-2 items-center cursor-pointer">
                      <Input
                        type="password"
                        placeholder="Contraseña"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="bg-primary w-full text-white rounded-md py-2 px-4"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Registrar"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

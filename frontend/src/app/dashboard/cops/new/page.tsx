"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
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
import { Checkbox } from "@radix-ui/react-checkbox";
import React from "react";
import { useForm } from "react-hook-form";

export default function page() {
  return (
    <div>
      <FormCops />
    </div>
  );
}

const FormCops = () => {
  const form = useForm({
    defaultValues: {},
  });
  return (
    <Card className="m-auto max-w-screen-sm">
      <CardHeader>Registrar Policia</CardHeader>
      <CardContent>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 py-2 items-center cursor-pointer">
                      <Input type="text" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Apellido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 py-2 items-center cursor-pointer">
                      <Input type="text" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Rango"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rango</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 py-2 items-center cursor-pointer">
                      <Input type="text" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button className="bg-primary w-full text-white rounded-md py-2 px-4">
          Registrar
        </Button>
      </CardFooter>
    </Card>
  );
};

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ReportFormType } from "@/app/dashboard/report/new/components/Form";
import { UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";

export default function DescriptionForm({
  form,
}: {
  form: UseFormReturn<ReportFormType>;
}) {
  return (
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
                  <Input type="number" placeholder="79" {...field} />
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
                <Input placeholder="Delgado" {...field} />
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
                  <label htmlFor="tatuajes" className="cursor-pointer">Tiene tatuajes?</label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='lentes'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex gap-2 py-2 items-center cursor-pointer">
                  <Checkbox id="lentes" {...field} aria-label="select"/>
                  <label htmlFor="lentes" className="cursor-pointer">Usa lentes?</label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

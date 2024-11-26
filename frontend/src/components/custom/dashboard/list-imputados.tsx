import React from "react";
import { ImputadosTable } from "@/components/shared/table";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
// import { PersonsMocks } from "@/mocks/persons-mocks";

export default function ListImputados({ data }) {
  console.log('data => ', data)
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Lista de Imputados</CardTitle>
      </CardHeader>
      <CardContent>
        <ImputadosTable data={data || []}/>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

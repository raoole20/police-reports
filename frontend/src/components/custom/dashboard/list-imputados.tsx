import React from "react";
import { ImputadosTable } from "@/components/shared/table";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { PersonsMocks } from "@/mocks/persons-mocks";

export default function ListImputados() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Lista de Inputados</CardTitle>
      </CardHeader>
      <CardContent>
        <ImputadosTable data={PersonsMocks}/>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

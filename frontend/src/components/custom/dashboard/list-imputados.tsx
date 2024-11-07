import React from "react";
import { TableDemo } from "@/components/shared/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function ListImputados() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Lista de Inputados</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <TableDemo />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

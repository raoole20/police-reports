import ListImputados from "@/components/custom/dashboard/list-imputados";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";

export default function page() {
  return (
    <div className="space-y-5">
      <div>
        <Button variant={"outline"} className="bg-primary">Descargar Reportes</Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5">
        <ListImputados />
        <div className="h-full">
          <Card>
            <CardHeader></CardHeader>
            <CardContent></CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

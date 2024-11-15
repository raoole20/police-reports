import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function ShortCoutsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Casos Pendientes</CardTitle>
        <CardDescription>Lista de casos pendientes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between gap-5">
          <div>
            <p className="text-gray-500">Total</p>
            <p className="text-6xl font-semibold">10</p>
          </div>
          <div>
            <p className="text-gray-500">Hoy</p>
            <p className="text-6xl font-semibold">1</p>
          </div>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

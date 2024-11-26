import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function ShortCoutsCard({ padingCases }: { padingCases: number }) {
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
            <p className="text-6xl font-semibold">{padingCases || 0}</p>
          </div>
          <div>
          </div>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

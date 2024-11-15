import { SimpleBarChartComponent } from "@/components/custom/charts/simple-bar-chart";
import ListImputados from "@/components/custom/dashboard/list-imputados";
import ShortCoutsCard from "@/components/custom/dashboard/short-couts-card";
import React from "react";

export default function page() {
  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5">
        <ListImputados />
        <div className="h-full space-y-5">
          <ShortCoutsCard />
          <SimpleBarChartComponent />
        </div>
      </div>
    </div>
  );
}

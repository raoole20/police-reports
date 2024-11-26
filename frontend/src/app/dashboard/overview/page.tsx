import { SimpleBarChartComponent } from "@/components/custom/charts/simple-bar-chart";
import ListImputados from "@/components/custom/dashboard/list-imputados";
import ShortCoutsCard from "@/components/custom/dashboard/short-couts-card";
import { getPendingCase, getReports } from "@/service/reports-service";
import React from "react";

export default async function page() {
  const data = await getReports()
  const pendingCase = await getPendingCase()


  if(data.error) {
    console.error(data)
    return <div>{data.message}</div>
  }

  if(pendingCase.error) {
    console.error(pendingCase)
    return <div>{pendingCase.message}</div>
  }

  console.log(data.data) 

  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5">
        <ListImputados data={data.data} />
        <div className="h-full space-y-5">
          <ShortCoutsCard  padingCases={pendingCase.data!}/>
          <SimpleBarChartComponent />
        </div>
      </div>
    </div>
  );
}

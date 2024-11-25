import { DataTable } from "@/components/shared/data-table";
import React from "react";
import { PoliceColumn } from "./columns/CopsList";
import { getPolice } from "@/service/police-service";

export default async function Page() {
  const policeReponse = await getPolice();

  if (policeReponse.error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <DataTable columns={PoliceColumn} data={policeReponse.data || []} />
    </div>
  );
}

import React from "react";
import { FormCops } from "../../new/form/NewCops";
import { getPoliceById } from "@/service/police-service";
import { updatePolice } from "@/service/police-service";
export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await getPoliceById(id);
  if (response.error || !response.data) {
    return <div>{response.message}</div>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handler = async (values: any) => {
    'use server'
    return await updatePolice(id, values);
  }

  return (
    <div>
      <FormCops
        defaultValues={response.data}
        callback={handler}
        successText={""}
        errorText={""}
      />
    </div>
  );
}

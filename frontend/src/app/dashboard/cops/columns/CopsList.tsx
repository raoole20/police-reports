"use client";
import { Button } from "@/components/ui/button";
import { Police } from "@/types/police.type";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2 } from "lucide-react";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PoliceColumn: ColumnDef<Police, any>[] = [
  {
    id: "id",
    accessorFn: (row) => row.id,
    header: () => <div>ID</div>,
    cell: ({ getValue }) => (
      <div>
        {getValue()}
      </div>
    ),
  },
  {
    id: "rango",
    accessorFn: (row) => row.rango,
    header: () => <div>Rango</div>,
    cell: ({ getValue }) => <div>{getValue()}</div>,
  },
  {
    id: "name",
    accessorFn: (row) => row.nombre,
    header: () => <div>Nombre</div>,
    cell: ({ getValue }) => <div>{getValue()}</div>,
  },
  {
    id: "apellido",
    accessorFn: (row) => row.apellido,
    header: () => <div>Apellido</div>,
    cell: ({ getValue }) => <div>{getValue()}</div>,
  },
  {
    id: "cedula",
    accessorFn: (row) => row.cedula,
    header: () => <div>Cedula</div>,
    cell: ({ getValue }) => <div>{getValue()}</div>,
  },
  {
    id: "actions",
    accessorFn: (row) => row.id,
    header: () => <div>Acciones</div>,
    cell: ({ row }) => (
      <div className="">
        <Button className="" variant={'outline'}>
          <Link href={`/dashboard/cops/edit/${row.original.id}`}>
            <Edit2 />
          </Link>
        </Button>
      </div>
    ),
  }
];

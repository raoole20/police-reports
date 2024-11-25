/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { Police, PoliceCreate } from "@/types/police.type";
import { auth, signOut } from "../../auth";
import { AuthSession, SuccessResponse } from "@/types/type";

const url = new URL(process.env.NEXT_API_URL || "");

export async function createPolice(data: PoliceCreate) {
  const { user } = (await auth()) as any;
  try {
    const response = await fetch(`${url.origin}/api/cops`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
 
    try {
      if (!response.ok) {
        if (response.status === 401) {
          await signOut();
          return;
        }
        throw new Error("Error al crear el policia");
      }

      return responseData;
    } catch (error) {
      console.log(error)
      return {
        error: true,
        message: responseData.message || (responseData as any)?.msg,
        data: null,
      }
    }
  } catch (error) {
    console.error(error);
    return {
      // status:
      error: true,
      message: "Error al crear el policia",
      data: null,
    };
  }
}

export async function getPolice(): Promise<SuccessResponse<Police[] | null>> {
  const session = (await auth()) as unknown as AuthSession;
  try {
    const response = await fetch(`${url.origin}/api/cops`, {
      headers: {
        Authorization: `Bearer ${session.user?.accessToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        await signOut();
        throw new Error("Error al obtener los policias");
      }
      throw new Error("Error al obtener los policias");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    return {
      // status:
      error: true,
      message: "Error al obtener los policias",
      data: null,
    };
  }
}

export async function getPoliceById(
  id: string
): Promise<SuccessResponse<Police | null>> {
  const session = (await auth()) as unknown as AuthSession;
  try {
    const response = await fetch(`${url.origin}/api/cops/${id}`, {
      headers: {
        Authorization: `Bearer ${session.user?.accessToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        await signOut();
        throw new Error("Error al obtener el policia");
      }
      throw new Error("Error al obtener el policia");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    return {
      // status:
      error: true,
      message: "Error al obtener el policia",
      data: null,
    };
  }
}


export async function updatePolice(id: number | string, data: PoliceCreate) {
  const session = (await auth()) as unknown as AuthSession;
  try {
    const response = await fetch(`${url.origin}/api/cops/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user?.accessToken}`,
      },
      method: 'PUT',
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      if (response.status === 401) {
        await signOut();
        throw new Error("Error al Actualizar el policia");
      }
      throw new Error("Error al Actualizar el policia");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    return {
      // status:
      error: true,
      message: "Error al Actualizar el policia",
      data: null,
    };
  }
}
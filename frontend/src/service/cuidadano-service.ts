'use server'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthSession } from "@/types/type";
import { auth } from "../../auth";
import { BasicCiudadanoData } from "@/types/cuidadanos";

const url = new URL(process.env.NEXT_API_URL || "");


export async function getCiudadanoByCedula(cedula: number | string) {
    const { user } = (await auth()) as unknown as AuthSession
    try {
        const response = await fetch(`${url.origin}/api/ciudadanos/${cedula}`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            }
        })

        const responseData = await response.json()
        try {
            if (!response.ok) {
                if (response.status === 401) {
                    return {
                        status: 401,
                        data: null,
                        message: 'Unauthorized',
                    }
                }
                throw new Error(responseData.message || (responseData as any)?.msg)
            }

            return responseData as { error: boolean, data: BasicCiudadanoData, message: string }
        } catch (error: any) {
            console.error(error)
            return {
                error: true,
                data: null,
                message: responseData?.message|| 'Error al buscar el ciudadano',
            }
        }
    } catch (error: any) {
        return {
            error: true,
            data: null,
            message: error?.message || 'Internal Server Error',
        }
    }
    
}
export async function getCiudadanos() {
    const { user } = (await auth()) as unknown as AuthSession
    try {
        const response = await fetch(`${url.origin}/api/ciudadanos`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            }
        })

        const responseData = await response.json()
        try {
            if (!response.ok) {
                if (response.status === 401) {
                    return {
                        status: 401,
                        data: null,
                        message: 'Unauthorized',
                    }
                }
                throw new Error(responseData.message || (responseData as any)?.msg)
            }

            return responseData as { error: boolean, data: BasicCiudadanoData[], message: string }
        } catch (error: any) {
            console.error(error)
            return {
                error: true,
                data: null,
                message: responseData?.message|| 'Error al buscar el ciudadano',
            }
        }
    } catch (error: any) {
        return {
            error: true,
            data: null,
            message: error?.message || 'Internal Server Error',
        }
    }
    
}

export async function createCiudadano(data: BasicCiudadanoData) {
    const { user } = (await auth()) as unknown as AuthSession;
    try {
        const response = await fetch(`${url.origin}/api/ciudadanos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`,
            },
            body: JSON.stringify(data),
        })

        const responseData = await response.json()
        console.log(responseData)
        try {
            if (!response.ok) {
                if (response.status === 401) {
                    return {
                        status: 401,
                        data: null,
                        message: 'Unauthorized',
                    }
                }
                throw new Error(responseData.message || (responseData as any)?.msg)
            }

            return responseData as { error: boolean, data: BasicCiudadanoData, message: string }
        } catch (error: any) {
            console.error(error)
            return {
                error: true,
                data: null,
                message: responseData?.message|| 'Error al crear el ciudadano',
            }
        }
    } catch (error: any) {
        console.error(error)
        return {
            data: null,
            error: true,
            message: error?.message || 'Internal Server Error',
        }   
    }
}
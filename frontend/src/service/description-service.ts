'use server'
import { CiudadanoDescriptionData } from "@/types/cuidadanos";
import { auth } from "../../auth";
import { AuthSession } from "@/types/type";

const url = new URL(process.env.NEXT_API_URL || '')

export async function createDescription(data: CiudadanoDescriptionData, id: number | string) {
    const { user } = (await auth()) as unknown as AuthSession;
    try {
        const response = await fetch(`${url.origin}/api/ciudadanos/${id}/description`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`,
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Failed to create description");
        }
        const clone = response.clone();
        try {
            const resJson = await response.json();
            return resJson;
        } catch (error) {
            console.log(error);
            return {
                error: true,
                data: null,
                message: await clone.text() || "Failed to create description"
            }
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            data: null,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            message: error?.message || "Internal Error"
        }
    }
}

export async function getDescriptionByUserID(id: number | string) {
    const { user } = (await auth()) as unknown as AuthSession;
    try {
        const response = await fetch(`${url.origin}/api/ciudadanos/${id}/description`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to get description");
        }
        const clone = response.clone();
        try {
            const resJson = await response.json();
            return resJson as { error: boolean, data: CiudadanoDescriptionData, message: string };
        } catch (error) {
            console.log(error);
            return {
                error: true,
                data: null,
                message: await clone.text() || "Failed to get description"
            }   
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            data: null,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            message: error?.message || "Internal Error"
        }
        
    }
}
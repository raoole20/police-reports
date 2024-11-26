'use server'

import { AuthSession } from "@/types/type";
import { auth } from "../../auth";

const url = new URL(process.env.NEXT_API_URL || '');

export async function getAllDelitos() {
    const { user } = (await auth()) as unknown as AuthSession;

    try {
        const reponse = await fetch(`${url.origin}/api/delitos`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        });

        if (!reponse.ok) {
            throw new Error("Failed to get delitos");
        }

        const clone = reponse.clone();
        try {
            const resJson = await reponse.json();
            return resJson;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return {
                data: null,
                error: true,
                message: await clone.text() || "Failed to get delitos"
            }
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return {
            data: null,
            error: true,
            message: error?.message || "Internal Error"
        }        
    }
}
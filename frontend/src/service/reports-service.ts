/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'
import { ReportesData } from "@/types/reports";
import { auth } from "../../auth";
import { AuthSession } from "@/types/type";

const url = new URL(process.env.NEXT_API_URL || '')

export async function createReports(data: ReportesData, cID: number | string) {
    const { user } = (await auth()) as unknown as AuthSession
    try {
        const response = await fetch(`${url.origin}/api/reports/${user.id}/${cID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`,
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error("Failed to create report")
        }

        const clone = response.clone()
        try {
            const resJson = await response.json()
            return resJson as { error: boolean, message: string, data: null }
        } catch (error) {
            console.log(error)
            return {
                error: true,
                data: null,
                message: await clone.text() || "Failed to create report"
            }
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any){
        console.error(e)
        return { 
            error: true,
            message: e.message || 'Error al crear el reporte',
            data: null
        }
    }
}

export async function getReports() {
    const { user } = (await auth()) as unknown as AuthSession

    try {
        const response = await fetch(`${url.origin}/api/reports`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            }
        })

        if (!response.ok) {
            throw new Error("Failed to get reports")
        }

        const clone = response.clone()
        try {
            const resJson = await response.json()
            return resJson as { error: boolean, message: string, data: ReportesData[] }
        } catch (error) {
            console.log(error)
            return {
                error: true,
                data: [],
                message: await clone.text() || "Failed to get reports"
            }
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any){
        console.error(e)
        return { 
            error: true,
            message: e.message || 'Error al obtener los reportes',
            data: []
        }
    }
}

export async function updateReports(estatus: 'IMPUTADO' | 'INOCENTE' | 'CULPABLE') {
    const { user } = (await auth()) as unknown as AuthSession

    try {
        const response = await fetch(`${url.origin}/api/reports`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`,
            },
            body: JSON.stringify({ estatus })
        })

        if (!response.ok) {
            throw new Error("Failed to update report")
        }

        const clone = response.clone()
        try {
            const resJson = await response.json()
            return resJson as { error: boolean, message: string, data: null }
        } catch (error) {
            console.log(error)
            return {
                error: true,
                data: null,
                message: await clone.text() || "Failed to update report"
            }
        }
    } catch (error) {
        return {
            error: true,
            message: 'Error al actualizar el reporte',
            data: null
        }
    }
}

// export async function getReportsByCID(cID: number | string) {}
export async function getPendingCase() {
    const { user } = (await auth()) as unknown as AuthSession

    try {
        const response = await fetch(`${url.origin}/api/reports/pending`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        })

        if (!response.ok) {
            throw new Error("Failed to get pending case")
        }

        const clone = response.clone()
        try {
            const resJson = await response.json()
            return resJson as { error: boolean, message: string, data: number }
        } catch (error) {
            console.log(error)
            return {
                error: true,
                data: null,
                message: await clone.text() || "Failed to get pending case"
            }
        }
    } catch (error) {
        return {
            error: true,
            message: 'Error al obtener el caso pendiente',
            data: null
        }
    }
}
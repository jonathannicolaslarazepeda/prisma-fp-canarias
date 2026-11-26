import { apiFetch } from '../../../services/api'

export interface EducationalCenter {
    id: number
    name: string
    code: string
    logoUrl: string
    address: string
    isActive: boolean
}

export const educationalCenterService = {

    getAll: () => apiFetch<EducationalCenter[]>('/educational-centers', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (name: string, code: string, logoUrl: string, address: string, isActive: boolean) =>
        apiFetch<EducationalCenter>('/educational-centers', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ name, code, logoUrl, address, isActive })
        }),

    update: (id: number, name: string, code: string, logoUrl: string, address: string, isActive: boolean) =>
        apiFetch<EducationalCenter>(`/educational-centers/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify({ name, code, logoUrl, address, isActive })
        }),

    remove: (id: number) => apiFetch<void>(`/educational-centers/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    })
}
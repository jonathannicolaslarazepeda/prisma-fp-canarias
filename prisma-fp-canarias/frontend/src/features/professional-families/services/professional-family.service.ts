import { apiFetch } from '../../../services/api'

export interface ProfessionalFamily {
    id: number
    name: string
    code: string
    description: string | null
}

export const professionalFamilyService = {

    getAll: () => apiFetch<ProfessionalFamily[]>('/professional-families', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (name: string, code: string, description: string | null) =>
        apiFetch<ProfessionalFamily>('/professional-families', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ name, code, description })
        }),

    update: (id: number, name: string, code: string, description: string | null) =>
        apiFetch<ProfessionalFamily>(`/professional-families/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify({ name, code, description })
        }),

    remove: (id: number) => apiFetch<void>(`/professional-families/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    })
}
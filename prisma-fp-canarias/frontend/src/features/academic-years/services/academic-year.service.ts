import { apiFetch } from '../../../services/api'

export interface AcademicYear {
    id: number
    name: string
    startDate: string
    endDate: string
    isActive: boolean
}

export const academicYearService = {

    getAll: () => apiFetch<AcademicYear[]>('/academic-years', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (name: string, startDate: string, endDate: string, isActive: boolean) =>
        apiFetch<AcademicYear>('/academic-years', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ name, startDate, endDate, isActive })
        }),

    update: (id: number, name: string, startDate: string, endDate: string, isActive: boolean) =>
        apiFetch<AcademicYear>(`/academic-years/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify({ name, startDate, endDate, isActive })
        }),

    remove: (id: number) => apiFetch<void>(`/academic-years/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    })
}
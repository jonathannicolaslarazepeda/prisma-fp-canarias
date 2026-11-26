import { apiFetch } from '../../../services/api'

export interface TrainingProgram {
    id: number
    familyId: number
    centerId: number
    name: string
    code: string
    level: string
    isActive: boolean
}

export const trainingProgramService = {

    getAll: () => apiFetch<TrainingProgram[]>('/training-programs', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (familyId: number, centerId: number, name: string, code: string, level: string, isActive: boolean) =>
        apiFetch<TrainingProgram>('/training-programs', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ familyId, centerId, name, code, level, isActive })
        }),

    update: (id: number, familyId: number, centerId: number, name: string, code: string, level: string, isActive: boolean) =>
        apiFetch<TrainingProgram>(`/training-programs/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify({ familyId, centerId, name, code, level, isActive })
        }),

    remove: (id: number) => apiFetch<void>(`/training-programs/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    })
}
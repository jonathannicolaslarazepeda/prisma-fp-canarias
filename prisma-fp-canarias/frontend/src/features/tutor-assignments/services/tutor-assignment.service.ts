import { apiFetch } from '../../../services/api'

export interface TutorAssignment {
    id: number
    tutorId: number
    programId: number
    academicYearId: number
    assignedAt: string
}

export const tutorAssignmentService = {

    getAll: () => apiFetch<TutorAssignment[]>('/tutor-assignments', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (tutorId: number, programId: number, academicYearId: number, assignedAt?: string) =>
        apiFetch<TutorAssignment>('/tutor-assignments', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ tutorId, programId, academicYearId, assignedAt })
        }),

    update: (id: number, tutorId: number, programId: number, academicYearId: number, assignedAt?: string) =>
        apiFetch<TutorAssignment>(`/tutor-assignments/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify({ tutorId, programId, academicYearId, assignedAt })
        }),

    remove: (id: number) => apiFetch<void>(`/tutor-assignments/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    })
}
import { apiFetch } from '../../../services/api'

export interface StudentEnrollment {
    id: number
    studentId: number
    programId: number
    academicYearId: number
    enrollmentDate: string
    graduationDate: string | null
    status: string
}

export const studentEnrollmentService = {

    getAll: () => apiFetch<StudentEnrollment[]>('/students-enrollments', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (studentId: number, programId: number, academicYearId: number, enrollmentDate: string, graduationDate: string | null, status: string) =>
        apiFetch<StudentEnrollment>('/students-enrollments', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ studentId, programId, academicYearId, enrollmentDate, graduationDate, status })
        }),

    update: (id: number, studentId: number, programId: number, academicYearId: number, enrollmentDate: string, graduationDate: string | null, status: string) =>
        apiFetch<StudentEnrollment>(`/students-enrollments/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify({ studentId, programId, academicYearId, enrollmentDate, graduationDate, status })
        }),

    remove: (id: number) => apiFetch<void>(`/students-enrollments/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    })
}
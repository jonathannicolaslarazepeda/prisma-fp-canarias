import { apiFetch } from '../../../services/api'

export interface AuthUser {
    id: number
    email: string
    firstName: string
    lastName: string
}

export interface LoginResponse {
    user: AuthUser
    token: string
}

export interface RegisterResponse {
    user: AuthUser
    token: string
}

export const authService = {

    // ==================== LOGIN ====================

    login: (email: string, password: string) =>
        apiFetch<LoginResponse>('/auth/login', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ email, password })
        }),

    // ==================== REGISTER ====================

    register: (
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) =>
        apiFetch<RegisterResponse>('/auth/register', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                firstName,
                lastName
            })
        }),

    // ==================== LOGOUT ====================

    logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

}
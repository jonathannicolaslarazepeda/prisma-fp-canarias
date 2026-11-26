// import { apiFetch } from '../../../services/api'
// import { saveSession, clearSession } from '../../../services/session'

// export interface AuthResponse {
//     message: string
//     token: string
//     tokenType: string
//     expiresIn: number
// }

// export const authService = {

//     login: async (email: string, password: string) => {
//         const response = await apiFetch<AuthResponse>('/auth/login', {
//             headers: {
//                 'Authorization': `Basic ${btoa(`${email}:${password}`)}`
//             },
//             method: 'POST'
//         })

//         saveSession({
//             token: response.token,
//             username: email,
//             expiresAt: Date.now() + response.expiresIn * 1000
//         })

//         return response
//     },

//     register: async (email: string, password: string, firstName: string, lastName: string) => {
//         const response = await apiFetch<AuthResponse>('/auth/register', {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Basic ${btoa(`${email}:${password}`)}`
//             },
//             method: 'POST',
//             body: JSON.stringify({ firstName, lastName })
//         })

//         saveSession({
//             token: response.token,
//             username: email,
//             expiresAt: Date.now() + response.expiresIn * 1000
//         })

//         return response
//     },

//     logout: () => clearSession()
// }
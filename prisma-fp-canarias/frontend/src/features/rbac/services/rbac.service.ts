import { apiFetch } from '../../../services/api'

export interface Permission {
    id: number
    code: string
    description: string
}

export interface Role {
    id: number
    name: string
    description: string
}

export interface RolePermission {
    id: number
    roleId: number
    permissionId: number
}

export interface RoleUser {
    id: number
    roleID: number
    userID: number
    assignedAt: string
}

export const rbacService = {

    // ==================== ROLES ====================

    getAllRoles: () => apiFetch<Role[]>('/rbac/roles', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    createRole: (name: string, description: string) =>
        apiFetch<Role>('/rbac/roles', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ name, description })
        }),

    updateRole: (id: number, name: string, description: string) =>
        apiFetch<Role>(`/rbac/roles/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify({ name, description })
        }),

    removeRole: (id: number) =>
        apiFetch<void>(`/rbac/roles/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'DELETE'
        }),

    // ==================== PERMISSIONS ====================

    getAllPermissions: () => apiFetch<Permission[]>('/rbac/permissions', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    createPermission: (code: string, description: string) =>
        apiFetch<Permission>('/rbac/permissions', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ code, description })
        }),

    updatePermission: (id: number, code: string, description: string) =>
        apiFetch<Permission>(`/rbac/permissions/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify({ code, description })
        }),

    removePermission: (id: number) =>
        apiFetch<void>(`/rbac/permissions/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'DELETE'
        }),

    // ==================== ROLE PERMISSIONS ====================

    getRolePermissions: (roleId: number) =>
        apiFetch<Permission[]>(`/rbac/roles/${roleId}/permissions`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }),

    assignPermissionToRole: (roleId: number, permissionId: number) =>
        apiFetch<RolePermission>('/rbac/role-permissions', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ roleId, permissionId })
        }),

    removePermissionFromRole: (id: number) =>
        apiFetch<void>(`/rbac/role-permissions/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'DELETE'
        }),

    // ==================== ROLE USERS ====================

    getUserRoles: (userId: number) =>
        apiFetch<RoleUser[]>(`/rbac/users/${userId}/roles`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }),

    assignRoleToUser: (userID: number, roleID: number, assignedAt?: string) =>
        apiFetch<RoleUser>('/rbac/role-users', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ userID, roleID, assignedAt })
        }),

    removeRoleFromUser: (id: number) =>
        apiFetch<void>(`/rbac/role-users/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'DELETE'
        })

}
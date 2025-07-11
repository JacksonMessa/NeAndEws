import { UserRole } from "./user.type"

export type RegisterFormData = {
    username: string,
    password: string,
    role: UserRole
}
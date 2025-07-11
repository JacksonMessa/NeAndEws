export type UserRole = "WRITER" | "READER";

export type User = {
    username:string,
    role:UserRole
}
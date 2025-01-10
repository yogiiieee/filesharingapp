export interface ErrorProps {
    error: string | null
}

export interface FormErrors {
    username?: string,
    name?: string,
    email?: string,
    password?: string,
    general?: string
}
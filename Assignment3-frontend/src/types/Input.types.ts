export interface InputProps {
    label?: string
    className?: string,
    placeholder?: string,
    value: string,
    name: string,
    onChange: (value: string) => void
    disabled?: boolean
    type?: 'text' | 'email' | 'password' | 'number'
}
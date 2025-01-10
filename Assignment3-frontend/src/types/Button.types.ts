export interface ButtonProps {
    label: string,
    onClick?: (e: React.FormEvent) => void,
    disabled?: boolean,
    variant?: 'primary' | 'secondary' | 'danger',
    className?: string,
}
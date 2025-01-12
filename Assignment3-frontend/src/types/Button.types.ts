import React from "react";

export interface ButtonProps {
    label: string | React.ReactNode,
    onClick?: (e: React.FormEvent) => void,
    disabled?: boolean,
    variant?: 'primary' | 'secondary' | 'danger',
    className?: string,
}
import React from "react";
import { ButtonProps } from "../types/Button.types";

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled = false,
    variant = 'primary',
    className = ''
}) => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    const finalClassName = `${baseClass} ${variantClass} ${className}`.trim();
    return (
        <button
            className={`py-1 px-4 bg-white text-black border-black border-solid border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shadow-black font-semibold ${finalClassName}`}
            onClick={onClick}
            disabled={disabled}
            // type="submit"
        >
            {label}
        </button>
    )
}

export default Button;
import React from "react";
import { InputProps } from "../types/Input.types";

const Input: React.FC<InputProps> = ({
    value,
    onChange,
    name,
    type='text',
    label='',
    disabled=false,
    className='',
    placeholder=''
}) => {
    return <div className={`input-wrapper ${className}`.trim()}>
        <div className="flex items-center gap-2 space-y-2">
            <label htmlFor={`${name}`} className="text-black text-xl font-semibold whitespace-nowrap">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
                value={value}
                className="shadow appearance-none border-black border-2 rounded w-full py-1 px-3 text-black leading-tight focus:outline-double focus:shadow-outline placeholder:text-gray-700 placeholder:font-medium"
                >
            </input>
        </div>
            
    </div>
}

export default Input;
import React from 'react';
import { Link } from 'react-router-dom';
import { NavButtonProps } from '../types/NavButton.types';
import axios from 'axios';

const NavButton: React.FC<NavButtonProps> = ({
    label,
    to,
    disabled=false,
    className=''
}) => {
    const handleClick = async () => {
        if (label === 'logout') {
            document.cookie = 'token=; path=/;';
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('name');
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`);
        }
    }
    return (
    <div>
        <Link to={`${to}`} onClick={handleClick}>
            <button
                disabled={disabled}
                className={`font-semibold text-black bg-white p-2 px-4 border-black border-2 m-2 ${className}`}
            >
                {label}
            </button>
        </Link>
    </div>
    )
};

export default NavButton;

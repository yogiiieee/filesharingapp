import React from 'react'
import { NavProps } from '../types/NavProps';

const Nav: React.FC<NavProps> = ({ children }) => {
  return (
    <div className='flex justify-between items-center'>
        <h2 className='text-[35px] text-center align-middle font-semibold pl-4 h-full'>📁 File Sharing 101</h2>
        <div className='flex justify-between'>
            { children }
        </div>
    </div>
  )
}

export default Nav;

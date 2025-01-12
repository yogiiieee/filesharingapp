import React from 'react'
import { NavProps } from '../types/NavProps';
import FolderSvg from '../assets/folder.svg';

const Nav: React.FC<NavProps> = ({ children }) => {
  return (
    <div className='flex justify-between items-center'>
        <h2 className='text-[35px] text-center align-middle font-semibold pl-4 h-full flex items-center justify-between'>
          <img 
              src={FolderSvg} 
              alt="Folder Icon" 
              className='w-9 h-9 mr-4'
          />
          File Sharing 101
        </h2>
        <div className='flex justify-between'>
            { children }
        </div>
    </div>
  )
}

export default Nav;

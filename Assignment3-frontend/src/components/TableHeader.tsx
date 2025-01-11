import React from 'react'
import { TableHeaderProps } from '../types/TableData.types'

const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => {
  return (
    <tr>
        {
            headers.map((header, index) => (
                <th 
                  key={index}
                  className='border-2 border-black border-b-0 border-t-0 bg-zinc-400 p-2 font-bold text-left' 
                >
                  {header}
                </th>
            ))
        }
    </tr>
  )
}

export default TableHeader;

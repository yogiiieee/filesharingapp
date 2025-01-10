import React from 'react'
import { TableHeaderProps } from '../types/TableData.types'

const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => {
  return (
    <tr>
        {
            headers.map((header, index) => (
                <th key={index}>{header}</th>
            ))
        }
    </tr>
  )
}

export default TableHeader;

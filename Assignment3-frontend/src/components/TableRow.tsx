import React from 'react'
import { TableRowProps } from '../types/TableData.types';

const TableRow: React.FC<TableRowProps> = ({ rowData }) => {
  return (
    <tr className='border-red border-l-2 border-r-2'>
        {
            rowData.map((data, index) => (
                <td key={index}>{data}</td>
            ))
        }
    </tr>
  );
};

export default TableRow;

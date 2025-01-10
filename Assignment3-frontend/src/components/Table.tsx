import React from 'react'
import { TableDataProps } from '../types/TableData.types'
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const Table: React.FC<TableDataProps> = ({ data }) => {
  return (
    <table className='border-black border-2 p-4 ml-[15%] mt-[10%] w-[70%] h-[60vh]'>
        <thead>
            <TableHeader headers={['Name', 'Upload Date', 'Size', 'Actions', 'Sharing']} />
        </thead>
        <tbody>
            {
                data.map((file, index) => (
                    <TableRow 
                        key = {index}
                        rowData={[
                            file.name,
                            file.date,
                            file.size,
                            file.actions === 'both' ? <a href={'/#'}>{file.actions}</a> : <a href={'/#'}>{'download'}</a>,
                            file.sharing
                        ]}
                    />
                ))
            }
        </tbody>
    </table>
  )
}

export default Table;

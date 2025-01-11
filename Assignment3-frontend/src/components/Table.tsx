import React from 'react'
import { TableDataProps } from '../types/TableData.types'
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const Table: React.FC<TableDataProps> = ({ data }) => {
    const hasSharingColumn = data.some(file => 'sharing' in file);
    const headers = hasSharingColumn 
        ? ['Name', 'Upload Date', 'Size', 'Actions', 'Sharing']
        : ['Name', 'Upload Date', 'Size', 'Actions'];

    return (
        <table className='border-black border-2 p-4 ml-[15vh] mt-[2%] w-[84%]'>
            <thead>
                {<TableHeader headers={headers} />}
            </thead>
            <tbody className='h-full'>
                {data.map((file, index) => (
                    <TableRow 
                        key={index}
                        rowIndex={index}
                        rowData={[
                            file.name,
                            file.date,
                            file.size,
                            file.actions === 'delete' 
                                ? <> <a className='underline text-blue-600' href={'/dashboard/#'}>Download</a> | <a className='underline text-blue-600'  href={'/delete'}>Delete</a> </> 
                                : <a className='underline text-blue-600' href={'/dashboard/#'}>Download</a>,
                            ...(hasSharingColumn ? [file.sharing] : [])
                        ]}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default Table;

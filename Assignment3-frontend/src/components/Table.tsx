import React from 'react'
import { TableDataProps } from '../types/TableData.types'
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const Table: React.FC<TableDataProps> = ({ data }) => {
    const hasSharingColumn = data && data.some(file => 'sharing' in file);
    const headers = hasSharingColumn 
        ? ['Name', 'Upload Date', 'Size', 'Actions', 'Sharing']
        : ['Name', 'Upload Date', 'Size', 'Actions'];

    const formatBytes = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
        else if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
        else return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    const formatFilename = (filename: string): string => {
        return filename.split('$_')[1];
    };
    
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
                            formatFilename(file.filename),
                            formatDate(file.uploadedat),
                            formatBytes(file.size),
                            window.location.pathname.includes('dashboard')
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

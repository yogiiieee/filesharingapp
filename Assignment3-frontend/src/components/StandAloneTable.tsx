import React from 'react'
import { TableDataProps } from '../types/TableData.types'
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const StandAloneTable: React.FC<TableDataProps> = ({ data }) => {
    const headers = ['Name', 'Upload Date', 'Size', 'Actions'];

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
                             <a className='underline text-blue-600' href={`${import.meta.env.VITE_API_URL}/download/${file.uuid}`}>Download</a>,
                            file.uuid,
                        ]}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default StandAloneTable;

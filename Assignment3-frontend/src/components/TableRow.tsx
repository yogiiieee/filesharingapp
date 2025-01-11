import React, { useEffect, useState } from 'react'
import { TableRowProps } from '../types/TableData.types';
import Slider from './Slider';
import useDebounce from '../hooks/useDebounce';

const TableRow: React.FC<TableRowProps> = ({ rowData, rowIndex }) => {
  const [sharing, setSharing] = useState<boolean>(rowData[4] === true);
  const debouncedSharing = useDebounce(sharing, 1000);

  useEffect(() => {
    console.log('toggled:', sharing)
  }, [debouncedSharing]);

  const handleToggle = (isOn: boolean) => {
    setSharing(isOn);
  };
  return (
    <tr className={`${rowIndex % 2 == 0 ? 'bg-zinc-200' : 'bg-white'} h-10`}>
        {
            rowData && rowData.length > 0 ? (
              rowData.map((data, index) => (
                <td
                  key={index}
                  className='border-l-2 border-r-2 border-black p-2 font-semibold text-left'
                >
                  {
                    index == 4 ? (
                      <div className='flex'>
                        <Slider 
                          isOn={sharing}
                          onToggle={handleToggle}
                        />
                        {sharing && <a className='ml-3 underline text-blue-600' href="/dashboard/#">Link</a>}
                      </div>
                    ) : (
                      data
                    )
                  }
                </td>
              ))
            ) : (
              Array(Object.keys(rowData).length || 5).fill(null).map((_, index) => (
                <td
                  key={index}
                  className='border-l-2 border-r-2 border-black p-2 font-semibold text-left'
                />
              ))
            )
          }
    </tr>
  );
};

export default TableRow;

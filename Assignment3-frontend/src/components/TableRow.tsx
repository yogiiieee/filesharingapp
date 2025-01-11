import React, { useEffect, useState } from 'react'
import { TableRowProps } from '../types/TableData.types';
import Slider from './Slider';
import useDebounce from '../hooks/useDebounce';
import axios from 'axios';
import useAuthRedirect from '../hooks/useAuthRedirect';

const TableRow: React.FC<TableRowProps> = ({ rowData, rowIndex }) => {
  const [sharing, setSharing] = useState<boolean>(rowData[4] === true);
  const [link, setLink] = useState<string>('');
  const debouncedSharing = useDebounce(sharing, 1000);
  const token = useAuthRedirect();

  useEffect(() => {
    const storedLink = localStorage.getItem(`link-${rowData[0]}`);
    if (storedLink) {
      setLink(storedLink);
    }
    const updateSharing = async () => {
      const filename = rowData[0]
      try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/dashboard/sharing`,{
          filename: filename,
          sharing: debouncedSharing,
        }, { 
          headers: {'Authorization': token}
        });
        if (response.status === 200) {
          const uuidLink = `${import.meta.env.VITE_API_URL}/file/${response.data.uuid}`
          setLink(uuidLink);
          localStorage.setItem(`link-${filename}`, uuidLink);
        }
      } catch (err: any) {
        alert(err.response?.data?.error || 'Error while updating sharing');
      }
    };
    if (debouncedSharing !== rowData[4]) {
      updateSharing();
    }
  }, [debouncedSharing]);

  const handleToggle = (isOn: boolean) => {
    setSharing(isOn);
  };
  return (
    <tr className={`${rowIndex % 2 == 0 ? 'bg-zinc-200' : 'bg-white'} h-10`}>
      {rowData.map((data, index) => (
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
                <a className={`ml-3 underline text-blue-600 ${sharing ? 'visible' : 'invisible'}`} href={link}>Link</a>
              </div>
            ) : (
              data
            )
          }
        </td>
      ))}
    </tr>
  );
};

export default TableRow;

import React, { useEffect, useState } from 'react'
import { TableRowProps } from '../types/TableData.types';
import Slider from './Slider';
import useDebounce from '../hooks/useDebounce';
import axios from 'axios';
import useAuthRedirect from '../hooks/useAuthRedirect';

const TableRow: React.FC<TableRowProps> = ({ rowData, rowIndex, updateParentSharing }) => {
  const hasSharingColumn = typeof rowData[5] !== 'undefined';
  console.log('share',hasSharingColumn)
  const [sharing, setSharing] = useState<boolean>(hasSharingColumn ? rowData[4] as boolean : false);
  const [link, setLink] = useState<string>('');
  const debouncedSharing = useDebounce(sharing, 1000);
  let token = hasSharingColumn ? useAuthRedirect() : null;

  useEffect(() => {
    if (!hasSharingColumn) return;
    console.log('inside this use effect')
    console.log('Debounced Sharing:', debouncedSharing);
    console.log('Row Data:', rowData);
    
    const uuid = rowData[4];
    if (uuid) {
      const uuidLink = `${import.meta.env.VITE_URL}/file/${uuid}`;
      setLink(uuidLink);
    }

    const updateSharingInBackend = async () => {
      const filename = rowData[0];
      try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/dashboard/sharing`,{
          filename: filename,
          sharing: debouncedSharing,
        }, { 
          headers: {'Authorization': token}
        });
        if (response.status === 200) {
          alert('Sharing updated successfully');
          console.log(debouncedSharing)
          console.log(rowData[4])
          const uuid = response.data.uuid;
          if (uuid) {
            const uuidLink = `${import.meta.env.VITE_URL}/file/${uuid}`;
            setLink(uuidLink);
          } else {
            setLink('');
          }
          if (updateParentSharing) {
            updateParentSharing(debouncedSharing);
          }
        }
      } catch (err: any) {
        alert(err.response?.data?.error || 'Error while updating sharing');
      }
    };
    if (debouncedSharing !== rowData[4]) {
      updateSharingInBackend();
    }
  }, [debouncedSharing, rowData, token, hasSharingColumn]);

  const handleToggle = (isOn: boolean) => {
    setSharing(isOn);
  };

  return (
    <tr className={`${rowIndex % 2 == 0 ? 'bg-zinc-200' : 'bg-white'} h-10`}>
      {rowData.map((data, index) => {
        if (index === 4) return null;
        return (
        <td
          key={index}
          className='border-l-2 border-r-2 border-black p-2 font-semibold text-left'
        >
          {
            index === 5 ? (
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
      )})}
    </tr>
  );
};

export default TableRow;

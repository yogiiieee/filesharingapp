import React, { useEffect, useState, useRef } from 'react';
import { TableRowProps } from '../types/TableData.types';
import Slider from './Slider';
import useDebounce from '../hooks/useDebounce';
import axios from 'axios';
import useAuthRedirect from '../hooks/useAuthRedirect';

const TableRow: React.FC<TableRowProps> = ({ rowData, rowIndex }) => {
  const hasSharingColumn = typeof rowData[5] !== 'undefined';
  const [sharing, setSharing] = useState<boolean>(hasSharingColumn ? (rowData[5] as boolean) : false);
  const [link, setLink] = useState<string>('');
  const debouncedSharing = useDebounce(sharing, 1000);
  const token = useAuthRedirect();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!hasSharingColumn) return;

    const uuid = rowData[4];
    if (uuid) {
      const uuidLink = `${import.meta.env.VITE_URL}/file/${uuid}`;
      setLink(uuidLink);
    }
  }, [rowData, hasSharingColumn]);

  useEffect(() => {
    if (!hasSharingColumn || isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const updateSharingInBackend = async () => {
      const filename = rowData[0];

      if (debouncedSharing === rowData[5]) return;

      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/dashboard/sharing`,
          {
            filename: filename,
            sharing: debouncedSharing,
          },
          { headers: { Authorization: token } }
        );
        if (response.status === 200) {
          const uuid = response.data.uuid;
          if (uuid) {
            const uuidLink = `${import.meta.env.VITE_URL}/file/${uuid}`;
            setLink(uuidLink);
          } else {
            setLink('');
          }
        }
      } catch (err: any) {
        alert(err.response?.data?.error || 'Error while updating sharing');
      }
    };

    updateSharingInBackend();
  }, [debouncedSharing]);

  const handleToggle = (isOn: boolean) => {
    setSharing(isOn);
  };

  return (
    <tr className={`${rowIndex % 2 === 0 ? 'bg-zinc-200' : 'bg-white'} h-10`}>
      {rowData.map((data, index) => {
        if (index === 4) return null;
        
        return (
          <td
            key={index}
            className="border-l-2 border-r-2 border-black p-2 font-semibold text-left"
          >
            {index === 5 ? (
              <div className="flex">
                <Slider isOn={sharing} onToggle={handleToggle} /> 
                <a
                  className={`ml-3 underline text-blue-600 ${
                    sharing ? 'visible' : 'invisible'
                  }`}
                  href={link}
                >
                  Link
                </a>
              </div>
            ) : (
              data
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;

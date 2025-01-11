import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import NavButton from './NavButton'
import Table from './Table'
import axios from 'axios'
import useAuthRedirect from '../hooks/useAuthRedirect'

const StandAlone: React.FC = () => {
  const [file, setFile] = useState([]);
  const token = useAuthRedirect();

  const fetchFiles = async (uuid: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/files`, {
            headers: {'Authorization': token},
            params: {uuid},
        });
        setFile(response.data.files);
        
    } catch (err: any) {
        alert(err.response?.data?.error || 'An error occured');
    }
  };

  useEffect(() => {
    fetchFiles('1');
  }, []);

  return (
    <div>
        <div className='flex flex-col h-screen'>
        <Nav>
            <NavButton label='Sign Up' to='/signup'/>
            <NavButton label='Login' to=''/>
        </Nav>
        <div className='ml-[15vh] mr-[15%] mt-[5%] w-[84%] flex justify-between font-semibold text-2xl'>
            Shared file from User
        </div>
        <div>
            <Table data={ file }/>
        </div>
    </div>
    </div>
  )
}

export default StandAlone;

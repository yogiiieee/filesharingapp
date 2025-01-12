import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import NavButton from './NavButton'
import Table from './Table'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const StandAlone: React.FC = () => {
  const [file, setFile] = useState([]);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const { uuid } = useParams<{ uuid: string }>();

  const fetchFile = async (uuid: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/shared`, {
            params: {uuid},
        });
        setFile(response.data.file);
        setName(response.data.name);
        setUsername(response.data.username);
    } catch (err: any) {
        alert(err.response?.data?.error || 'An error occured');
    }
  };

  useEffect(() => {
    fetchFile(uuid!);
  }, [uuid]);

  return (
    <div>
        <div className='flex flex-col h-screen'>
        <Nav>
            <NavButton label='Sign Up' to='/signup'/>
            <NavButton label='Login' to='/login'/>
        </Nav>
        <div className='ml-[15vh] mr-[15%] mt-[5%] w-[84%] flex justify-between font-semibold text-2xl'>
            { `Shared file from ${name} (${username})` }
        </div>
        <div>
            <Table data={ file }/>
        </div>
    </div>
    </div>
  )
}

export default StandAlone;

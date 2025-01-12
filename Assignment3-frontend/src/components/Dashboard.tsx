import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import NavButton from './NavButton'
import Table from './Table'
import Button from './Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useAuthRedirect from '../hooks/useAuthRedirect'
import UserSvg from '../assets/usericon.svg'
import UploadSvg from '../assets/uploadicon.svg'
import LeftArrow from '../assets/leftarrow.svg'
import RightArrow from '../assets/rightarrow.svg'
import LogoutSvg from '../assets/logout.svg'

const Dashboard: React.FC = () => {
    const [files, setFiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMoreFiles, setHasMoreFiles] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const token = useAuthRedirect();

    const fetchFiles = async (page: number) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/files`, {
                headers: {'Authorization': token},
                params: {page},
            });
            setFiles(response.data.files);
            setHasMoreFiles(response.data.hasMoreFiles);
        } catch (err: any) {
            alert(err.response?.data?.error || 'An error occured');
        }
    };

    useEffect(() => {
        fetchFiles(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (!hasMoreFiles && page > currentPage) {
            return;
        }
        setCurrentPage(page);
    };

    const handleProfileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const token = document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1];
            if (!token) {
                return;
            }
            const formData = new FormData();
            formData.append('file', file);
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/dashboard/upload`, formData, {
                    headers: {
                        'Content-type': 'multipart/form-data',
                        'Authorization': `${token}`
                    },
                });
                if (response.status === 201) {
                    alert(`${response.data.filename.split('$_')[1]} ${response.data.message}`);
                    fetchFiles(currentPage);
                }
            } catch (err: any) {
                alert(err.response?.data?.error);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            }
        }
    };
    return (
    <div>
        <div className='flex flex-col h-screen'>
        <Nav>
            <NavButton label={
              <div className='flex items-center justify-between'>
                <img 
                    src={UserSvg} 
                    alt="User Icon" 
                    className='w-5 h-5 mr-2'
                />
                {sessionStorage.getItem('name')}
            </div>
            } to='/profile'/>
            <NavButton label={
                    <div className='flex items-center justify-between'>
                      <img 
                          src={LogoutSvg} 
                          alt="User Icon" 
                          className='w-5 h-5 mr-2'
                      />
                      Logout
                  </div>
                  } to='/login'/>
        </Nav>
        <div className='ml-[15vh] mr-[15%] mt-[5%] w-[84%] flex justify-between font-semibold text-2xl'>
            File Dashboard - {files.length} files
            <Button 
                label={
                    <div className='flex items-center justify-between'>
                      <img 
                          src={UploadSvg} 
                          alt="Upload Icon" 
                          className='w-6 h-6 mr-2'
                      />
                      Upload
                  </div>
                  }
                onClick={handleProfileClick}
            />
            <input
                ref={fileInputRef}
                type='file'
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </div>
        <div>
            <Table data={ files }/>
            <div className="flex justify-center mt-4 items-center">
                <Button label={
                    <div className='flex items-center justify-between'>
                      <img 
                          src={LeftArrow} 
                          alt="LeftArrow Icon" 
                          className='w-4 h-4'
                      />
                  </div>
                  } onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                <span className="px-4 font-semibold text-lg">{`Page ${currentPage}`}</span>
                <Button label={
                    <div className='flex items-center justify-between'>
                      <img 
                          src={RightArrow} 
                          alt="RightArrow Icon" 
                          className='w-4 h-4'
                      />
                  </div>
                  } onClick={() => handlePageChange(currentPage + 1)} />
            </div>
        </div>
    </div>
    </div>
    )
}

export default Dashboard

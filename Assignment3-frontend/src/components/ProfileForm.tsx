import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Error from './Error';
import Button from './Button';
import axios from 'axios';
import useAuthRedirect from '../hooks/useAuthRedirect';

const ProfileForm: React.FC = () => {
    const [name, setName] = useState(sessionStorage.getItem('name') || '');
    const [email, setEmail] = useState(sessionStorage.getItem('email') || '');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const token = useAuthRedirect();

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/dashboard/updateprofile`, {
                name,
                email
            }, {
                headers: { 'Authorization': token }
            });
            if(response.status === 201) {
                alert('Profile updated successfully');
                sessionStorage.setItem('name', name);
                navigate('/dashboard');
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Something went wrong.')
        }
    };

    return (
    <div className='flex items-center justify-center border-black border-4 rounded w-[35%] p-4'>
        <div className='bg-white p-1 rounded w-full max-w-md'>
            <h2 className='text-[35px] mb-6 text-center font-semibold'>{`User Profile - ${sessionStorage.getItem('username')}`}</h2>
            <form>
                <div className='mb-4'>
                    <Input 
                        type='text'
                        label='Name'
                        name='name'
                        value={name}
                        onChange={setName}
                        placeholder={name || 'Update name here'}
                        className='w-full'
                    />
                </div>
                <div className='mb-8'>
                    <Input
                        type='email'
                        name='email'
                        label='Email'
                        value={email}
                        onChange={setEmail}
                        placeholder={email || 'Update email here'}
                        className='w-full'
                    />
                </div>
                <div className='flex justify-center'>
                    { error && <Error error={error} />} 
                </div>
                <div className='flex justify-between'>
                    <Button 
                        label='Cancel'
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/dashboard');
                        }}
                        className='w-[110px] h-[40px] text-[15px]'
                        variant='primary'
                    />
                    
                    <Button 
                        label='Update'
                        onClick={handleUpdate}
                        className='w-[110px] h-[40px] text-[15px]'
                        variant='primary'
                    />
                </div>
            </form>
        </div>
    </div>
    )
}

export default ProfileForm;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';
import Error from './Error';
import axios from 'axios';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
                username,
                password
            });
            if (response.status === 200) {
                navigate('/dashboard');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong.')
        }
    };

    return (
    <div className='flex items-center justify-center border-black border-4 rounded w-[35%] p-4'>
        <div className='bg-white p-1 rounded w-full max-w-md'>
            <h2 className='text-[35px] mb-6 text-center font-semibold'>Login</h2>
            <form>
                <div className='mb-4'>
                    <Input
                        type='text'
                        label='Username:'
                        name='username'
                        value={username}
                        onChange={setUsername}
                        placeholder='Enter username here'
                        className='w-full'
                    />
                    <div className='mb-8'>
                        <Input
                            type='password'
                            name='password'
                            label='Password:'
                            value={password}
                            onChange={setPassword}
                            placeholder='Enter password here'
                            className='w-full'
                        />
                    </div>
                    { error && <Error error='error'/> }
                    <Button
                        label='Submit'
                        onClick={handleLogin}
                        className='w-full text-[18px]'
                        variant='primary'
                    />
                </div>
            </form>
            <div className='flex justify-between items-center'>
                <p className='text-normal font-semibold'>Don't have an account? Click here &gt;</p>
                <Link to='/signup'>
                    <Button 
                        label='Sign up'
                        className='w-[110px] h-[40px] text-[15px]'
                        variant='primary'
                    />
                </Link>
            </div>
        </div>
    </div>
  )
};

export default LoginForm;

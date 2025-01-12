import React, { useState } from 'react'
import Input from './Input';
import Button from './Button';
import Error from './Error';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState<{ [key: string]: string } | null>(null);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
    
        if (!username) {
          newErrors.username = 'Username is required.';
        }
        if (!name) {
          newErrors.name = 'Name is required.';
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = 'Enter a valid email address.';
        }
        if (!password) {
          newErrors.password = 'Password is required.';
        } else if (
          password.length < 8 || !/[A-Z]/.test(password) ||
          !/[a-z]/.test(password) || !/[0-9]/.test(password)
        ) {
          newErrors.password = 'Password must be at least 8 characters long, contain one uppercase, one lowercase letter, and a number.';
        }
    
        setError(newErrors);
        return Object.keys(newErrors).length === 0;
      };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!validateForm()) return;
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
                username: username,
                name: name,
                email: email,
                password: password
            });
            if (response.status === 201) {
                alert('User created!')
                navigate('/login');
            }
        } catch (err: any) {
            const serverError: { [key: string]: string } = {
                serverError: err.response?.data?.error
            };
            setError(serverError || 'Something went wrong.')
        }
    };

    return (
    <div className='flex items-center justify-center border-black border-4 rounded w-[35%] p-4'>
        <div className='bg-white p-1 rounded w-full max-w-md'>
            <h2 className='text-[35px] mb-6 text-center font-semibold'>Sign Up</h2>
            <form onSubmit={handleSignup}>
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
                    { error?.username && <Error error={error.username}/> }
                </div>
                <div className='mb-4'>
                    <Input
                        type='text'
                        label='Name:'
                        name='name'
                        value={name}
                        onChange={setName}
                        placeholder='Enter full name here'
                        className='w-full'
                    />
                    { error?.name && <Error error={error.name}/> }
                </div>
                <div className='mb-4'>
                    <Input
                        type='text'
                        label='Email:'
                        name='email'
                        value={email}
                        onChange={setEmail}
                        placeholder='Enter valid email here'
                        className='w-full'
                    />
                    { error?.email && <Error error={error.email}/> }
                </div>
                <div className='mb-4'>
                    <Input
                        type='password'
                        name='password'
                        label='Password:'
                        value={password}
                        onChange={setPassword}
                        placeholder='Enter password here'
                        className='w-full'
                    />
                    { error?.password && <Error error={error.password}/> }
                </div>
                { error && <Error error={error.serverError}/>}
                <Button
                    label='Submit'
                    onClick={handleSignup}
                    className='w-full text-[18px] mb-4'
                    variant='primary'
                />
            </form>
            <div className='flex justify-between items-center'>
                <p className='text-normal font-semibold'>Have an account? Click here &gt;</p>
                <Link to='/login'>
                    <Button 
                        label='Login'
                        className='w-[110px] h-[40px] text-[15px]'
                        variant='primary'
                    />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default SignupForm

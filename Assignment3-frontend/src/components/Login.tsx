import React from 'react'
import LoginForm from './LoginForm'
import Nav from './Nav'
import NavButton from './NavButton'

const Login: React.FC = () => {
  return (
    <div className='flex flex-col h-screen'>
        <Nav>
            <NavButton label='Login' to=''/>
            <NavButton label='Signup' to='/signup'/>
        </Nav>
        <div className="flex justify-center items-center h-[70vh]">
            <LoginForm />
        </div>
    </div>
  )
}

export default Login

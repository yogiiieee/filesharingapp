import React from 'react'
import SignupForm from './SignupForm'
import Nav from './Nav';
import NavButton from './NavButton';

const Signup: React.FC = () => {
  return (
    <div>
        <Nav>
            <NavButton label='Login' to='/'/>
            <NavButton label='Signup' to=''/>
        </Nav>
        <div className="flex justify-center items-center h-[80vh]">
            <SignupForm />
        </div>
    </div>
  )
}

export default Signup;

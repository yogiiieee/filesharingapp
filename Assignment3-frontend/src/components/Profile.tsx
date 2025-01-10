import React from 'react'
import Nav from './Nav';
import NavButton from './NavButton';
import ProfileForm from './ProfileForm';

const Profile: React.FC = () => {
  return (
    <div className='flex flex-col h-screen'>
        <Nav>
            <NavButton label='🚹 Profile' to='/profile'/>
            <NavButton label='Logout' to=''/>
        </Nav>
        <div className="flex justify-center items-center h-[70vh]">
            <ProfileForm />
        </div>
    </div>
  )
}

export default Profile;

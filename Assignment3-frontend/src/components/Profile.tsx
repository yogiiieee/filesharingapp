import React from 'react'
import Nav from './Nav';
import NavButton from './NavButton';
import ProfileForm from './ProfileForm';

const Profile: React.FC = () => {
  return (
    <div className='flex flex-col h-screen'>
        <Nav>
            <NavButton label={`🚹 ${sessionStorage.getItem('name')}`} to='/profile'/>
            <NavButton label='Logout' to='/login'/>
        </Nav>
        <div className="flex justify-center items-center h-[70vh]">
            <ProfileForm />
        </div>
    </div>
  )
}

export default Profile;

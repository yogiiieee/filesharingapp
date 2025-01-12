import React from 'react'
import Nav from './Nav';
import NavButton from './NavButton';
import ProfileForm from './ProfileForm';
import UserSvg from '../assets/usericon.svg';
import LogoutSvg from '../assets/logout.svg';

const Profile: React.FC = () => {
  return (
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
        <div className="flex justify-center items-center h-[70vh]">
            <ProfileForm />
        </div>
    </div>
  )
}

export default Profile;

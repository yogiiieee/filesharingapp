import React from 'react'
import Nav from './Nav'
import NavButton from './NavButton'
import { TableDataProps } from '../types/TableData.types'
import Table from './Table'
import Button from './Button'

const Dashboard: React.FC<TableDataProps> = ({ data }) => {
  return (
    <div>
        <div className='flex flex-col h-screen'>
        <Nav>
            <NavButton label='🚹 Profile' to='/profile'/>
            <NavButton label='Logout' to='/login'/>
        </Nav>
        <div className='ml-[15vh] mr-[15%] mt-[5%] w-[84%] flex justify-between font-semibold text-2xl'>
            File Dashboard - {data.length} files
            <Button 
                label='⬆ Upload'
                onClick={() => console.log('clicked')}
            />
        </div>
        <div>
            <Table data={ data }/>
        </div>
    </div>
    </div>
  )
}

export default Dashboard

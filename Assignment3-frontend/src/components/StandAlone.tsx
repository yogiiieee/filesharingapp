import React from 'react'
import Nav from './Nav'
import NavButton from './NavButton'
import { TableDataProps } from '../types/TableData.types'
import Table from './Table'

const StandAlone: React.FC<TableDataProps> = ({ data }) => {
  return (
    <div>
        <div className='flex flex-col h-screen'>
        <Nav>
            <NavButton label='Sign Up' to='/signup'/>
            <NavButton label='Login' to=''/>
        </Nav>
        <div className='ml-[15vh] mr-[15%] mt-[5%] w-[84%] flex justify-between font-semibold text-2xl'>
            Shared file from User
        </div>
        <div>
            <Table data={ data }/>
        </div>
    </div>
    </div>
  )
}

export default StandAlone;

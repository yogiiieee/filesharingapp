import React from 'react'
import { ErrorProps } from '../types/Error.types';

const Error: React.FC<ErrorProps> = ({error}) => {
  return (
    <div className='py-2'>
        {error}
    </div>
  )
}

export default Error;

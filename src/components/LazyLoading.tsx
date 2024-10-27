import React from 'react'
import { FourSquare } from 'react-loading-indicators'

const LazyLoading: React.FC = () => {
  return (
    <div className='flex justify-center items-center'>
      <FourSquare color='#0d3356' size='small' text='' textColor='' />
    </div>
  )
}

export default LazyLoading

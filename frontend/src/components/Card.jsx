import React from 'react'

const Card = ({image}) => {
  return (
    <div className=' w-[120px] h-[140px] lg:w-[140px] lg:h-[210px] bg-[#030326] border-2 border-[#0000ff73] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-700 hover:border-4 hover:border-white cursor-pointer'>
      <img src={image} className='h-full object-cover'/>
    </div>
  )
}

export default Card

import React, { useContext } from 'react'
import { userDataContext } from '../context/userContext'

const Card = ({image}) => {
   const {
      frontendImage,
      setFrontendImage,
      backendImage,
      setBackendImage,
      selectedImage,
      setSelectedImage
    } = useContext(userDataContext);
  return (
    <div className={`w-[120px] h-[140px] lg:w-[140px] lg:h-[210px] bg-[#030326] border-2 border-[#0000ff73] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-700 hover:border-4 hover:border-white cursor-pointer ${selectedImage==image ? "border-4 border-white shadow-2xl shadow-blue-600" : null}`} onClick={()=> {
      setSelectedImage(image)
      setBackendImage(null)
      setFrontendImage(null)
      }}>
      <img src={image} className='h-full object-cover'/>
    </div>
  )
}

export default Card

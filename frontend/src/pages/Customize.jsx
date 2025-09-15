import React, { useContext, useRef, useState } from 'react'
import Card from '../components/Card'
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/authBg.png"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"
import { RiImageAddFill } from "react-icons/ri";
import { MdKeyboardBackspace } from "react-icons/md";
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const Customize = () => {
   const {
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage
  } = useContext(userDataContext);
    const inputImage=useRef()
    const handleImage=(e)=>{
       const file=e.target.files[0]
       setBackendImage(file)
       setFrontendImage(URL.createObjectURL(file))
    }
    const navigate=useNavigate()
  return (
    
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#06066d] flex justify-center items-center flex-col p-[20px] gap-[30px] lg:gap-[8px] overflow-hidden relative'>
      <MdKeyboardBackspace className='absolute text-white text-4xl top-[30px] left-[25px] cursor-pointer' onClick={()=> {
        console.log("onclick event are fire")
        navigate("/")
      }}/>
     <h1 className='text-white text-[30px] '>Select Your <span>Assistant Image</span></h1>
      <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[20px] lg:gap-[15px]'>
           <Card image={image1}/>
            <Card image={image2}/>
             <Card image={image3}/>
              <Card image={image4}/>
               <Card image={image5}/>
                <Card image={image6}/>
                 <Card image={image7}/>

                 <div className={` w-[120px] h-[140px] lg:w-[140px] lg:h-[210px] bg-[#030326] border-2 border-[#0000ff73] rounded-2xl overflow-hidden flex justify-center items-center hover:shadow-2xl hover:shadow-blue-700 hover:border-4 hover:border-white cursor-pointer ${selectedImage=="input" ? "border-4 border-white shadow-2xl shadow-blue-600" : null}`}
                  onClick={()=>{
                  inputImage.current.click()
                  setSelectedImage("input")
                 }}>
                       {!frontendImage && <RiImageAddFill className='text-white w-[25px] h-[25px]'/>}
                       {frontendImage && <img src={frontendImage} className='h-full object-cover'/>}
                 </div>
                 <input type="file" accept="image/*" ref={inputImage} hidden onChange={handleImage}/>
                
      </div>
              {selectedImage && <button className='min-w-[148px] h-[58px] bg-white rounded-full mt-[10px] text-black font-semibold text-[19px] cursor-pointer' 
              onClick={()=>navigate("/customize2")}>Next</button> }
                 
    </div>
  )
}

export default Customize

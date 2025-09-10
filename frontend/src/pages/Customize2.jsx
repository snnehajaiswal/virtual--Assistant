import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/userContext'
import axios from 'axios'
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Customize2 = () => {
  const {userData , backendImage , selectedImage ,serverUrl ,setUserData}=useContext(userDataContext)
  const [assistantName,setAssistantName]=useState(userData ?. AssistantName || "")
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const handleUpdateAssistant=async ()=>{
    setLoading(true)
    try{
      let formData=new FormData()
      formData.append("assistantName",assistantName)
      if(backendImage){
        formData.append("assistantImage",backendImage)
      }else{
        formData.append("imageUrl",selectedImage)
      }
       const result=await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true})
       console.log(result.data)
       setLoading(false)
       setUserData(result.data)
      }catch(error){
        setLoading(false)
        console.log(error)
    }
  }

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#06066d] flex justify-center items-center flex-col p-[20px] gap-[30px] lg:gap-[8px] overflow-hidden'>
      <MdKeyboardBackspace className='absolute text-white text-4xl top-[30px] left-[25px]'onClick={()=> navigate("/customize")}/>
      <h1 className='text-white text-[30px] '>Enter Your <span>Assistant Name</span></h1>
      <input type='text' placeholder='eg .Shifra' className='w-full 
      h-[60px] max-w-[600px] px-[20px] py-[10px] rounded-full text-[18px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300' required onChange={(e)=> setAssistantName(e.target.value)} value={assistantName}/>
      {assistantName && <button className='min-w-[310px] h-[58px] bg-white rounded-full mt-[10px] text-black font-semibold text-[19px] cursor-pointer' disabled={loading}
      onClick={()=>{
        handleUpdateAssistant()
        navigate("/")
      }}>{!loading?"Finally Created Your Assistant" : "Loading"}</button>}
      
    </div>
  )
}

export default Customize2

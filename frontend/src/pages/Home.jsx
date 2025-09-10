import React, { useContext } from 'react'
import { userDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const {userData ,serverUrl,setUserData}=useContext(userDataContext)
  const navigate=useNavigate()
  const handleLogOut=async ()=>{
    try{
      const result=await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
      setUserData(null)
      navigate('/signin')
    }catch(error){
     console.log(error)
    }
  }
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#020235] flex justify-center items-center flex-col  gap-[30px] lg:gap-[8px] overflow-hidden '>
      <button className='min-w-[148px] h-[55px] bg-white absolute top-[20px] right-[20px] rounded-full mt-[10px] text-black font-semibold text-[19px] cursor-pointer' onClick={handleLogOut}>Log Out</button>
      <button className='min-w-[270px] h-[55px] bg-white rounded-full mt-[10px] absolute top-[90px] right-[20px] text-black font-semibold text-[19px] cursor-pointer' onClick={()=> navigate("/customize")}>
        Customize your Assiatant
      </button>
      <div className='w-[250px] h-[280px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
        <img src={userData?.assistantImage} alt="" className='h-full object-cover' />
      </div>
      <h1 className='text-white text-2xl font-semibold'>I'm {userData?.assistantName}</h1>
    </div>
  )
}

export default Home

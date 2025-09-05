import React, { useState } from 'react'
import bg from "../assets/authBg.png"
import { IoEye } from "react-icons/io5";
import { AiFillEyeInvisible } from "react-icons/ai";
import {useNavigate} from "react-router-dom"
import { useContext } from 'react';
import { userDataContext } from '../context/userContext';
import axios from "axios"
const SignIn = () => {
  const [showPassword,setShowPassword]=useState(false)
  const {serverUrl,userData,setUserData}=useContext(userDataContext)
  const navigate=useNavigate()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [err,setErr]=useState("")
  const [loading,setLoading]=useState(false)
  const handleSignIn=async (e)=>{
    e.preventDefault()
    setErr("")
    setLoading(true)
     try{
       let result=await axios.post(`${serverUrl}/api/auth/signin`,{
        email,password
       },{withCredentials:true})
       setUserData(result.data)
        setLoading(false)
     }catch(error){
       console.log(error)
       setUserData(null)
       setErr(error.response.data.message)
       setLoading(false)
       navigate("/")
     }
  }
  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{backgroundImage:`url(${bg})`}}>
     <form className='w-[80%] h-[500px] max-w-[500px] px-[20px] bg-[#0000000b]
      backdrop-blur shadow-lg shadow-black flex flex-col items-center
      justify-center gap-[20px]' onSubmit={handleSignIn}
     >
      <h1 className='text-white text-[30px] font-semibold mb-[30px]'>SignIn to <span className='text-blue-400'>Virtual Assistant</span></h1>
      
      <input type='text' placeholder='Enter Your Email' className='w-full 
      h-[60px] px-[20px] py-[10px] rounded-full text-[18px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300'  required onChange={(e)=>setEmail(e.target.value)} value={email}/>
     <div className='w-full 
      h-[60px] px-[20px] py-[10px] rounded-full text-[18px] border-2 border-white
      bg-transparent text-white relative'>
      <input type={showPassword ?"text":"password"} placeholder='Enter password' className='w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]'  required onChange={(e)=>setPassword(e.target.value)} value={password}/>
      {!showPassword && <IoEye className='absolute top-[20px] right-[18px] w-[25px] h-[25px] text-white cursor-pointer' 
      onClick={()=> setShowPassword(true)}/>}
      {showPassword && <AiFillEyeInvisible className='absolute top-[20px] right-[18px] w-[25px] h-[25px] text-white cursor-pointer' 
      onClick={()=> setShowPassword(false)}/>}
     </div>
     {err.length>0 && <p className='text-red-600 text-[20px]'>{err}</p>}
     <button className='min-w-[148px] h-[58px] bg-white cursor-pointer rounded-full mt-[10px] text-black font-semibold text-[19px]' disabled={loading}>{loading?"Loading....":"SignIn"}</button>
      <p className='text-white text-[18px]  cursor-pointer' onClick={()=> navigate("/SignUp")}>Want to create a  account ? <span className='text-blue-500'>Sign Up</span></p>
     </form>
    </div>
  )
}

export default SignIn

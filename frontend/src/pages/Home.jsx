import React, { useContext, useEffect, useState } from "react";
import { userDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import aiImg from "../assets/ai.gif"  
import userImg from "../assets/user.gif"
import { RiMenu3Fill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";

const Home = () => {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext);
  const navigate = useNavigate();
  const [listening,setListening]=useState(false)
  const [userText,setUserText]=useState("")
  const [aiText,setAiText]=useState("")
  const isSpeakingRef=useRef(false)
  const recognitionRef=useRef(null)
  const [ham,setHam]=useState(false)
  const isRecognizingRef=useRef(false)
  const synth= window.speechSynthesis
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };
   
   const startRecognition=()=>{
    try{
       recognitionRef.current?.start()
       setListening(true)
    }catch(error){
      if(!error.message.includes("start")){
        console.error("Recognition error:",error)
      }
    }
   }

   const speak=(text)=>{
    const utterence=new SpeechSynthesisUtterance(text)
    isSpeakingRef.current=true
    utterence.onend=()=>{
    isSpeakingRef.current=false
    startRecognition()
    }
    synth.speak(utterence)
   }

   const handleCommand=(data)=>{
    const {type,userInput,response}=data
    speak(response);

    if(type === "google_search"){
      const query=encodeURIComponent(userInput)
      window.open(`https://www.google.com/search?q=${query}`, "_blank")
    }
    if(type === "youtube_search" || type === "youtube_play"){
       const query=encodeURIComponent(userInput)
        window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
    }
    if(type === "calculator_open"){
       window.open("https://www.google.com/search?q=calculator", "_blank");

    }
    if(type === "instagram_open"){
        window.open("https://www.instagram.com", "_blank");
    }
    if(type === "facebook_open"){
        window.open("https://www.facebook.com", "_blank");
    }
    if(type === "weather-show"){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=weather+${query}`, "_blank");
    }
   }

  useEffect(()=>{
    const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition 
    const recognition=new SpeechRecognition()
    recognition.continuous=true,
    recognition.lang='en-US'

    recognitionRef.current=recognition

    

    const safeRecognition=()=>{
      if(!isSpeakingRef.current && !isRecognizingRef.current){
        try{
            recognition.start()
            console.log("Recognition requested to start")
        }catch(err){
          if(err.name !== "InvalidStateError"){
            console.error("Start error :",err)
          }
        }
      }
    }

    recognition.onstart=()=>{
      console.log("Recognition started")
      isRecognizingRef.current=true;
      setListening(true)
    }

    recognition.onend=()=>{
      console.log("Recognition ended");
      isRecognizingRef.current=false
      setListening(false)

      if(!isSpeakingRef.current){
        setTimeout(()=>{
          safeRecognition()
        },1000)
      }
    }

    recognition.onerror=(event)=>{
      console.warn("Recognition error :",event.error)
      isRecognizingRef.current=false;
      setListening(false)
      if(event.error !== "aborted" && !isSpeakingRef.current){
        setTimeout(()=>{
          safeRecognition()
        },1000)
      }
    }

    recognition.onresult=async (e)=>{
      const transcript=e.results[e.results.length-1][0].transcript.trim()
      console.log("heard :"+transcript)
      if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
        setAiText("")
        setUserText(transcript)
        recognition.stop()
        isRecognizingRef.current=false
        setListening(false)
        const data=await getGeminiResponse(transcript)
        console.log(data)
        handleCommand(data)
        setAiText(data.response)
        setUserText("")
      }

    }

    const fallback=setInterval(()=>{
       if(!isSpeakingRef.current && !isRecognizingRef.current){
        safeRecognition()
       }
    },10000)
     safeRecognition()
    return()=>{
      recognition.stop()
      setListening(false)
      isRecognizingRef.current=false
      clearInterval(fallback)
    }
    
  },[])


  

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#020235] flex justify-center items-center flex-col  gap-[30px] lg:gap-[8px] overflow-hidden ">
      <RiMenu3Fill className="lg:hidden text-white absolute top-[20px] right-[30px] text-4xl" 
      onClick={()=>setHam(true)}/>
      <div className={`absolute top-0 w-full h-full bg-[#0000001b] backdrop-blur-lg p-[20px] flex flex-col items-start gap-[20px]
        ${ham?"translate-x-0":"-translate-x-full"} transition-transform`}>
         <RxCross1 className=" text-white absolute top-[20px] right-[30px] text-4xlrs" onClick={()=>setHam(false)}/>
           <button
        className="min-w-[100px] h-[55px] bg-white  rounded-full mt-[10px] text-black font-semibold text-[19px] cursor-pointer"
        onClick={handleLogOut}
      >
        Log Out
      </button>
      <button
        className="min-w-[270px] h-[55px] bg-white rounded-full mt-[10px] text-black font-semibold text-[19px] cursor-pointer"
        onClick={() => navigate("/customize")}
      >
        Customize your Assiatant
      </button>
      <div className="w-full h-[2px] bg-gray-400"></div>
      <h1 className="text-white font-semibold text-[19px]">History</h1>
      <div className="w-full h-[60%] overflow-y-auto flex flex-col gap-[20px]">
  {userData.history?.map((his, index) => (
    <span key={index} className="text-white text-[18px] truncate">
      {his}
    </span>
  ))}
</div>

      </div>
      <button
        className="min-w-[148px] h-[55px] bg-white absolute hidden lg:block top-[20px] right-[20px] rounded-full mt-[10px] text-black font-semibold text-[19px] cursor-pointer"
        onClick={handleLogOut}
      >
        Log Out
      </button>
      <button
        className="min-w-[270px] h-[55px] bg-white rounded-full mt-[10px] absolute hidden lg:block top-[90px] right-[20px] text-black font-semibold text-[19px] cursor-pointer"
        onClick={() => navigate("/customize")}
      >
        Customize your Assiatant
      </button>
      <div className="w-[240px] h-[260px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
        <img
          src={userData?.assistantImage}
          alt=""
          className="h-full object-cover"
        />
      </div>
      <h1 className="text-white text-2xl font-semibold">
        I'm {userData?.assistantName}
      </h1>
      {!aiText && <img src={userImg} alt="" className="w-[190px]"/>}
      {aiText && <img src={aiImg} alt="" className="w-[190px]"/>}
      <h1 className="text-white font-semibold text-2xl">{userText?userText:aiText?aiText:null}</h1>
    </div>
  );
};

export default Home;

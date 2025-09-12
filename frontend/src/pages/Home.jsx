import React, { useContext, useEffect } from "react";
import { userDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";

const Home = () => {
  const { userData, serverUrl, setUserData, getGeminiResponse } =
    useContext(userDataContext);
  const navigate = useNavigate();
  const [listening,setListening]=useState(false)
  const isSpeakingRef=useRef(false)
  const recognitionRef=useRef(null)
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

   const speak=(text)=>{
    const utterence=new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(utterence)
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

    recognition.onresult=async (e)=>{
      const transcript=e.results[e.results.length-1][0].transcript.trim()
      console.log("heard :"+transcript)
      if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
        const data=await getGeminiResponse(transcript)
        console.log(data)
        handleCommand(data)
        // speak(data.response)
      }

    }
    recognition.start()
  },[])


  

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#020235] flex justify-center items-center flex-col  gap-[30px] lg:gap-[8px] overflow-hidden ">
      <button
        className="min-w-[148px] h-[55px] bg-white absolute top-[20px] right-[20px] rounded-full mt-[10px] text-black font-semibold text-[19px] cursor-pointer"
        onClick={handleLogOut}
      >
        Log Out
      </button>
      <button
        className="min-w-[270px] h-[55px] bg-white rounded-full mt-[10px] absolute top-[90px] right-[20px] text-black font-semibold text-[19px] cursor-pointer"
        onClick={() => navigate("/customize")}
      >
        Customize your Assiatant
      </button>
      <div className="w-[250px] h-[280px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
        <img
          src={userData?.assistantImage}
          alt=""
          className="h-full object-cover"
        />
      </div>
      <h1 className="text-white text-2xl font-semibold">
        I'm {userData?.assistantName}
      </h1>
    </div>
  );
};

export default Home;

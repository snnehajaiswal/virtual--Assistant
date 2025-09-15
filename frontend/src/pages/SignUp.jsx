import React, { useState, useContext } from 'react';
import bg from "../assets/background_Img.mp4";
import { IoEye } from "react-icons/io5";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { userDataContext } from '../context/UserContext';
import axios from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      );
      setUserData(result.data);
      setLoading(false);
      navigate("/customize");
    } catch (error) {
      console.log(error);
      setErr(error.response?.data?.message || "Signup failed");
      setUserData(null);
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src={bg} type="video/mp4" />
      </video>

      
      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      
      <form
        className="w-[80%] h-[500px] max-w-[500px] px-[20px] bg-[#0000003b] 
        backdrop-blur shadow-lg shadow-black flex flex-col items-center
        justify-center gap-[20px] rounded-xl"
        onSubmit={handleSignUp}
      >
        <h1 className="text-white text-[30px] font-semibold mb-[30px]">
          Register to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        <input
          type="text"
          placeholder="Enter Your Name"
          className="w-full h-[60px] px-[20px] py-[10px] rounded-full text-[18px] 
          outline-none border-2 border-white bg-transparent text-white 
          placeholder-gray-300"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <input
          type="text"
          placeholder="Enter Your Email"
          className="w-full h-[60px] px-[20px] py-[10px] rounded-full text-[18px] 
          outline-none border-2 border-white bg-transparent text-white 
          placeholder-gray-300"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div
          className="w-full h-[60px] px-[20px] py-[10px] rounded-full text-[18px] 
          border-2 border-white bg-transparent text-white relative"
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="w-full h-full rounded-full outline-none bg-transparent 
            placeholder-gray-300 px-[20px] py-[10px]"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {!showPassword && (
            <IoEye
              className="absolute top-[20px] right-[18px] w-[25px] h-[25px] text-white cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
          {showPassword && (
            <AiFillEyeInvisible
              className="absolute top-[20px] right-[18px] w-[25px] h-[25px] text-white cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>

        {err.length > 0 && (
          <p className="text-red-500 text-[18px]">{err}</p>
        )}

        <button
          className="min-w-[148px] h-[58px] bg-white cursor-pointer rounded-full 
          mt-[10px] text-black font-semibold text-[19px]"
          disabled={loading}
        >
          {loading ? "Loading...." : "SignUp"}
        </button>

        <p
          className="text-white text-[18px] cursor-pointer"
          onClick={() => navigate("/SignIn")}
        >
          Already have an account ?{" "}
          <span className="text-blue-400">Sign In</span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;

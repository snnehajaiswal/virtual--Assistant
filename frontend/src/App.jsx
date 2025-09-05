import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Customize from './pages/Customize'
import Home from './pages/Home'
import { userDataContext } from './context/userContext'

const App = () => {
  const { userData, setUserData } = useContext(userDataContext)

  return (
    <Routes>
      <Route
        path="/"
        element={
          (userData?.assistantImage && userData?.assistantName)
            ? <Home />
            : <Navigate to="/customize" />
        }
      />
      <Route
        path="/signup"
        element={
          !userData
            ? <SignUp />
            : <Navigate to="/" />
        }
      />
      <Route
        path="/signin"
        element={
          !userData
            ? <SignIn />
            : <Navigate to="/" />
        }
      />
      <Route
        path="/customize"
        element={
          userData
            ? <Customize />
            : <Navigate to="/signin" />
        }
      />
    </Routes>
  )
}

export default App

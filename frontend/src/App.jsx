import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Customize from './pages/Customize'
import Customize2 from './pages/Customize2'
import Home from './pages/Home'
import { userDataContext } from './context/UserContext'

const App = () => {
  const { userData } = useContext(userDataContext)

  return (
     <Routes>
     
      <Route
        path="/"
        element={
          userData
            ? <Home />
            : <Navigate to="/signin" />
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
            : <Navigate to="/signup" />
        }
      />

      
      <Route
        path="/customize2"
        element={
          userData
            ? <Customize2 />
            : <Navigate to="/signup" />
        }
      />
    </Routes>
  )
}

export default App

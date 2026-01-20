import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/signup.jsx'
import SignIn from './pages/signin.jsx'
import ForgotPassword from './pages/forgotPassword.jsx'
import { useSelector } from 'react-redux'
import Home from './pages/Home.jsx'
import useGetCurrentUser from './hooks/useGetCurrentUser.jsx'
import { useEffect } from 'react'
import ProfilePage from './pages/profilePage.jsx'
import EditProfile from './pages/EditProfile.jsx'
import Upload from './pages/Upload.jsx'
import Loops from './pages/Loops.jsx'
import StoryPage from './pages/StoryPage.jsx'


function App() {
  useGetCurrentUser() //Custom Hook for adding current user in store
  const {userData} = useSelector(state=> state.user)
  return (
    <Routes>
      <Route path='/signup' element={!userData ? <SignUp/> : <Navigate to='/' />}/>
      <Route path='/signin' element={!userData ? <SignIn/> : <Navigate to='/' />} />
      <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to='/' />}  />
      <Route path='/' element={userData ? <Home /> : <Navigate to='/signin' />} />
      <Route path='/profile/:username' element={userData ? <ProfilePage /> : <Navigate to='/signin'/>} />
      <Route path='/editprofile' element={userData ? <EditProfile /> : <Navigate to='/signin' /> } />
      <Route path='/upload' element={userData ? <Upload /> : <Navigate to='/signin' />}/>
      <Route path='/loops' element={userData ? <Loops /> : <Navigate to='/signin' />} />
      <Route path='/stories/:username' element={userData ? <StoryPage /> : <Navigate to='/signin' />} />
    </Routes>
  )
}

export default App

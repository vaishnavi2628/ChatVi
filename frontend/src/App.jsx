import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import CallPage from "./pages/CallPage.jsx"
import ChatPage from './pages/ChatPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import Notification from './pages/NotificationsPage.jsx'
import {Toaster} from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx"
import useAuthUser from './hooks/useAuthUser.jsx'
import Layout from './components/Layout.jsx'
import {useThemeStore} from './store/useThemeStore.jsx'

const App = () => {
   //tanstack query
     const {isLoading,authUser}=useAuthUser();
     const isAuthenticated= Boolean(authUser);
     const isOnboarded = authUser?.isOnboarded 
     const {theme}=useThemeStore();

   
   if(isLoading){
    return <PageLoader/>
   }

  return (
  //  const {data}= useQuery()
    <div className="h-screen " data-theme={theme}>

      <Routes>
        <Route path='/' element={ isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
           <HomePage/>
          </Layout>
          
          
          
         ) :(
          <Navigate to={!isAuthenticated ?"/login" : "/onboarding"} />
        )



        }></Route>
        <Route path='/signup' element={!isAuthenticated ? < SignUpPage/> : <Navigate to={
          isOnboarded ? "/": "/onboarding" }/>}></Route>
        <Route path='/login' element={!isAuthenticated ?    <LoginPage/> : <Navigate to={
          isOnboarded ? "/": "/onboarding" }/>}></Route>
        <Route path='/notification' element={ isAuthenticated  && isOnboarded ?  ( 
          <Layout showSidebar={true}>
            <Notification/> 
            </Layout>):(!isAuthenticated ? <Navigate to="/login"/>: <Navigate to="/onboarding"/>) }></Route>
            <Route
  path="/call/:id"
  element={
    isAuthenticated && isOnboarded ? (
      <CallPage />
    ) : (
      <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
    )
  }
/>
        <Route path='/chat/:id'  element={ isAuthenticated 
          && isOnboarded ?(<Layout showSidebar={false}>
             <ChatPage/>
          </Layout>):(
            <Navigate to={!isAuthenticated ?"/login":"/onboarding"}/>
          )
            }></Route>
        <Route
  path="/onboarding"
  element={
    isAuthenticated ? (
      !isOnboarded ? (
        <OnboardingPage />
      ) : (
        <Navigate to="/" />
      )
    ) : (
      <Navigate to="/login" />
    )
  }
/>
      </Routes>
      <Toaster/> 
    </div>
  )
}

export default App

import './App.css'
import Home from './pages/Home'
import Header from './pages/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function App() {
  const { user, error, loading,success } = useSelector((state) => state.auth);


  return (
    <>
    
   
      <Routes>
      <Route path="/" element={!user ?<> <Header/><Home/></> : <Navigate to={"/dashboard"}/>}/> 
      <Route path="/dashboard" element={user ?<> <Header/> <Dashboard/></>: <Navigate to={"/"}/>}/> 
      <Route path="*" element={user ?<> <Header/> <Dashboard/></>: <Navigate to={"/"}/>}/> 

      </Routes>
  
    </>
  )
}

export default App

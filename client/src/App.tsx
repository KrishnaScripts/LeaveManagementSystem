import React from 'react';
import './App.css';
import { BrowserRouter as  Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './component/Home';
import LandingPage from './component/LandingPage';
import Header from './component/Header';
import Users from './component/Users';
import ApplyLeave from './component/ApplyLeave';
import AdminDashboard from './component/AdminDashboard';
const App = () => {
  const location = useLocation(); 
  return (
   <>
    <div className='App'>
    { location.pathname !== '/' && <Header />}
    <div className={location.pathname !== '/' ? 'content-wrapper' : ''}>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/landingPage" element={<LandingPage/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/applyLeaves" element={<ApplyLeave/>}/>
        <Route path="/adminDashboard" element={<AdminDashboard/>}/>
    </Routes>
    </div>
    </div>
   </>
  );
}

export default App;

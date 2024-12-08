import React from 'react';
import cravemates_Login from './cravemates_Login';
import App from './App'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import cravemates_SignUp from './cravemates_SignUp';
import Dashboard from './dashboard';

function MyRouting()
{
    return(
        <>
        <Router>
            <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/login" element={<cravemates_Login />}/>
            <Route path="/signup" element ={<cravemates_SignUp/>}/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element ={<App/>} />
            </Routes>
       </Router>
        </>
    );
};


export default MyRouting;

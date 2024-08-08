import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import SignInPage from './pages/SignInPage'
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import { selectAuthState } from "./redux/slices/authSlice";
import storage from "./utils/localStorage";


function App() {

    const { user } = useSelector(selectAuthState);
    
    const isLoggedIn = storage.loadUser() || user;


    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/signin" element={!isLoggedIn ? <SignInPage/> : <Navigate to="/dashboard"/>}/>
                <Route path="/signup" element={!isLoggedIn ? <SignUp/> : <Navigate to="/dashboard"/>}/>
                <Route path="/dashboard" element={isLoggedIn ? <Dashboard/> : <Navigate to="/login"/>}/>
                
            </Routes>

        </Router>
        )
}

export default App;

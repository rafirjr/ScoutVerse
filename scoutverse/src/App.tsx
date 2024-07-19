import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";


function App() {

    const isAuthenticated = () => {
        return !!localStorage.getItem('token')
    }    


    return (
        <Router>
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>

        </Router>
        )
}

export default App;

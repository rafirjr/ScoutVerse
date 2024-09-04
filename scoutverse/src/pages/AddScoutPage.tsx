"use client";

import React from "react";
import Sidebar from "../components/sidebar";
import Topnav from "../components/topnav";
import NewScoutForm from "../components/newScoutForm";

const AddScout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
            <Topnav />

            <div className="container mx-auto h-10"></div>
            <div className="container mx-auto h-10"></div>
            <div className="container mx-auto h-10"></div>
            <Sidebar />
            <NewScoutForm />

            <div className="container mx-auto h-10"></div>
            <div className="container mx-auto h-10"></div>
            <div className="container mx-auto h-10"></div>
        </div>
    );
};

export default AddScout;

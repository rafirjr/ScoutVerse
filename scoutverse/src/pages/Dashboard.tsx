import React from "react";
import Sidebar from "../components/sidebar";
import Topnav from "../components/topnav";
import ToastNotification from "../components/toastNotification";

const Dashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
            <Topnav />
            <Sidebar />
            <div className="container mx-auto h-10"></div>
            <div className="container mx-auto h-10"></div>
            <div className="container mx-auto h-10"></div>
            <ToastNotification />
        </div>
    );
};

export default Dashboard;

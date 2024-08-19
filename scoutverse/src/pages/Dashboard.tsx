import React from "react";
import Sidebar from "../components/sidebar";
import Topnav from "../components/topnav";

const Dashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
            <Topnav />
            <Sidebar />
        </div>
    );
};

export default Dashboard;

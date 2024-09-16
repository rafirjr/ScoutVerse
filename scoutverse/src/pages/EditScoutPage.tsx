import React from "react";
import Sidebar from "../components/sidebar";
import Topnav from "../components/topnav";
import ToastNotification from "../components/toastNotification";
import RosterTable from "../components/rosterTable";
import { useSelector } from "react-redux";
import { selectScoutState } from "../redux/slices/scoutSlice";
import EditScoutForm from "../components/editScoutForm";

const EditScoutPage: React.FC = () => {
    const scoutState = useSelector(selectScoutState);

    return (
        <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
            <Topnav />
            <Sidebar />
            <div className="container mx-auto h-10"></div>
            <div className="container mx-auto h-10"></div>
            <div className="flex justify-center container mx-auto ">
                <ToastNotification />
            </div>
            <div className="container mx-auto h-10"></div>
            <EditScoutForm />
            <div className="container mx-auto h-10"></div>
            <div className="container mx-auto h-10"></div>
        </div>
    );
};

export default EditScoutPage;

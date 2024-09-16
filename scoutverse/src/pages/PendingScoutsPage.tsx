import React from "react";
import Sidebar from "../components/sidebar";
import Topnav from "../components/topnav";
import ToastNotification from "../components/toastNotification";
import RosterTable from "../components/rosterTable";
import { useSelector } from "react-redux";
import { selectScoutState } from "../redux/slices/scoutSlice";
import PendingTable from "../components/pendingTable";

const PendingScoutsPage: React.FC = () => {
    const scoutState = useSelector(selectScoutState);
    const scoutList = scoutState.allScouts;

    const pendingList = scoutList.filter((scout) => scout.status === "PENDING");

    return (
        <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
            <Topnav />
            <Sidebar />
            <div className="container mx-auto h-10"></div>
            <div className="container mx-auto h-10"></div>
            <div className="container mx-auto h-10"></div>
            <div className="flex justify-center container mx-auto ">
                <ToastNotification />
            </div>
            <div className="container mx-auto h-10"></div>
            <PendingTable scouts={pendingList} />
        </div>
    );
};

export default PendingScoutsPage;

import React from "react";
import Sidebar from "../components/sidebar";
import Topnav from "../components/topnav";
import ToastNotification from "../components/toastNotification";
import { useSelector } from "react-redux";
import { selectAttendanceState } from "../redux/slices/attendanceSlice";
import AttendanceRecordsTable from "../components/attendanceRecordsTable";

const AttendanceRecordsPage: React.FC = () => {
    const attendanceState = useSelector(selectAttendanceState);

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
            <AttendanceRecordsTable />
        </div>
    );
};

export default AttendanceRecordsPage;

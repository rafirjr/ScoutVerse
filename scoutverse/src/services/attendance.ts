import axios from "axios";
import backendUrl from "../backendUrl";
import { setConfig } from "./auth";
import { AttendanceData } from "../redux/types";

const baseUrl = `${backendUrl}/attendance`;
const token = localStorage.getItem("authToken");

// Get all attendance logs from a specific date
const getDateAttendance = async (date: string) => {
    const response = await axios.get(`${baseUrl}/${date}`, {
        headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
        },
    });
    return response.data;
};

// Get all attendance logs of a scout
const getScoutAttendance = async (scoutID: string) => {
    const response = await axios.get(`${baseUrl}/${scoutID}`, setConfig());
    return response.data;
};

// Log an attendance
const logAttendance = async (scoutID: string, data: AttendanceData) => {
    const response = await axios.post(`${baseUrl}/${scoutID}`, data, {
        headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

// Update an attendance record
const updateAttendance = async (
    scoutID: string,
    attendanceID: string,
    data: AttendanceData
) => {
    const response = await axios.put(
        `${baseUrl}/${scoutID}/attendance/${attendanceID}`,
        data,
        {
            headers: {
                "x-auth-token": token,
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
};

// Delete an attendance record
const deleteAttendance = async (scoutID: string, attendnanceID: string) => {
    const response = await axios.delete(
        `${baseUrl}/${scoutID}/attendance/${attendnanceID}`,
        setConfig()
    );
    return response.data;
};

const attendanceService = {
    getDateAttendance,
    updateAttendance,
    deleteAttendance,
    logAttendance,
    getScoutAttendance,
};

export default attendanceService;

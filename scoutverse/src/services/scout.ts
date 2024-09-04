import axios from "axios";
import backendUrl from "../backendUrl";
import { setConfig } from "./auth";
import { ScoutData } from "../redux/types";

const baseUrl = `${backendUrl}/scouts`;

const getAllScouts = async () => {
    const response = await axios.get(baseUrl, setConfig());
    return response.data;
};

const getScoutGroup = async (group: string) => {
    const response = await axios.get(`${baseUrl}/${group}`, setConfig());
    return response.data;
};

const getScout = async (scoutID: string) => {
    const response = await axios.get(`${baseUrl}/id/${scoutID}`, setConfig());
    return response.data;
};

const addScout = async (scoutData: ScoutData) => {
    console.log("scout.ts " + localStorage.getItem("authToken"));
    const token = localStorage.getItem("authToken");
    const response = await axios.post(baseUrl, scoutData, {
        headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

const updateScout = async (scoutID: string, scoutData: ScoutData) => {
    const response = await axios.put(
        `${baseUrl}/${scoutID}`,
        scoutData,
        setConfig()
    );
    return response.data;
};

const deleteScout = async (scoutID: string) => {
    const response = await axios.delete(`${baseUrl}/${scoutID}`, setConfig());
    return response.data;
};

const scoutService = {
    getAllScouts,
    getScoutGroup,
    getScout,
    addScout,
    updateScout,
    deleteScout,
};

export default scoutService;

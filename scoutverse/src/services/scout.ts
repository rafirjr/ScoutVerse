import axios from "axios";
import backendUrl from "../backendUrl";
import { setConfig } from "./auth";
import { ScoutPayload } from "../redux/types";

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

const addScout = async (scoutData: ScoutPayload) => {
    const response = await axios.post(baseUrl, scoutData, setConfig());
    return response.data;
};

const updateScout = async (scoutID: string, scoutData: ScoutPayload) => {
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

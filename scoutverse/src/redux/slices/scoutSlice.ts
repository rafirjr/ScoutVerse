import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScoutData, ScoutPayload, ScoutSortValues } from "../types";
import { AppThunk, RootState } from "../store";
import scoutService from "../../services/scout";
import { getErrorMsg } from "../../utils/helperFuncs";
import { notify } from "./notificationSlice";

interface initialScoutState {
    allScouts: ScoutPayload[];
    sortBy: ScoutSortValues;
    fetchStatus: "idle" | "loading" | "succeeded" | "failed";
    fetchError: string | null;
    isLoading: boolean;
    submitError: string | null;
}

const initialState: initialScoutState = {
    allScouts: [],
    sortBy: "dob",
    fetchStatus: "idle",
    fetchError: null,
    isLoading: false,
    submitError: null,
};

const scoutSlice = createSlice({
    name: "scout",
    initialState,
    reducers: {
        setScouts: (state, action: PayloadAction<ScoutPayload[]>) => {
            state.allScouts = action.payload;
            state.fetchStatus = "succeeded";
            state.fetchError = null;
        },
        addScout: (state, action: PayloadAction<ScoutPayload>) => {
            state.allScouts.push(action.payload);
            state.isLoading = false;
            state.submitError = null;
        },
        deleteScout: (state, action: PayloadAction<string>) => {
            state.allScouts = state.allScouts.filter(
                (s) => s.id !== action.payload
            );
        },
        updateScout: (
            state,
            action: PayloadAction<{ data: ScoutData; scout_id: string }>
        ) => {
            state.allScouts = state.allScouts.map((s) =>
                s.id === action.payload.scout_id
                    ? { ...s, ...action.payload.data }
                    : s
            );
            state.isLoading = false;
            state.submitError = null;
        },
        setFetchScoutsLoading: (state) => {
            state.fetchStatus = "loading";
            state.fetchError = null;
        },
        setFetchScoutsError: (state, action: PayloadAction<string>) => {
            state.fetchStatus = "failed";
            state.fetchError = action.payload;
        },
        setSubmitScoutsLoading: (state) => {
            state.isLoading = true;
            state.submitError = null;
        },
        setSubmitScoutsError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.submitError = action.payload;
        },
        clearError: (state) => {
            state.submitError = null;
        },
        sortScoutsBy: (state, action: PayloadAction<ScoutSortValues>) => {
            state.sortBy = action.payload;
        },
    },
});

export const {
    setScouts,
    addScout,
    deleteScout,
    updateScout,
    setFetchScoutsLoading,
    setFetchScoutsError,
    setSubmitScoutsLoading,
    setSubmitScoutsError,
    clearError,
    sortScoutsBy,
} = scoutSlice.actions;

export const fetchAllScouts = (): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setFetchScoutsLoading());
            const allScouts = await scoutService.getAllScouts();
            dispatch(setScouts(allScouts));
        } catch (error: any) {
            dispatch(setFetchScoutsError(getErrorMsg(error)));
        }
    };
};

//fetchEachGroup
//Add separate arrays to scoutState

export const createNewScout = (scoutData: ScoutData): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setSubmitScoutsLoading());
            const newScout = await scoutService.addScout(scoutData);
            dispatch(addScout(newScout));
            dispatch(notify("New scout added!", "success"));
        } catch (error: any) {
            dispatch(setSubmitScoutsError(getErrorMsg(error)));
        }
    };
};

export const removeScout = (scoutID: string): AppThunk => {
    return async (dispatch) => {
        try {
            await scoutService.deleteScout(scoutID);
            dispatch(deleteScout(scoutID));
            dispatch(notify("Deleted the scout.", "success"));
        } catch (error: any) {
            dispatch(notify(getErrorMsg(error), "error"));
        }
    };
};

export const editScout = (scoutID: string, scoutData: ScoutData): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setSubmitScoutsLoading());
            const updatedScout = await scoutService.updateScout(
                scoutID,
                scoutData
            );
            dispatch(updateScout({ data: scoutData, scout_id: scoutID }));
            dispatch(notify("Scout has been updated!", "success"));
        } catch (error: any) {
            dispatch(setSubmitScoutsError(getErrorMsg(error)));
        }
    };
};

export const selectScoutState = (state: RootState) => state.scout;

export const selectScoutByID = (state: RootState, scoutID: string) => {
    return state.scout.allScouts.find((s) => s.id === scoutID);
};

export default scoutSlice.reducer;

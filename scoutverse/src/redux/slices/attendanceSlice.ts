import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AttendancePayload, ScoutPayload, AttendanceData } from "../types";
import { AppThunk } from "../store";
import attendanceService from "../../services/attendance";
import { getErrorMsg } from "../../utils/helperFuncs";

interface initialAttendanceState {
    currentAttendanceID: string | null;
    currentScoutID: string | null;
    currentDate: string | null;
    attendanceScoutList: AttendancePayload[]; // List of scout IDs for a specific date
    attendanceDateList: string[]; // List of dates from a specific scout
    allAttendance: AttendancePayload[]; // All attendance records
    isLoading: boolean;
    fetchError: string | null;
    submitError: string | null;
}

const initialState: initialAttendanceState = {
    currentAttendanceID: null,
    currentScoutID: null,
    currentDate: null,
    attendanceScoutList: [],
    attendanceDateList: [],
    allAttendance: [],
    isLoading: false,
    fetchError: null,
    submitError: null,
};

const attendanceSlice = createSlice({
    name: "attendance",
    initialState,
    reducers: {
        setAttendanceScoutList: (
            state,
            action: PayloadAction<AttendancePayload[]>
        ) => {
            state.attendanceScoutList = action.payload;
            state.fetchError = null;
        },
        setCurrentDate: (state, action: PayloadAction<string>) => {
            state.currentDate = action.payload;
            state.fetchError = null;
        },
        setCurrentAttendanceID: (state, action: PayloadAction<string>) => {
            state.currentAttendanceID = action.payload;
            state.fetchError = null;
        },
        setCurrentScoutID: (state, action: PayloadAction<string>) => {
            state.currentScoutID = action.payload;
            state.fetchError = null;
        },
        setAttendanceDateList: (state, action: PayloadAction<string[]>) => {
            state.attendanceDateList = action.payload;
            state.fetchError = null;
        },
        addAttendanceRecord: (
            state,
            action: PayloadAction<AttendancePayload>
        ) => {
            state.allAttendance.push(action.payload);
            state.submitError = null;
            state.isLoading = false;
            if (
                state.currentScoutID &&
                state.currentScoutID === action.payload.scout_id
            ) {
                state.attendanceDateList.push(action.payload.present_date);
            }
        },
        updateAttendanceRecord: (
            state,
            action: PayloadAction<{ data: AttendanceData; id: string }>
        ) => {
            state.allAttendance = state.allAttendance.map((s) =>
                s.attendance_id === action.payload.id
                    ? { ...s, ...action.payload.data }
                    : s
            );
            state.isLoading = false;
            state.submitError = null;
        },
        deleteAttendanceRecord: (state, action: PayloadAction<string>) => {
            state.allAttendance = state.allAttendance.filter(
                (s) => s.attendance_id !== action.payload
            );
            state.submitError = null;
        },
        setFetchAttendanceError: (state, action: PayloadAction<string>) => {
            state.fetchError = action.payload;
        },
        setSubmitAttendanceError: (state, action: PayloadAction<string>) => {
            state.submitError = action.payload;
        },
        setAttendanceLoading: (state) => {
            state.isLoading = true;
        },
    },
});

export const {
    setAttendanceLoading,
    setSubmitAttendanceError,
    setFetchAttendanceError,
    deleteAttendanceRecord,
    updateAttendanceRecord,
    addAttendanceRecord,
    setAttendanceDateList,
    setAttendanceScoutList,
    setCurrentAttendanceID,
    setCurrentScoutID,
    setCurrentDate,
} = attendanceSlice.actions;

export const fetchScoutAttendance = (scoutID: string): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAttendanceLoading());
            const dateList = await attendanceService.getScoutAttendance(
                scoutID
            );
            dispatch(setAttendanceScoutList(dateList));
        } catch (error: any) {
            dispatch(setFetchAttendanceError(getErrorMsg(error)));
        }
    };
};

export const fetchDateAttendance = (date: string): AppThunk => {
    return async (dispatch) => {
        try {
        } catch (error) {}
    };
};

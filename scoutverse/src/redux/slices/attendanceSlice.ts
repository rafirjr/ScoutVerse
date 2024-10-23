import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AttendancePayload, ScoutPayload, AttendanceData } from "../types";
import { AppThunk, RootState } from "../store";
import attendanceService from "../../services/attendance";
import { getErrorMsg } from "../../utils/helperFuncs";
import { notify } from "./notificationSlice";

interface initialAttendanceState {
    currentAttendanceID: string | null;
    currentScoutID: string | null;
    currentDate: string | null;
    attendanceScoutList: string[]; // List of scout IDs for a specific date
    attendanceDateList: AttendancePayload[]; // List of dates from a specific scout
    allAttendance: AttendancePayload[]; // All attendance records from specific date
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
        setCurrentDateAttendanceRecords: (
            state,
            action: PayloadAction<AttendancePayload[]>
        ) => {
            state.allAttendance = action.payload;
            state.fetchError = null;
        },
        setAttendanceScoutList: (state, action: PayloadAction<string[]>) => {
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
        setAttendanceDateList: (
            state,
            action: PayloadAction<AttendancePayload[]>
        ) => {
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
                state.attendanceDateList.push(action.payload);
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
    setCurrentDateAttendanceRecords,
} = attendanceSlice.actions;

// Fetches specific attendance record
export const fetchAttendanceRecord = (
    scoutID: string,
    date: string
): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAttendanceLoading());
            dispatch(setCurrentScoutID(scoutID));
            const attendanceList = await attendanceService.getScoutAttendance(
                scoutID
            );
            const attendanceRecord = attendanceList.find(
                (record: AttendancePayload) => record.present_date === date
            );
            dispatch(setCurrentDateAttendanceRecords(attendanceRecord));
        } catch (error: any) {
            dispatch(setFetchAttendanceError(getErrorMsg(error)));
            dispatch(
                notify("Failed to fetch specific attendance record.", "error")
            );
        }
    };
};

// Fetches all dates from a specific scout
export const fetchScoutAttendance = (scoutID: string): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAttendanceLoading());
            dispatch(setCurrentScoutID(scoutID));
            const dateList = await attendanceService.getScoutAttendance(
                scoutID
            );
            console.log(dateList);
            dispatch(setAttendanceDateList(dateList));
        } catch (error: any) {
            dispatch(setFetchAttendanceError(getErrorMsg(error)));
            dispatch(
                notify(
                    "Failed to fetch all dates of attendance from scout",
                    "error"
                )
            );
        }
    };
};

export const fetchDateAttendance = (date: string): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAttendanceLoading());
            dispatch(setCurrentDate(date));
            const attendanceList = await attendanceService.getDateAttendance(
                date
            );
            dispatch(setCurrentDateAttendanceRecords(attendanceList));
            const listIDs: string[] = attendanceList.map(
                (attendance: AttendancePayload) => attendance.scout_id
            );
            dispatch(setAttendanceScoutList(listIDs));
        } catch (error: any) {
            dispatch(setFetchAttendanceError(getErrorMsg(error)));
            dispatch(
                notify(
                    `Failed to fetch all attendance records from ${date}`,
                    "error"
                )
            );
        }
    };
};

export const logAttend = (scoutID: string, data: AttendanceData): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAttendanceLoading());
            const newLog = await attendanceService.logAttendance(scoutID, data);
            dispatch(
                notify("Successfully added new attendance record", "success")
            );
            dispatch(addAttendanceRecord(newLog));
        } catch (error: any) {
            dispatch(setSubmitAttendanceError(getErrorMsg(error)));
            dispatch(notify("Failed to add new attendance record", "error"));
        }
    };
};

export const setCurrAttendanceID = (attendanceID: string): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setCurrentAttendanceID(attendanceID));
        } catch (error) {
            dispatch(notify("Failed to set current attendance ID.", "error"));
        }
    };
};

export const updateAttend = (
    scoutID: string,
    attendanceID: string,
    data: AttendanceData
): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAttendanceLoading());
            const updatedLog = await attendanceService.updateAttendance(
                scoutID,
                attendanceID,
                data
            );
            dispatch(updateAttendanceRecord(updatedLog));
            dispatch(
                notify("Successfully updated attendance record", "success")
            );
        } catch (error: any) {
            dispatch(setSubmitAttendanceError(getErrorMsg(error)));
            dispatch(notify("Failed to update attendance record", "error"));
        }
    };
};

export const deleteAttend = (
    scoutID: string,
    attendanceID: string
): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAttendanceLoading());
            const deletedLog = await attendanceService.deleteAttendance(
                scoutID,
                attendanceID
            );
            dispatch(deleteAttendanceRecord(attendanceID));
            dispatch(
                notify("Successfully deleted attendance record", "success")
            );
        } catch (error: any) {
            dispatch(setSubmitAttendanceError(getErrorMsg(error)));
            dispatch(notify("Failed to delete attendance record", "error"));
        }
    };
};

export const selectAttendanceState = (state: RootState) => state.attendance;

export default attendanceSlice.reducer;

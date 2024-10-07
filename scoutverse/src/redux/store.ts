import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import notificationReducer from "./slices/notificationSlice";
import scoutReducer from "./slices/scoutSlice";
import attendanceReducer from "./slices/attendanceSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const reducer = combineReducers({
    auth: authReducer,
    notification: notificationReducer,
    scout: scoutReducer,
    attendance: attendanceReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
});

// export const store = configureStore({
//     reducer: {
//         auth: authReducer,
//         notification: notificationReducer
//     },
// });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

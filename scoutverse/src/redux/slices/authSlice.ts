import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CredentialsPayload, UserState, LoginPayload } from "../types";
import { AppThunk, RootState } from "../store";
import authService from "../../services/auth";
import storage from "../../utils/localStorage";
import { notify } from "./notificationSlice";
import { getErrorMsg } from "../../utils/helperFuncs";
import { fetchAllScouts } from "./scoutSlice";

interface InitialAuthState {
    user: UserState | null;
    loading: boolean;
    error: string | null;
}

const initialState: InitialAuthState = {
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        removeUser: (state) => {
            state.user = null;
        },
        setAuthLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setAuthError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearAuthError: (state) => {
            state.error = null;
        },
    },
});

export const {
    setUser,
    removeUser,
    setAuthLoading,
    setAuthError,
    clearAuthError,
} = authSlice.actions;

export const login = (credentials: LoginPayload): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAuthLoading());
            const userData = await authService.login(credentials);
            dispatch(setUser(userData));

            storage.saveUser(userData);
            authService.setToken(userData.token);

            dispatch(fetchAllScouts());

            dispatch(notify(`Welcome back, ${userData.username}!`, "success"));
        } catch (error: any) {
            dispatch(setAuthError(getErrorMsg(error)));
        }
    };
};

export const signup = (credentials: CredentialsPayload): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAuthLoading());
            const userData = await authService.signup(credentials);
            dispatch(setUser(userData));

            storage.saveUser(userData);
            authService.setToken(userData.token);

            dispatch(
                notify(
                    `Hi, ${userData.username}! Welcome to ScoutVerse`,
                    "success"
                )
            );
        } catch (error: any) {
            dispatch(setAuthError(getErrorMsg(error)));
        }
    };
};

export const logout = (): AppThunk => {
    return async (dispatch) => {
        dispatch(removeUser());
        storage.removeUser();
        dispatch(notify(`Logged out!`, "success"));
    };
};

export const autoLogin = (): AppThunk => {
    return (dispatch) => {
        const loggedUser = storage.loadUser();
        if (loggedUser) {
            dispatch(setUser(loggedUser));
            authService.setToken(loggedUser.token);
        }
    };
};

export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;

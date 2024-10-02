import "./App.css";
import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import Dashboard from "./pages/Dashboard";
import SignUpPage from "./pages/SignUpPage";
import Home from "./pages/Home";
import AddScoutPage from "./pages/AddScoutPage";
import { useSelector } from "react-redux";
import { logout, selectAuthState } from "./redux/slices/authSlice";
import storage from "./utils/localStorage";
import { useAppDispatch } from "./redux/hooks";
import MogliPage from "./pages/MogliPage";
import EditScoutPage from "./pages/EditScoutPage";
import KyligPage from "./pages/KyligPage";
import ArdzvigPage from "./pages/ArdzvigPage";
import AriPage from "./pages/AriPage";
import ArenoushPage from "./pages/ArenoushPage";
import YeretsPage from "./pages/YeretsPage";
import BarmanouhiPage from "./pages/BarmanouhiPage";
import PendingScoutsPage from "./pages/PendingScoutsPage";
import AttendancePage from "./pages/AttendancePage";

function App() {
    window.addEventListener("phx:page-loading-stop", (event) => {
        window.document.dispatchEvent(
            new Event("DOMContentLoaded", {
                bubbles: true,
                cancelable: true,
            })
        );
    });

    const dispatch = useAppDispatch();

    // LOGS OUT USER ON REFRESH
    // useEffect(() => {
    //     storage.removeUser();
    //     dispatch(logout());
    // }, [dispatch]);

    const { user } = useSelector(selectAuthState);
    const isLoggedIn = storage.loadUser() || user;

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/signin"
                    element={
                        !isLoggedIn ? (
                            <SignInPage />
                        ) : (
                            <Navigate to="/dashboard" />
                        )
                    }
                />
                <Route
                    path="/signup"
                    element={
                        !isLoggedIn ? (
                            <SignUpPage />
                        ) : (
                            <Navigate to="/dashboard" />
                        )
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        isLoggedIn ? <Dashboard /> : <Navigate to="/signin" />
                    }
                />
                <Route
                    path="/addscout"
                    element={
                        isLoggedIn ? (
                            <AddScoutPage />
                        ) : (
                            <Navigate to="/signin" />
                        )
                    }
                />
                <Route
                    path="/mogli"
                    element={
                        isLoggedIn ? <MogliPage /> : <Navigate to="/signin" />
                    }
                />
                <Route
                    path="/kylig"
                    element={
                        isLoggedIn ? <KyligPage /> : <Navigate to="/signin" />
                    }
                />
                <Route
                    path="/ardzvig"
                    element={
                        isLoggedIn ? <ArdzvigPage /> : <Navigate to="/signin" />
                    }
                />
                <Route
                    path="/ari"
                    element={
                        isLoggedIn ? <AriPage /> : <Navigate to="/signin" />
                    }
                />
                <Route
                    path="/arenoush"
                    element={
                        isLoggedIn ? (
                            <ArenoushPage />
                        ) : (
                            <Navigate to="/signin" />
                        )
                    }
                />
                <Route
                    path="/yerets"
                    element={
                        isLoggedIn ? <YeretsPage /> : <Navigate to="/signin" />
                    }
                />
                <Route
                    path="/barmanouhi"
                    element={
                        isLoggedIn ? (
                            <BarmanouhiPage />
                        ) : (
                            <Navigate to="/signin" />
                        )
                    }
                />
                <Route
                    path="/editscout"
                    element={
                        isLoggedIn ? (
                            <EditScoutPage />
                        ) : (
                            <Navigate to="/signin" />
                        )
                    }
                />
                <Route
                    path="/pendingScouts"
                    element={
                        isLoggedIn ? (
                            <PendingScoutsPage />
                        ) : (
                            <Navigate to="/signin" />
                        )
                    }
                />
                <Route
                    path="/attendance"
                    element={
                        isLoggedIn ? (
                            <AttendancePage />
                        ) : (
                            <Navigate to="/signin" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;

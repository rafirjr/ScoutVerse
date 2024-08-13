import React from "react";
import logo from "../assets/homenetmen-scouts-logo-01-1.png";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleLogInClick = () => {
        navigate("/signin");
    };

    const handleSignUpClick = () => {
        navigate("/signup");
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="container mx-auto h-10"></div>
            <div className="container mx-auto h-10"></div>
            <div className="container mx-auto">
                <div className="flex-row bg-white rounded-xl mx-auto shadow-lg overflow-hidden w-1/2">
                    <div className="w-full pb-0 flex items-center justify-center p-8 bg-no-repeat bg-cover bg-center bg-slate-500">
                        {/* <h1 className="text-white text-3xl mb-3">HOMENETMEN</h1> */}
                        <img src={logo} alt="" className="w-3/4" />
                    </div>
                    <div className="flex flex-column w-full p-6 bg-no-repeat bg-cover bg-center bg-slate-500">
                        <div className="w-full flex flex-column items-center justify-center p-8">
                            <button
                                onClick={handleLogInClick}
                                type="button"
                                className="text-lg font-medium py-4 px-8 rounded-lg border border-transparent bg-slate-400 text-white hover:bg-blue-500 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="w-full flex flex-column items-center justify-center p-8">
                            <button
                                onClick={handleSignUpClick}
                                type="button"
                                className="text-lg font-medium py-4 px-8 rounded-lg border border-transparent bg-slate-400 text-white hover:bg-blue-500 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto h-10"></div>
            <div className="container mx-auto h-10"></div>
            <div className="container mx-auto h-10"></div>
        </div>
    );
};

export default Home;

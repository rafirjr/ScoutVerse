import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/homenetmen-scouts-logo-01-1.png";
import vahan from "../assets/Hmemlogo2019.png"
import SignIn from "../components/signin";

const Home: React.FC = () => {
    

    return (
        <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="container mx-auto h-10"></div>
            <div className="container mx-auto h-10"></div>
            <div className="container mx-auto h-10"></div>
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-no-repeat bg-cover bg-center bg-slate-500">
                        {/* <h1 className="text-white text-3xl mb-3">HOMENETMEN</h1> */}
                        <img src={logo} alt="" />
                        <div>
                            <h1 className="text-white text-2xl py-3">
                                Homenetmen CV Shant Scouts
                            </h1>
                            <p className="text-white">
                                Everything scouts, all in one place.
                            </p>
                            <a
                                href="https://cvshant.com/"
                                className="text-gray-100 font-semibold"
                            >
                                Learn more
                            </a>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center bg-slate-500">
                        <div>
                            <SignIn />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

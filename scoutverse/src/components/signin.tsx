// src/components/SignIn.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { login, selectAuthState } from "../redux/slices/authSlice";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../redux/hooks";

/**
 * SignIn component handles the sign in of the user. The email and password the user inputs is saved into "email" and "password"
 * setUserCookie() is the method that gives the user access to the web app based on their login user name
 * When the sign in button is pressed, signIn() is called from aws-auth which verifies the user email and password and if it is correct
 * the user gets a cookie and is sent to the HomePage using useNavigate from react-router-dom
 */

interface InputValues {
    username: string;
    password: string;
}

const validationSchema = yup.object({
    username: yup.string().required("Required"),
    password: yup.string().required("Required"),
});

const SignIn: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useSelector(selectAuthState);
    const [showPass, setShowPass] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
    });

    const navigate = useNavigate();

    const handleLogin = ({ username, password }: InputValues) => {
        dispatch(login({ username, password }));
        navigate("/dashboard");
    };

    return (
        <div className="flex items-center justify-center rounded-xl mr-0 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 justify-center">
                <form
                    className="mt-8 space-y-6"
                    onSubmit={handleSubmit(handleLogin)}
                >
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                                {...register("username")}
                            />
                            {errors.username && (
                                <p style={{ color: "red" }}>
                                    {errors.username.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <div className="flex relative items-center justify-between">
                                <div className=" w-full">
                                    <input
                                        id="password"
                                        type={showPass ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                        {...register("password")}
                                    />
                                </div>
                                <div className="absolute align-right right-2 z-10">
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(!showPass)}
                                        className="items-center pl-2 pr-0"
                                    >
                                        <i className="fa-solid fa-eye"></i>
                                    </button>
                                </div>
                            </div>

                            {errors.password && (
                                <p style={{ color: "red" }}>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={loading}
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                <div className="text-center">
                    <button
                        type="button"
                        onClick={() => navigate("/signup")}
                        className="mt-4 text-indigo-600 hover:text-indigo-900"
                    >
                        Don't have an account? Sign Up
                    </button>
                </div>
            </div>
            {/* <div className=" pb-24 ">Hello</div> */}
        </div>
    );
};

export default SignIn;

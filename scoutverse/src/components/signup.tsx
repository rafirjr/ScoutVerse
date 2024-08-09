// src/components/SignIn.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import vahan from "../assets/Hmemlogo2019.png";
import axios from "axios";
import backendUrl from "../backendUrl";
import { useAppDispatch } from "../redux/hooks";
import { useSelector } from "react-redux";
import { selectAuthState, setAuthError, signup } from "../redux/slices/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

/**
 * SignIn component handles the sign in of the user. The email and password the user inputs is saved into "email" and "password"
 * setUserCookie() is the method that gives the user access to the web app based on their login user name
 * When the sign in button is pressed, signIn() is called from aws-auth which verifies the user email and password and if it is correct
 * the user gets a cookie and is sent to the HomePage using useNavigate from react-router-dom
 */

interface InputValues {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    confirmPassword: string;
}

const validationSchema = yup.object({
  username: yup.string().required('Required').max(20, 'Must be at most 20 characters').min(3, 'Must be at least 3 characters')..matches(
    /^[a-zA-Z0-9-_]*$/,
    'Only alphanum, dash & underscore characters are allowed'
  ),
  password: yup.string().required('Required').min(6, 'Must be at least 6 characters'),
  confirmPassword: yup.string().required('Required').min(6, 'Must be at least 6 characters')
})

const SignUp: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useSelector(selectAuthState);
    const [showPass, setShowPass] = useState<boolean>(false);
    const [showConfPass, setShowConfPass] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
    });

    const handleSignUp = ({
      firstname, lastname, username, password, confirmPassword
    } : InputValues) => {
      if(password !== confirmPassword) {
        return dispatch(setAuthError('Both passwords need to match.'));
      }
      dispatch(signup({ username, password }))
    }


    return (
        <div className="flex items-center justify-center rounded-xl bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* <div className="flex justify-center items-center ">
            <img src={vahan} alt="" className="w-20 h-17"/>
        </div> */}
                <form
                    className="mt-8 space-y-6"
                    onSubmit={handleSubmit(handleSignUp)}
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
                            <input
                                id="password"
                                type={showPass ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                {...register("password")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: 0,
                                    margin: 0,
                                }}
                            >
                                {showPass ? "Hide" : "Show"}
                            </button>
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
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                <div>
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="mt-4 text-indigo-600 hover:text-indigo-900"
                    >
                        Already have an account? Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;

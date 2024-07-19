// src/components/SignIn.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import vahan from "../assets/Hmemlogo2019.png"
import axios from "axios";
import backendUrl from "../backendUrl";

/**
 * SignIn component handles the sign in of the user. The email and password the user inputs is saved into "email" and "password"
 * setUserCookie() is the method that gives the user access to the web app based on their login user name
 * When the sign in button is pressed, signIn() is called from aws-auth which verifies the user email and password and if it is correct
 * the user gets a cookie and is sent to the HomePage using useNavigate from react-router-dom
 */

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

//   const setUserCookie = () => {
//     const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
//     document.cookie = `email=${encodeURIComponent(email)}; expires=${expires}; path=/;`;
//   };
    async function handleSignIn(e: React.FormEvent) {
        e.preventDefault();

        try {
            const response = await axios.post(backendUrl + "/login", {
                email,
                password
            });

            const data = response.data;

            if(response.status === 200) {
                localStorage.setItem('token', data.token);
                navigate('/dashboard')
            }
            else {
                console.error(data.message)
            }
            
        } catch (error) {
            console.error(error)
        }

    }

//   async function handleSignIn() {
//     try {
//       const { isSignedIn, nextStep } = await signIn({ username: email, password: password });
//       setUserCookie();
//       navigate('/home')
//     } catch (error) {
//       console.log('error signing in', error);
//     }
//   }

  return (
    <div className="flex items-center justify-center rounded-xl bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* <div className="flex justify-center items-center ">
            <img src={vahan} alt="" className="w-20 h-17"/>
        </div> */}
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">   
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={handleSignIn}
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
            onClick={() => navigate('/signup')}
            className="mt-4 text-indigo-600 hover:text-indigo-900"
          >
            Don't have an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
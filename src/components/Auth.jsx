import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/index.jsx';
import toast, { Toaster } from 'react-hot-toast';
import bgimage from '../assets/bgimage1.jpeg';

const Auth = () => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrorMessage(''); // Clear error message on input change
  };

  const sendRequest = async () => {
    const apiUrl = `https://blogbackend-62t9.onrender.com/api/user/${isSignup ? 'signup' : 'login'}`;
    try {
      const res = await axios.post(apiUrl, {
        email: inputs.email,
        password: inputs.password,
        ...(isSignup && { name: inputs.name })
      });
      const data = res.data;
      return data;
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          setErrorMessage('Incorrect email or password.');
        } else if (status === 404) {
          setErrorMessage('User not found.');
        } else {
          setErrorMessage('Failed to connect to the server.');
        }
      } else {
        console.error('Failed to connect to the server.', error.message);
        setErrorMessage('Failed to connect to the server.');
      }
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any existing error message
    setLoading(true); // Start loading
    const result = await sendRequest();
    setLoading(false); // Stop loading

    if (result) {
      localStorage.setItem('isLoggedIn', 'true'); // Save login state to localStorage
      localStorage.setItem('userId', result.user._id); // Save userId to localStorage
      dispatch(authActions.login());
      toast.success('Login successful.');
    } else {
      console.log('Login failed.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center mt-7">
      <img
        src={bgimage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-white opacity-10 "></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl p-4">
        {/* Caption Section */}
        <div className="w-full md:w-1/2 text-white p-8 ">
          <h1 className="text-4xl font-bold mb-4  text-black">Welcome to PostFix App</h1>
          <div className='animate-pulse h-1 w-32 bg-green-900'></div>
          <p className="text-lg text-black font-semibold">
          Sign in to create and customize blogs with ease. Edit, delete, and explore diverse content. Connect with writers on POSTFIX and start sharing your stories today.          </p>
        </div>
        {/* Form Section */}
        <div className="hover:bg-gray-50 p-8 rounded-lg shadow-2xl  w-full max-w-md md:w-1/2 transition duration 2s ">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            {isSignup ? 'Sign Up' : 'Login'}
          </h2>
          {errorMessage && (
            <div className="text-red-500 text-center mb-4">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignup && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  value={inputs.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700 "
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                value={inputs.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                value={inputs.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-md shadow-md hover:bg-orange-600 transition duration-300 flex justify-center items-center"
              disabled={loading} // Disable the button when loading
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                isSignup ? 'Sign Up' : 'Login'
              )}
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            {isSignup ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignup(false)}
                  className="text-orange-500 hover:underline"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => setIsSignup(true)}
                  className="text-orange-500 hover:underline"
                >
                  Sign Up
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

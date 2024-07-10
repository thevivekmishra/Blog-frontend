import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/index.jsx';
import BodyImage from './BodyImage'; // Import the BodyImage component
import toast, { Toaster } from 'react-hot-toast';

const Auth = () => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrorMessage(''); // Clear error message on input change
  };

  const sendRequest = async () => {
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/user/${isSignup ? 'signup' : 'login'}`;
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
    const result = await sendRequest();
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-3">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
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
                className="block text-sm font-medium text-gray-700"
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
              className="block text-sm font-medium text-gray-700"
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
              className="block text-sm font-medium text-gray-700"
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
            className="w-full bg-orange-500 text-white py-3 rounded-md shadow-md hover:bg-orange-600 transition duration-300"
          >
            {isSignup ? 'Sign Up' : 'Login'}
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
      <BodyImage />
    </div>
  );
};

export default Auth;

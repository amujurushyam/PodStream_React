import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ErrorPage from './ErrorPage';
const Signup = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const [Values, setValues] = useState({
        username: "",
        email: "",
        password: ""
    });

    const change = (e) => {
        const { name, value } = e.target;
        setValues({
            ...Values,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:1000/api/v1/sign-up", Values)
            navigate("/login");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <>{isLoggedIn ? <ErrorPage /> : <div className='h-screen bg-green-100 flex justify-center items-center'>
            <ToastContainer position='top-center' draggable />
            <div className='w-4/6 md:w-3/6 lg:w-2/6 flex flex-col items-center justify-center'>
                <Link to='/' className='text-2xl font-bold'>PODSTREAM</Link>

                <div className='mt-6 w-full'>
                    {/* Username */}
                    <div className='w-full flex flex-col'>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            className='mt-2 px-2 py-2 rounded outline-none border border-black'
                            required
                            placeholder='Username'
                            value={Values.username}
                            onChange={change}
                        />
                    </div>

                    {/* Email */}
                    <div className='w-full flex flex-col mt-2'>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className='mt-2 px-2 py-2 rounded outline-none border border-black'
                            required
                            placeholder='Email'
                            value={Values.email}
                            onChange={change}
                        />
                    </div>

                    {/* Password */}
                    <div className='w-full flex flex-col mt-2'>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className='mt-2 px-2 py-2 rounded outline-none border border-black'
                            required
                            placeholder='Password'
                            value={Values.password}
                            onChange={change}
                        />
                    </div>

                    {/* Signup Button */}
                    <div className='w-full flex flex-col mt-4'>
                        <button
                            className='bg-green-900 font-semibold text-xl text-white rounded py-2'
                            onClick={handleSubmit}
                        >
                            Signup
                        </button>
                    </div>

                    {/* Login Redirect */}
                    <div className='w-full flex flex-col mt-4'>
                        <p className='text-center'>
                            Already have an account?{" "}
                            <Link to="/login" className='font-semibold hover:text-blue-600'>
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>} </>

    );
};

export default Signup;

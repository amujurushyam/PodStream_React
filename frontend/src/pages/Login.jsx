import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [Values, setValues] = useState({
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
            const res = await axios.post("http://localhost:1000/api/v1/sign-in", Values, {
                withCredentials: true,
            })
            navigate("/profile");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    return (
        <div className='h-screen bg-green-100 flex justify-center items-center'>
            <ToastContainer position='top-center' draggable />
            <div className='w-4/6 md:w-3/6 lg:w-2/6 flex flex-col items-center justify-center'>
                <Link to='/' className='text-2xl font-bold'>PODSTREAM
                </Link>
                <div className='mt-6 w-full'>


                    <div className='w-full flex flex-col mt-2'>
                        <label htmlFor="">Email</label>
                        <input type="email" className='mt-2 px-2 py-2 rounded outline-none border border-black'
                            required
                            placeholder='Email'
                            name='email'
                            value={Values.email}
                            onChange={change} />
                    </div>
                    <div className='w-full flex flex-col mt-2'>
                        <label htmlFor="">Password</label>
                        <input type="password" className='mt-2 px-2 py-2 rounded outline-none border border-black'
                            required
                            placeholder='Password'
                            name='password'
                            value={Values.password}
                            onChange={change} />
                    </div>
                    <div className='w-full flex flex-col mt-4'>
                        <button className='bg-green-900 font-semibold text-xl text-white rounded py-2' onClick={handleSubmit}>Login</button>
                    </div>
                    <div className='w-full flex flex-col mt-4'>
                        <p className='text-center'>
                            Don't Have An Account ? <Link to="/signup" className='font-semibold hover:text-blue-600'>Signup</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <div className='h-screen bg-green-100 flex justify-center items-center'>
            <div className='w-4/6 md:w-3/6 lg:w-2/6 flex flex-col items-center justify-center'>
                <Link to='/' className='text-2xl font-bold'>PODSTREAM
                </Link>
                <div className='mt-6 w-full'>
                    <div className='w-full flex flex-col'>
                        <label htmlFor="">Username</label>
                        <input type="text" className='mt-2 px-2 py-2 rounded outline-none border border-black'
                            required
                            placeholder='Username'
                            name='username' />
                    </div>

                    <div className='w-full flex flex-col mt-2'>
                        <label htmlFor="">Email</label>
                        <input type="email" className='mt-2 px-2 py-2 rounded outline-none border border-black'
                            required
                            placeholder='Email'
                            name='email' />
                    </div>
                    <div className='w-full flex flex-col mt-2'>
                        <label htmlFor="">Password</label>
                        <input type="password" className='mt-2 px-2 py-2 rounded outline-none border border-black'
                            required
                            placeholder='Password'
                            name='password' />
                    </div>
                    <div className='w-full flex flex-col mt-4'>
                        <button className='bg-green-900 font-semibold text-xl text-white rounded py-2'>Signup</button>
                    </div>
                    <div className='w-full flex flex-col mt-4'>
                        <p className='text-center'>
                            Already Having An Account ? <Link to="/login" className='font-semibold hover:text-blue-600'>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup

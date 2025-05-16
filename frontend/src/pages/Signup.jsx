import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <div className='h-screen bg-green-100 flex justify-center items-center'>
            <div className='w-4/6'>
                <Link to='/' className='text-2xl font-semibold'>PODSTREAM</Link>
            </div>
        </div>
    )
}

export default Signup

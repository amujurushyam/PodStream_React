import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.png'
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
    const [MobileNav, setMobileNav] = useState(false);
    const navLinks = [
        {
            name: 'Home',
            path: '/',
        },
        {
            name: 'Categories',
            path: '/categories',
        },
        {
            name: 'All Podcasts',
            path: '/all-podcasts',
        },
        {
            name: 'Profile',
            path: '/profile',
        }
    ];
    return (
        <nav className="px-4 md:px-8 lg:px-12 py-2 relative">
            <div className='flex items-center justify-between'>
                <div className='logo brand-name w-2/6 flex items-center gap-4'>
                    <img src={logo} alt="podstream" className='h-12' />
                    <Link to='/' className='text-2xl font-bold>'>PodStream</Link>
                </div>
                <div className='hidden w-2/6 lg:flex items-center justify-center'>
                    {navLinks.map((items, i) => (
                        <Link key={i} to={items.path} className='ms-4 hover:font-semibold transition-all duration-300 ' > {items.name}</Link>
                    ))}</div>
                <div className='hidden w-2/6 lg:flex items-center justify-end'>
                    <Link className='px-6 py-3 border border-black rounded-full'>Login</Link>
                    <Link className='ms-4 px-6 py-3 bg-black text-white rounded-full'>SignUp</Link>
                </div>
                <div className='w-4/6 flex items-center justify-end lg:hidden'>
                    <button className='text-3xl text-black' onClick={() => setMobileNav(!MobileNav)}>
                        <IoReorderThreeOutline />
                    </button>
                </div>
            </div>
            <div className={`fixed top-0 left-0 w-full h-screen bg-blue-100 ${MobileNav ? "translate-y-[0%]":"translate-y-[100%]" } transition-all duration-500  `}>
                <div className='p-4 flex items-center justify-end text-3xl'>
                    <button  onClick={() => setMobileNav(!MobileNav)} className='bg-black text-white rounded-full p-2'><RxCross2 /></button>
                </div>
                <div className='h-full flex flex-col items-center justify-center'>
                    {navLinks.map((items, i) => (
                        <Link key={i} to={items.path} className='mb-6 text-2xl hover:font-semibold transition-all duration-300 ' > {items.name}</Link>
                    ))}
                        <Link  to="/login" className='mb-6 text-2xl hover:font-semibold transition-all duration-300 ' > Login</Link>
                        <Link  to="/signup" className='mb-6 text-2xl hover:font-semibold transition-all duration-300 ' > Signup</Link>
                </div>
            </div>

        </nav>
    )
}

export default Navbar

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.png';
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
    const [MobileNav, setMobileNav] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Categories', path: '/categories' },
        { name: 'All Podcasts', path: '/all-podcasts' },
        { name: 'Profile', path: '/profile' }
    ];

    // Disable scroll when menu is open
    useEffect(() => {
        if (MobileNav) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [MobileNav]);

    return (
        <nav className="px-4 md:px-8 lg:px-12 py-2 relative z-50">
            <div className='flex items-center justify-between'>
                <div className='logo brand-name w-2/6 flex items-center gap-4'>
                    <img src={logo} alt="podstream" className='h-12' />
                    <Link to='/' className='text-2xl font-bold'>PodStream</Link>
                </div>

                <div className='hidden w-2/6 lg:flex items-center justify-center'>
                    {navLinks.map((items, i) => (
                        <Link
                            key={i}
                            to={items.path}
                            className='ms-4 hover:font-semibold transition-all duration-300'
                        >
                            {items.name}
                        </Link>
                    ))}
                </div>

                <div className='hidden w-2/6 lg:flex items-center justify-end'>
                    <Link to="/login" className='px-6 py-3 border border-black rounded-full'>Login</Link>
                    <Link to="/signup" className='ms-4 px-6 py-3 bg-black text-white rounded-full'>SignUp</Link>
                </div>

                <div className='w-4/6 flex items-center justify-end lg:hidden z-50'>
                    <button
                        className={`text-3xl transition-all duration-300`}
                        onClick={() => setMobileNav(!MobileNav)}
                    >
                        {MobileNav ? <RxCross2 /> : <IoReorderThreeOutline />}
                    </button>
                </div>
            </div>

            {/* Mobile nav */}
            <div
                className={`
                    fixed top-0 left-0 w-full h-screen bg-blue-100 z-50 
                    transition-transform duration-500 ease-in-out
                    ${MobileNav ? "translate-y-0 pointer-events-auto" : "translate-y-full pointer-events-none"}
                `}
            >
                <div className='p-4 flex items-center justify-end text-3xl'>
                    <button onClick={() => setMobileNav(false)}><RxCross2 /></button>
                </div>
                <div className='h-full flex flex-col items-center justify-center'>
                    {navLinks.map((items, i) => (
                        <Link
                            key={i}
                            to={items.path}
                            className='mb-6 text-2xl hover:font-semibold transition-all duration-300'
                            onClick={() => setMobileNav(false)}
                        >
                            {items.name}
                        </Link>
                    ))}
                    <Link to="/login" className='mb-6 text-2xl hover:font-semibold transition-all duration-300' onClick={() => setMobileNav(false)}>Login</Link>
                    <Link to="/signup" className='mb-6 text-2xl hover:font-semibold transition-all duration-300' onClick={() => setMobileNav(false)}>Signup</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

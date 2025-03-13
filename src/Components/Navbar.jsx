import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [userName, setUserName] = useState(null); 
    const [showLoginMessage, setShowLoginMessage] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUserName(storedUser.username); 
        }
    }, []);

    const handleBookRideClick = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            setShowLoginMessage(true); 
        } else {
            
            navigate('/reservation'); 
        }
    };

    useEffect(() => {
        if (showLoginMessage) {
            setTimeout(() => {
                setShowLoginMessage(false); 
            }, 3000);
        }
    }, [showLoginMessage]);

    return (
        <div className='absolute top-0 left-0 w-full z-10'>
            <div className='container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-20 bg-transparent'>
                <img src={assets.logo} alt="Cab Service Logo" />
                <ul className='hidden md:flex gap-7 text-white'>
                    <a href="#Home" className='cursor-pointer hover:text-green-400'>Home</a>
                    <a href="#Services" className='cursor-pointer hover:text-green-400'>Our Services</a>
                    <a href="#Pricing" className='cursor-pointer hover:text-green-400'>Pricing</a>
                    <a href="#Testimonials" className='cursor-pointer hover:text-green-400'>Testimonials</a>
                    <a href="#Contact" className='cursor-pointer hover:text-green-400'>Contact Us</a>
                </ul>
                <div className='flex items-center gap-4'>
                    <button onClick={handleBookRideClick} className='hidden md:block bg-white px-8 py-2 rounded-full cursor-pointer'>
                        Book a Ride
                    </button>
                    <img onClick={() => setShowMobileMenu(true)} src={assets.menu_icon} alt="Menu Icon" className='md:hidden w-7 cursor-pointer' />
                    <a href="/profile" className='flex items-center gap-2'>
                        <img src={assets.user_1} alt="Profile Icon" className='w-8 h-8 rounded-full cursor-pointer' />
                        <span className='text-white font-medium'>{userName || "Sign in"}</span>
                    </a>
                </div>
            </div>

            {/* Show Login Message */}
            {showLoginMessage && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-red-500 text-white text-center">
                    You need to log in first!
                </div>
            )}

            {/* ---------------Mobile Menu------------- */}
            <div className={`md:hidden ${showMobileMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 overflow-hidden bg-white transition-all`}>
                <div className='flex justify-end p-6 cursor-pointer'>
                    <img onClick={() => setShowMobileMenu(false)} src={assets.cross_icon} alt="Close Icon" className='w-6 ' />
                </div>
                <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                    <a onClick={() => setShowMobileMenu(false)} href="#Home" className='px-4 py-2 rounded-full inline-block'>Home</a>
                    <a onClick={() => setShowMobileMenu(false)} href="#Services" className='px-4 py-2 rounded-full inline-block'>Our Services</a>
                    <a onClick={() => setShowMobileMenu(false)} href="#Pricing" className='px-4 py-2 rounded-full inline-block'>Pricing</a>
                    <a onClick={() => setShowMobileMenu(false)} href="#Testimonials" className='px-4 py-2 rounded-full inline-block'>Testimonials</a>
                    <a onClick={() => setShowMobileMenu(false)} href="#Contact" className='px-4 py-2 rounded-full inline-block'>Contact Us</a>
                    <a onClick={() => setShowMobileMenu(false)} href="#profile" className='px-4 py-2 rounded-full inline-block  items-center gap-2'>
                        <img src={assets.user_1} alt="Profile Icon" className='w-6 h-6 rounded-full' />
                        <span>{userName || "Sign in"}</span>
                    </a>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;

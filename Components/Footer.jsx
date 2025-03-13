import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="pt-10 px-4 md:px-20 lg:px-32 bg-gray-900 w-full overflow-hidden" id="Footer">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
        
        {/* Logo & Description */}
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <img src={assets.logo_dark} alt="Car Rental Logo" />
          <p className="text-gray-400 mt-4">
            Drive the car of your dreams with ease! We offer a seamless car reservation experience, providing top-quality vehicles for every occasion.
          </p>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-1/5 mb-8 md:mb-0">
          <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-gray-400">
            <a href="#Home" className="hover:text-white">Home</a>
            <a href="#Cars" className="hover:text-white">Available Cars</a>
            <a href="#HowItWorks" className="hover:text-white">How It Works</a>
            <a href="#Testimonials" className="hover:text-white">Testimonials</a>
            <a href="#Contact" className="hover:text-white">Contact Us</a>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="w-full md:w-1/3">
          <h3 className="text-white text-lg font-bold mb-4">Stay Updated</h3>
          <p className="text-gray-400 mb-4 max-w-80">
            Subscribe to get the latest updates on exclusive car deals and offers.
          </p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="p-2 rounded bg-gray-800 text-gray-400 border border-gray-700 focus:outline-none w-full md:w-auto" 
            />
            <button className="py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600 transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 py-4 mt-10 text-center text-gray-500">
        © 2024 AutoReserve. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;

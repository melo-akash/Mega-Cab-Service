import React from 'react';
import { assets } from '../assets/assets';
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center container mx-auto
      p-14 md:px-20 lg:px-32 w-full overflow-hidden' id='About'>
      <h1 className='text-2xl sm:text-4xl font-bold mb-2'>About <span className='underline underline-offset-4 decoration-1 under 
      font-light'>Our Service</span></h1>
      <p className='text-gray-500 max-w-80 text-center mb-8'>Providing reliable and efficient transportation for all your travel needs</p>
      <div className='flex flex-col md:flex-row items-center md:items-start md:gap-20'>
        <img src={assets.car_2} alt="Cab Service" className='w-full sm:w-1/2 max-w-lg' />
        <div className='flex flex-col items-center md:items-start mt-10 text-gray-600'>
          <div className='grid grid-cols-2 gap-6 md:gap-10 w-full 2xl:pr-28'>
            <div>
              <p className='text-4xl font-medium text-gray-800'>100+</p>
              <p>Vehicles in Fleet</p>
            </div>
            <div>
              <p className='text-4xl font-medium text-gray-800'>2000+</p>
              <p>Rides Completed</p>
            </div>
            <div>
              <p className='text-4xl font-medium text-gray-800'>24/7</p>
              <p>Available Anytime</p>
            </div>
            <div>
              <p className='text-4xl font-medium text-gray-800'>98%</p>
              <p>Customer Satisfaction</p>
            </div>
          </div>
          <p className='my-10 max-w-lg'>
            Our goal is to provide quick, safe, and convenient rides to all our customers. With a fleet of modern vehicles and experienced drivers, we are committed to ensuring your comfort and safety.
          </p>
          <button className='bg-blue-600 text-white px-8 py-2 rounded'>Book a Ride</button>
        </div>
      </div>
    </motion.div>
  );
};

export default About;

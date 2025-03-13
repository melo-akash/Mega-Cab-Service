import React from 'react';
import { assets, testimonialsData } from '../assets/assets';
import { motion } from "framer-motion";

const CarReservations = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className='container mx-auto py-10 lg:px-32 w-full overflow-hidden' id='CarReservations'>
      <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Car <span className='underline underline-offset-4 decoration-1 font-light'>Reservations</span></h1>
      <p className='text-gray-500 max-w-auto mb-8 text-center'>Book your car effortlessly with our reliable and convenient reservation system.</p>

      <div className='flex flex-wrap justify-center gap-8'>
        {testimonialsData.map((reservation, index) => (
          <div key={index} className='max-w-[340px] border shadow-lg rounded px-8 py-12 text-center'>
            <img className='w-20 h-20 rounded-full mx-auto mb-4' src={reservation.image} alt={reservation.alt} />
            <h2 className='text-xl text-gray-700 font-medium'>{reservation.name}</h2>
            <p className='text-gray-500 mb-4 text-sm'>{reservation.carModel}</p>
            <div className='flex justify-center gap-1 text-yellow-500 mb-4'>
              {Array.from({ length: reservation.rating }, (item, index) => (
                <img
                  key={index}
                  src={assets.star_icon} // Replace with your actual image source
                  alt={`Star ${index}`}
                />
              ))}
            </div>
            <p className='text-gray-600'>{reservation.text}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CarReservations;

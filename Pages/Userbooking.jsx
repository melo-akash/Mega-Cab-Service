import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Initial car categories
const categories = ["All", "Van", "Car", "Luxury"];

const Booking = () => {
  const [cars, setCars] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/cars");
        if (response.ok) {
          const data = await response.json();
          setCars(data);
        } else {
          setError("Failed to fetch cars");
        }
      } catch (error) {
        setError("An error occurred while fetching the cars");
      }
    };

    fetchCars();
  }, []);

  
  const filterCars =
    selectedCategory === "All"
      ? cars
      : cars.filter((car) => car.carType === selectedCategory);

  
  const handleBookNow = (car) => {
    navigate(
      `/reservation?carType=${car.carType}&carModel=${car.model}&carImage=${car.imageUrl}`
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="container mx-auto py-10 px-6 md:px-20 lg:px-32"
    >
      
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-center">
         Book Your <span className="underline underline-offset-4 decoration-1 font-light">Car</span>
      </h1>
      <p className="text-gray-500 max-w-2xl mx-auto text-center mb-8">
        Choose from our range of well-maintained vehicles to suit your travel needs.
      </p>

      
      <div className="flex justify-center space-x-4 mb-8">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.05 }}
            className={`px-6 py-3 rounded-full shadow-md transition-all duration-200 ${
              selectedCategory === category ? "bg-black text-white" : "bg-white text-gray-900 hover:bg-gray-300"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      
      {error && <p className="text-red-500 text-center mb-6">{error}</p>}

      {/* Car Listings */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
      >
        {filterCars.length > 0 ? (
          filterCars.map((car, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative bg-white shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl pb-16"
            >
              {/* Car Image - Ensuring Full Visibility */}
              <div className="w-full h-64 flex justify-center items-center bg-gray-100">
                <img
                  src={`http://localhost:8080/${car.imageUrl}`}
                  alt={car.model}
                  className="w-full h-full object-contain rounded-t-xl"
                />
              </div>

              
              <div className="absolute left-0 right-0 bottom-16 flex justify-center">
                <div className="inline-block bg-white w-3/4 px-4 py-2 shadow-md rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800">{car.model}</h2>
                  <p className="text-gray-500 text-sm">
                    {car.year} | {car.fuelType} | {car.transmissionType} | {car.seatingCapacity} Seats
                  </p>
                  <p className="mt-2 text-lg font-bold text-gray-900">RS: {car.dailyRentalPrice} per day</p>
                </div>
              </div>

              
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white py-3 text-lg font-semibold rounded-b-xl hover:bg-blue-700 transition-all duration-200"
                onClick={() => handleBookNow(car)}
              >
                Book Now
              </motion.button>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-xl text-gray-600 col-span-full">No cars available</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Booking;

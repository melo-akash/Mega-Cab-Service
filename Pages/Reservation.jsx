import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Reservation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Extract car details from URL parameters
  const carModelParam = queryParams.get("carModel");
  const carTypeParam = queryParams.get("carType");
  const carImageParam = queryParams.get("carImage");

  const [reservations, setReservations] = useState([]);
  const [carModel, setCarModel] = useState(carModelParam || "");
  const [carType, setCarType] = useState(carTypeParam || "");
  const [carImage, setCarImage] = useState(carImageParam || "");
  const [locationInput, setLocationInput] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [pax, setPax] = useState(1);
  const [needDriver, setNeedDriver] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Car pricing per day
  const carPrices = {
    van: 10000, // Van price in LKR
    car: 8000, // Car price in LKR
    luxury: 15000, // Luxury Van price in LKR
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/reservations")
      .then((response) => response.json())
      .then((data) => setReservations(data))
      .catch((error) => {
        console.error("Error fetching reservations:", error);
        toast.error("❌ Failed to load reservations. Please try again.");
      });
  }, []);

  // Calculate total price dynamically when dates or options change
  useEffect(() => {
    console.log("Calculating price...");
    console.log("Pickup Date:", pickupDate);
    console.log("Dropoff Date:", dropoffDate);
    console.log("Car Type:", carType);

    if (pickupDate && dropoffDate && carType) {
      const start = new Date(pickupDate);
      const end = new Date(dropoffDate);

      if (start >= end) {
        setTotalPrice(0); // Avoid incorrect calculations
        console.warn("Invalid dates: Pickup date is after dropoff date.");
        return;
      }

      const diffDays = Math.max(Math.ceil((end - start) / (1000 * 60 * 60 * 24)), 1);

      const normalizedCarType = carType.toLowerCase(); // Fix case sensitivity issue
      const pricePerDay = carPrices[normalizedCarType] || 0;
      let price = pricePerDay * diffDays;

      if (needDriver) price += 50; // Extra charge for driver

      console.log("Days:", diffDays);
      console.log("Price Per Day:", pricePerDay);
      console.log("Total Price:", price);

      setTotalPrice(price);
    } else {
      setTotalPrice(0); // Reset if values are not selected
    }
  }, [pickupDate, dropoffDate, carType, needDriver]);

  // Handle reservation submission
  const handleReservation = async (e) => {
    e.preventDefault();

    if (!pickupDate || !dropoffDate || !carType || !carModel || !contactNumber) {
      toast.warn("⚠️ Please fill all required fields.");
      return;
    }

    if (new Date(pickupDate) >= new Date(dropoffDate)) {
      toast.error("❌ Drop-off date must be after pick-up date.");
      return;
    }

    const reservationData = {
      location: locationInput,
      pickupDate,
      dropoffDate,
      pickupTime,
      contactNumber,
      pax,
      needDriver,
      carType,
      carModel,
      totalPrice,
    };

    try {
      const response = await fetch("http://localhost:8080/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) throw new Error("Failed to create reservation");

      const newReservation = await response.json();
      setReservations([...reservations, newReservation]);

      
      localStorage.setItem("reservation", JSON.stringify(reservationData));

      
      toast.success("✅ Reservation created successfully!");

      
      setTimeout(() => {
        navigate("/cart");
      }, 2000);

      // Reset form fields
      setLocationInput("");
      setPickupDate("");
      setDropoffDate("");
      setPickupTime("");
      setContactNumber("");
      setPax(1);
      setNeedDriver(false);
      setCarType("");
      setCarModel("");
      setTotalPrice(0);
    } catch (error) {
      console.error("Error creating reservation:", error);
      toast.error("❌ Failed to create reservation. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <Navbar />
      <div className="container mx-auto max-w-5xl bg-white shadow-md rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Display Car Image (Now Larger) */}
        <div className="flex justify-center">
          {carImage && (
            <img
              src={`http://localhost:8080/${carImage}`}
              alt={carModel}
              className="w-full h-auto max-w-lg object-contain rounded-lg shadow-md"
            />
          )}
        </div>

        {/* Reservation Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Car Reservation</h2>
          <form onSubmit={handleReservation} className="grid grid-cols-2 gap-4">
            <input type="text" value={carType} readOnly className="col-span-2 p-2 border border-gray-300 rounded-md bg-gray-100" />
            <input type="text" value={carModel} readOnly className="col-span-2 p-2 border border-gray-300 rounded-md bg-gray-100" />
            <input type="text" placeholder="Enter Pickup Location" value={locationInput} onChange={(e) => setLocationInput(e.target.value)} required className="col-span-2 p-2 border border-gray-300 rounded-md" />
            <input type="text" placeholder="Your Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required className="col-span-2 p-2 border border-gray-300 rounded-md" />
            <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required className="col-span-2 p-2 border border-gray-300 rounded-md" />
            <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} required className="col-span-1 p-2 border border-gray-300 rounded-md" />
            <input type="date" value={dropoffDate} onChange={(e) => setDropoffDate(e.target.value)} required className="col-span-1 p-2 border border-gray-300 rounded-md" />

            {/* Display Total Price */}
            <div className="col-span-2 text-lg font-semibold text-center bg-gray-200 p-3 rounded-md">
              Total Price: <span className="text-green-600">LKR {totalPrice.toLocaleString()}</span>
            </div>

            <button type="submit" className="col-span-2 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">
              Confirm Reservation
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />
      <Footer/>
    </div>
  );
};

export default Reservation;

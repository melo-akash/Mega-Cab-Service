import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer"

const AddFeedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure all fields are filled
    if (!name.trim() || !email.trim() || !feedback.trim()) {
      toast.error("All fields are required!");
      return;
    }

    const feedbackData = { name, email, feedback };

    try {
      const response = await fetch("http://localhost:8080/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        toast.success("Feedback submitted successfully!");
        setName("");
        setEmail("");
        setFeedback("");
      } else {
        const errorMessage = await response.text(); // Get error message from server
        toast.error(`Failed to submit: ${errorMessage}`);
      }
    } catch (error) {
      toast.error("Network Error: Unable to submit feedback.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      
      <div className="relative w-full h-64 bg-cover bg-center" style={{ backgroundImage: "url('/car_1.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">We Value Your Feedback</h1>
        </div>
      </div>

      <Navbar/>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add Feedback</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="feedback" className="font-medium text-gray-700">Feedback</label>
            <textarea
              id="feedback"
              className="border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Submit Feedback
          </button>
        </form>
        
      </div>

      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer/>
    </div>
    
  );
};

export default AddFeedback;

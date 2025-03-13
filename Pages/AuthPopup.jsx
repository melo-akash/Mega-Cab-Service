import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthPopup = ({ setShowAuth }) => {
  const [currState, setCurrState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    city: "",
    contactNumber: "",
    dateOfBirth: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const url =
        currState === "Login"
          ? "http://localhost:8080/api/auth/login"
          : "http://localhost:8080/api/auth/register";

      const response = await axios.post(url, formData);

      if (currState === "Login") {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(response.data));

        // Close the modal and redirect to profile
        setShowAuth(false);
        navigate("/profile"); // Redirect to profile page after successful login
      } else {
        setSuccess("Registration successful! You can now log in.");
        setCurrState("Login");
      }
    } catch (err) {
      setError("Invalid credentials or user already exists.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Modal container with background image */}
      <div
        className="bg-white rounded-lg p-8 shadow-lg w-96 relative"
        style={{
          backgroundImage: 'url("/car_2.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={() => setShowAuth(false)}
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          {currState === "Login" ? "Login" : "Sign Up"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="username"
              placeholder="Your Name"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {currState === "Sign Up" && (
            <>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            {currState === "Login" ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle between Login/Register */}
        <div className="text-center mt-3 text-sm text-gray-600">
          {currState === "Login" ? (
            <p>
              Create a new account?{" "}
              <span
                onClick={() => setCurrState("Sign Up")}
                className="text-red-500 cursor-pointer"
              >
                Click here.
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setCurrState("Login")}
                className="text-red-500 cursor-pointer"
              >
                Login here.
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;

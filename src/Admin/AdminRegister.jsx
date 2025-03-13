import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    const adminData = {
      username,
      password,
    };

    try {
      const response = await axios.post("http://localhost:8080/admin/register", adminData);
      setMessage(response.data);
      toast.success("Registration successful!"); 
    } catch (error) {
      setMessage("Registration failed. Try again.");
      toast.error("Registration failed. Try again."); 
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-md mt-8">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">New Admin Registration</h2>
      
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-600">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
        >
          Register
        </button>
      </form>

      {message && <div className="mt-4 text-center text-gray-600">{message}</div>}

      
      <ToastContainer />
    </div>
  );
};

export default Register;

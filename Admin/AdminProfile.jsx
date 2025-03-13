import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminProfile = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "" });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/all");
      setAdmins(response.data);
    } catch (error) {
      toast.error("Error fetching admins.");
    }
  };

  const handleAddAdmin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/admin/register", newAdmin);
      if (response.data) {
        // Optimistically add the new admin to the state
        setAdmins((prevAdmins) => [...prevAdmins, response.data]);
        toast.success("New admin added successfully!");
        setNewAdmin({ username: "", password: "" });
      } else {
        toast.error("Failed to add admin. Try again.");
      }
    } catch (error) {
      toast.error("Failed to add admin. Try again.");
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    try {
      await axios.delete(`http://localhost:8080/admin/delete/${adminId}`);
      // Optimistically remove the deleted admin from the state
      setAdmins((prevAdmins) => prevAdmins.filter(admin => admin.id !== adminId));
      toast.success("Admin deleted successfully!");
    } catch (error) {
      toast.error("Error deleting admin.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <ToastContainer />

      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Admin Profile</h2>

        {/* Add Admin Form */}
        <form onSubmit={handleAddAdmin} className="mb-4">
          <div className="mb-3">
            <input
              type="text"
              placeholder="New Admin Username"
              value={newAdmin.username}
              onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              value={newAdmin.password}
              onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300">
            Add Admin
          </button>
        </form>

        {/* Admin List */}
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Admin List</h3>
        {admins.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {admins.map((admin) => (
              <li key={admin.id} className="py-2 flex justify-between items-center">
                <span>{admin.username}</span>
                <button
                  onClick={() => handleDeleteAdmin(admin.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No admins found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;

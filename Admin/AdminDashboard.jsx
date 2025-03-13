import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate hook

const AdminDashboard = () => {
  const [totalDrivers, setTotalDrivers] = useState(0); // State for holding total drivers
  const [totalBookings, setTotalBookings] = useState(0); // State for holding total bookings
  const [totalRevenue, setTotalRevenue] = useState(0); // State for holding total revenue
  const [pendingBookings, setPendingBookings] = useState(0); // State for holding pending bookings

  const username = localStorage.getItem("username"); // Get username from localStorage
  const navigate = useNavigate(); // Hook for navigation

  // Fetch total drivers count from backend
  const fetchTotalDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/driver/total-drivers');
      setTotalDrivers(response.data); // Set the total drivers count
    } catch (error) {
      console.error('Error fetching total drivers count:', error);
    }
  };

  // Fetch other data (total bookings, revenue, and pending bookings)
  const fetchOtherData = async () => {
    try {
      // Example API requests (replace with your actual endpoints)
      const bookingsResponse = await axios.get('http://localhost:8080/api/v1/bookings/total-bookings');
      const revenueResponse = await axios.get('http://localhost:8080/api/v1/revenue/total-revenue');
      const pendingResponse = await axios.get('http://localhost:8080/api/v1/bookings/pending-bookings');

      setTotalBookings(bookingsResponse.data); // Set total bookings
      setTotalRevenue(revenueResponse.data); // Set total revenue
      setPendingBookings(pendingResponse.data); // Set pending bookings
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call fetchTotalDrivers and fetchOtherData when the component mounts
  useEffect(() => {
    fetchTotalDrivers();
    fetchOtherData();
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('username'); // Clear username from localStorage
    navigate('/admin/login'); // Redirect to the login page
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-6">
        <div className="text-2xl font-bold mb-8">MegaCab Admin</div>
        <ul className="space-y-4">
          <li>
            <Link to="/" className="hover:bg-blue-700 p-2 rounded-md block">Dashboard</Link>
          </li>
          <li>
            <Link to="/driver" className="hover:bg-blue-700 p-2 rounded-md block">Drivers</Link>
          </li>
          <li>
            <Link to="/carform" className="hover:bg-blue-700 p-2 rounded-md block">Vehicle</Link>
          </li>
          <li>
            <Link to="/book" className="hover:bg-blue-700 p-2 rounded-md block">Bookings</Link>
          </li>
          <li>
            <Link to="/customers" className="hover:bg-blue-700 p-2 rounded-md block">Users</Link>
          </li>
          <li>
            <Link to="/admin/profile" className="hover:bg-blue-700 p-2 rounded-md block">Profile</Link>
          </li>
          {/* Logout Button */}
          <li>
            <button
              onClick={handleLogout}
              className="hover:bg-blue-700 p-2 rounded-md block w-full text-left"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="col-span-4 text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-700">Welcome, {username}!</h2>
          </div>

          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-xl font-semibold text-gray-700">Total Drivers</div>
            <div className="text-3xl font-bold text-blue-800 mt-2">{totalDrivers}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-xl font-semibold text-gray-700">Total Bookings</div>
            <div className="text-3xl font-bold text-blue-800 mt-2">{totalBookings}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-xl font-semibold text-gray-700">Total Revenue</div>
            <div className="text-3xl font-bold text-blue-800 mt-2">RS: {totalRevenue}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-xl font-semibold text-gray-700">Pending Bookings</div>
            <div className="text-3xl font-bold text-blue-800 mt-2">{pendingBookings}</div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
          <div className="text-2xl font-semibold text-gray-700">Recent Activities</div>
          <ul className="mt-4 space-y-4">
            <li className="border-b pb-4">
              <div className="font-semibold">New driver added</div>
              <div className="text-sm text-gray-600">Sarah Williams - 5 minutes ago</div>
            </li>
            <li className="border-b pb-4">
              <div className="font-semibold">Booking #1012 completed</div>
              <div className="text-sm text-gray-600">12 hours ago</div>
            </li>
            <li className="border-b pb-4">
              <div className="font-semibold">Revenue for the day</div>
              <div className="text-sm text-gray-600">RS3,420 - Yesterday</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

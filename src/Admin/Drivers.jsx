import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import 'react-toastify/dist/ReactToastify.css';

const DriverManagement = () => {
  const [drivers, setDrivers] = useState([]);
  const [driver, setDriver] = useState({ name: '', email: '', phoneNumber: '', vehicleType: '', available: true });
  const [editingDriverId, setEditingDriverId] = useState(null);
  const navigate = useNavigate();  // Initialize navigate

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/driver/getall');
      setDrivers(response.data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      toast.error('Error fetching drivers');
    }
  };

  const handleChange = (e) => {
    setDriver({ ...driver, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDriverId) {
        await axios.put(`http://localhost:8080/api/v1/driver/edit/${editingDriverId}`, driver);
        toast.success('Driver updated successfully!');
      } else {
        await axios.post('http://localhost:8080/api/v1/driver/save', driver);
        toast.success('Driver added successfully!');
      }
      setDriver({ name: '', email: '', phoneNumber: '', vehicleType: '', available: true });
      setEditingDriverId(null);
      fetchDrivers();
    } catch (error) {
      console.error('Error saving driver:', error);
      toast.error('Error saving driver');
    }
  };

  const startEditing = (driver) => {
    setDriver(driver);
    setEditingDriverId(driver._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/driver/delete/${id}`);
      toast.success('Driver deleted successfully!');
      fetchDrivers();
    } catch (error) {
      console.error('Error deleting driver:', error);
      toast.error('Error deleting driver');
    }
  };

  // Back Button to navigate to Admin Dashboard
  const goBackToAdminDashboard = () => {
    navigate('/admin');  // Navigate to the admin dashboard page
  };

  return (
    <div className="max-w-7xl mx-auto p-8 flex flex-row space-x-8">
      {/* Back Button to Admin Dashboard */}
      <button
        onClick={goBackToAdminDashboard}
        className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 mb-6"
      >
        Back to Admin Dashboard
      </button>

      {/* Form Section */}
      <div className="w-1/2 bg-white p-6 rounded shadow-md">
        <h1 className="text-3xl font-semibold mb-6">Driver Management</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Name</label>
            <input type="text" name="name" value={driver.name} onChange={handleChange} required className="w-full p-3 border rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Email</label>
            <input type="email" name="email" value={driver.email} onChange={handleChange} required className="w-full p-3 border rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Phone Number</label>
            <input type="text" name="phoneNumber" value={driver.phoneNumber} onChange={handleChange} required className="w-full p-3 border rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Vehicle Type</label>
            <input type="text" name="vehicleType" value={driver.vehicleType} onChange={handleChange} required className="w-full p-3 border rounded-md" />
          </div>
          <div className="mb-4 flex items-center">
            <label className="mr-3">Availability</label>
            <input type="checkbox" name="available" checked={driver.available} onChange={(e) => setDriver({ ...driver, available: e.target.checked })} className="w-5 h-5" />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600">
            {editingDriverId ? 'Update Driver' : 'Add Driver'}
          </button>
        </form>
      </div>

      {/* Driver List Section */}
      <div className="w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Driver List</h2>
        <div className="grid grid-cols-2 gap-4">
          {drivers.map((driver) => (
            <div key={driver._id} className="p-4 bg-gray-50 rounded-md shadow-sm flex justify-between items-center">
              <div>
                <p className="font-medium">{driver.name}</p>
                <p className="text-sm text-gray-600">{driver.vehicleType} - {driver.available ? 'Available' : 'Not Available'}</p>
              </div>
              <div className="space-x-3">
                <button onClick={() => startEditing(driver)} className="text-blue-500 hover:underline">Edit</button>
                <button onClick={() => handleDelete(driver._id)} className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DriverManagement;

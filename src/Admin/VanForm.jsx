import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VanManagement = () => {
  const [vans, setVans] = useState([]);
  const [van, setVan] = useState({
    make: '',
    model: '',
    year: '',
    imageUrl: '',
    driverName: '',
    driverLocation: '',
    licenseNumber: '',
  });
  const [editingVanId, setEditingVanId] = useState(null);

  // Fetch all vans
  const fetchVans = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/van/getall');
      setVans(response.data);
    } catch (error) {
      console.error('Error fetching vans:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVan({ ...van, [name]: value });
  };

  // Create or update a van
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingVanId) {
        await axios.put(`http://localhost:8080/api/v1/van/edit/${editingVanId}`, van);
        alert('Van updated successfully!');
      } else {
        await axios.post('http://localhost:8080/api/v1/van/save', van);
        alert('Van added successfully!');
      }
      setVan({
        make: '',
        model: '',
        year: '',
        imageUrl: '',
        driverName: '',
        driverLocation: '',
        licenseNumber: '',
      });
      setEditingVanId(null);
      fetchVans();
    } catch (error) {
      console.error('Error saving van:', error);
    }
  };

  // Start editing a van
  const startEditing = (van) => {
    setVan(van);
    setEditingVanId(van.id);
  };

  // Delete a van
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/van/delete/${id}`);
      alert('Van deleted successfully!');
      fetchVans();
    } catch (error) {
      console.error('Error deleting van:', error);
    }
  };

  useEffect(() => {
    fetchVans();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Van Management</h1>

      {/* Van Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Make</label>
            <input
              type="text"
              name="make"
              value={van.make}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Model</label>
            <input
              type="text"
              name="model"
              value={van.model}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Year</label>
            <input
              type="number"
              name="year"
              value={van.year}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={van.imageUrl}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Driver Name</label>
            <input
              type="text"
              name="driverName"
              value={van.driverName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Driver Location</label>
            <input
              type="text"
              name="driverLocation"
              value={van.driverLocation}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">License Number</label>
            <input
              type="text"
              name="licenseNumber"
              value={van.licenseNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        <button type="submit" className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">
          {editingVanId ? 'Update Van' : 'Add Van'}
        </button>
      </form>

      {/* Van List */}
      <h2 className="text-xl font-semibold mb-4">Van List</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Make</th>
            <th className="border p-2">Model</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">Driver Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vans.map((van) => (
            <tr key={van.id}>
              <td className="border p-2">{van.make}</td>
              <td className="border p-2">{van.model}</td>
              <td className="border p-2">{van.year}</td>
              <td className="border p-2">{van.driverName}</td>
              <td className="border p-2">
                <button
                  onClick={() => startEditing(van)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(van.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VanManagement;

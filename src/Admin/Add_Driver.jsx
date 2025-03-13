import React, { useState } from 'react';

const AddDriver = () => {
  const [driver, setDriver] = useState({
    name: '',
    carModel: '',
    location: '',
    status: 'Active',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDriver({ ...driver, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Driver added!');
    // Add the driver logic (e.g., API call)
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Add New Driver</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Driver Name</label>
          <input
            type="text"
            name="name"
            value={driver.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Car Model</label>
          <input
            type="text"
            name="carModel"
            value={driver.carModel}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={driver.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={driver.status}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Driver
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDriver;

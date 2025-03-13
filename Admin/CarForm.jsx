import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CarForm() {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [carType, setCarType] = useState('');
  const [licensePlateNumber, setLicensePlateNumber] = useState('');
  const [color, setColor] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmissionType, setTransmissionType] = useState('');
  const [seatingCapacity, setSeatingCapacity] = useState('');
  const [available, setAvailable] = useState(true);
  const [dailyRentalPrice, setDailyRentalPrice] = useState('');
  const [image, setImage] = useState(null);
  const [driverName, setDriverName] = useState('');
  const [driverLocation, setDriverLocation] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); // Hook for navigating to other pages

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setError('');
    } else {
      setError('Please select a valid image file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!make || !model || !year || !carType || !licensePlateNumber || !color || !fuelType || !transmissionType || !seatingCapacity || !available || !dailyRentalPrice || !image || !driverName || !driverLocation || !licenseNumber) {
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('make', make);
    formData.append('model', model);
    formData.append('year', year);
    formData.append('carType', carType);
    formData.append('licensePlateNumber', licensePlateNumber);
    formData.append('color', color);
    formData.append('fuelType', fuelType);
    formData.append('transmissionType', transmissionType);
    formData.append('seatingCapacity', seatingCapacity);
    formData.append('available', available);
    formData.append('dailyRentalPrice', dailyRentalPrice);
    formData.append('image', image);
    formData.append('driverName', driverName);
    formData.append('driverLocation', driverLocation);
    formData.append('licenseNumber', licenseNumber);

    try {
      const response = await fetch('http://localhost:8080/api/cars', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccess('Car added successfully!');
        setMake('');
        setModel('');
        setYear('');
        setCarType('');
        setLicensePlateNumber('');
        setColor('');
        setFuelType('');
        setTransmissionType('');
        setSeatingCapacity('');
        setAvailable(true);
        setDailyRentalPrice('');
        setImage(null);
        setDriverName('');
        setDriverLocation('');
        setLicenseNumber('');
      } else {
        setError('Failed to add car');
      }
    } catch (error) {
      setError('An error occurred while adding the car');
    }
  };

  const handleSeeAllClick = () => {
    navigate("/carlist"); // Navigate to the /carlist page
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-row items-center justify-center">
      <div className="w-full md:w-2/3">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Car</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Make</label>
            <input
              type="text"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Model</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Car Type</label>
            <input
              type="text"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">License Plate Number</label>
            <input
              type="text"
              value={licensePlateNumber}
              onChange={(e) => setLicensePlateNumber(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
            <input
              type="text"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Transmission Type</label>
            <input
              type="text"
              value={transmissionType}
              onChange={(e) => setTransmissionType(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Seating Capacity</label>
            <input
              type="number"
              value={seatingCapacity}
              onChange={(e) => setSeatingCapacity(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Available</label>
            <input
              type="checkbox"
              checked={available}
              onChange={() => setAvailable(!available)}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Daily Rental Price</label>
            <input
              type="number"
              value={dailyRentalPrice}
              onChange={(e) => setDailyRentalPrice(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Driver Name</label>
            <input
              type="text"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Driver Location</label>
            <input
              type="text"
              value={driverLocation}
              onChange={(e) => setDriverLocation(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">License Number</label>
            <input
              type="text"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Add Car
          </button>
          <button type="button" onClick={handleSeeAllClick} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            See All
          </button>
        </form>
      </div>
    </div>
  );
}

export default CarForm;

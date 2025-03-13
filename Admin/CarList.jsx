import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import { toast, ToastContainer } from 'react-toastify';  // Importing toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Ensure styles are imported

function CarList() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);  // For storing the car to be updated
  const [isModalOpen, setIsModalOpen] = useState(false);  // For controlling modal visibility
  const navigate = useNavigate();  // Initialize navigate for React Router

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/cars');
        if (response.ok) {
          const data = await response.json();
          setCars(data);
          toast.success('Cars fetched successfully!');
        } else {
          setError('Failed to fetch cars');
          toast.error('Failed to fetch cars');
        }
      } catch (error) {
        setError('An error occurred while fetching the cars');
        toast.error('An error occurred while fetching the cars');
      }
    };

    fetchCars();
  }, []);

  const deleteCar = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cars/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCars(cars.filter(car => car.id !== id));
        toast.success('Car deleted successfully!');
      } else {
        setError('Failed to delete car');
        toast.error('Failed to delete car');
      }
    } catch (error) {
      setError('An error occurred while deleting the car');
      toast.error('An error occurred while deleting the car');
    }
  };

  const updateCar = (car) => {
    console.log("Selected car:", car);  // Add this log to check the selected car
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const updatedCar = {
      ...selectedCar,
      make: e.target.make.value,
      model: e.target.model.value,
      year: e.target.year.value,
    };

    console.log("Updated car:", updatedCar);  // Log the updated car data to debug

    try {
      const response = await fetch(`http://localhost:8080/api/cars/${selectedCar.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedCar),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedCars = cars.map(car =>
          car.id === selectedCar.id ? updatedCar : car
        );
        setCars(updatedCars);
        setIsModalOpen(false);
        toast.success('Car updated successfully!');
      } else {
        setError('Failed to update car');
        toast.error('Failed to update car');
      }
    } catch (error) {
      setError('An error occurred while updating the car');
      toast.error('An error occurred while updating the car');
    }
  };

  // Back Button to navigate to Admin Dashboard
  const goBackToAdminDashboard = () => {
    navigate('/admin');  // Navigate to the admin dashboard page
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Car List</h2>
      
      {/* Back Button to Admin Dashboard */}
      <button
        onClick={goBackToAdminDashboard}
        className="px-6 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200 mb-6"
      >
        Back to Admin Dashboard
      </button>
      
      {error && <p className="text-red-500 text-center">{error}</p>}
      {cars.length > 0 ? (
        <table className="w-full table-auto border-separate border-spacing-2">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4 text-left text-sm font-medium">Make</th>
              <th className="p-4 text-left text-sm font-medium">Model</th>
              <th className="p-4 text-left text-sm font-medium">Year</th>
              <th className="p-4 text-left text-sm font-medium">Car Type</th>
              <th className="p-4 text-left text-sm font-medium">License Plate</th>
              <th className="p-4 text-left text-sm font-medium">Color</th>
              <th className="p-4 text-left text-sm font-medium">Fuel Type</th>
              <th className="p-4 text-left text-sm font-medium">Transmission</th>
              <th className="p-4 text-left text-sm font-medium">Seating Capacity</th>
              <th className="p-4 text-left text-sm font-medium">Available</th>
              <th className="p-4 text-left text-sm font-medium">Daily Price</th>
              <th className="p-4 text-left text-sm font-medium">Driver Name</th>
              <th className="p-4 text-left text-sm font-medium">Driver Location</th>
              <th className="p-4 text-left text-sm font-medium">License Number</th>
              <th className="p-4 text-left text-sm font-medium">Image</th>
              <th className="p-4 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id} className="border-t">
                <td className="p-4 text-sm text-gray-800">{car.make}</td>
                <td className="p-4 text-sm text-gray-800">{car.model}</td>
                <td className="p-4 text-sm text-gray-800">{car.year}</td>
                <td className="p-4 text-sm text-gray-800">{car.carType}</td>
                <td className="p-4 text-sm text-gray-800">{car.licensePlateNumber}</td>
                <td className="p-4 text-sm text-gray-800">{car.color}</td>
                <td className="p-4 text-sm text-gray-800">{car.fuelType}</td>
                <td className="p-4 text-sm text-gray-800">{car.transmissionType}</td>
                <td className="p-4 text-sm text-gray-800">{car.seatingCapacity}</td>
                <td className="p-4 text-sm text-gray-800">{car.available ? 'Yes' : 'No'}</td>
                <td className="p-4 text-sm text-gray-800">RS{car.dailyRentalPrice}</td>
                <td className="p-4 text-sm text-gray-800">{car.driverName}</td>
                <td className="p-4 text-sm text-gray-800">{car.driverLocation}</td>
                <td className="p-4 text-sm text-gray-800">{car.licenseNumber}</td>
                <td className="p-4">
                  <img
                    src={`http://localhost:8080/${car.imageUrl}`}
                    alt={car.make}
                    className="w-24 h-16 object-cover rounded-md shadow-md"
                  />
                </td>
                <td className="p-4">
                  <button
                    onClick={() => updateCar(car)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out mr-4"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteCar(car.id)}
                    className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ease-in-out"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No cars found</p>
      )}

      {/* Modal for updating car */}
      {isModalOpen && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 shadow-lg transform transition-all duration-300 scale-100">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Update Car</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-700">Make</label>
                <input
                  type="text"
                  name="make"
                  defaultValue={selectedCar?.make}
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-700">Model</label>
                <input
                  type="text"
                  name="model"
                  defaultValue={selectedCar?.model}
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-700">Year</label>
                <input
                  type="text"
                  name="year"
                  defaultValue={selectedCar?.year}
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ToastContainer to render toast messages */}
      <ToastContainer />
    </div>
  );
}

export default CarList;

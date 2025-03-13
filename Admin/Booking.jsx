import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook
import "react-toastify/dist/ReactToastify.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetch("http://localhost:8080/api/reservations")
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => {
        console.error("Error fetching reservations:", error);
        toast.error("Failed to fetch reservations.");
      });
  }, []);

  const handleDeleteBooking = (id) => {
    fetch(`http://localhost:8080/api/reservations/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setBookings(bookings.filter((booking) => booking.id !== id));
        toast.success("Booking deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting reservation:", error);
        toast.error("Failed to delete booking.");
      });
  };

  const handleCompleteBooking = (id) => {
    fetch(`http://localhost:8080/api/reservations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Completed" }),
    })
      .then(() =>
        setBookings(
          bookings.map((booking) =>
            booking.id === id ? { ...booking, status: "Completed" } : booking
          )
        )
      )
      .then(() => toast.success("Booking marked as Completed!"))
      .catch((error) => {
        console.error("Error updating reservation:", error);
        toast.error("Failed to update booking.");
      });
  };

  // Back Button to navigate to the Admin Dashboard
  const goBackToAdminDashboard = () => {
    navigate("/admin");  // Navigate to the Admin Dashboard
  };

  return (
    <div className="flex flex-col p-8">
      {/* Back Button */}
      <button
        onClick={goBackToAdminDashboard}
        className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-500 mb-6"
      >
        Back to Admin Dashboard
      </button>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-700">Booking Management</h2>
      </div>

      {/* Booking Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Customer Name</th>
              <th className="px-6 py-3 text-left">Contact Number</th>
              <th className="px-6 py-3 text-left">Car Model</th>
              <th className="px-6 py-3 text-left">Car Type</th>
              <th className="px-6 py-3 text-left">Location</th>
              <th className="px-6 py-3 text-left">Pickup Date & Time</th>
              <th className="px-6 py-3 text-left">Drop-off Date</th>
              <th className="px-6 py-3 text-left">Passengers</th>
              <th className="px-6 py-3 text-left">Driver Required</th>
              <th className="px-6 py-3 text-left">Total Price</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4">{booking.userName}</td>
                  <td className="px-6 py-4">{booking.contactNumber}</td>
                  <td className="px-6 py-4">{booking.carModel}</td>
                  <td className="px-6 py-4 capitalize">{booking.carType}</td>
                  <td className="px-6 py-4">{booking.location}</td>
                  <td className="px-6 py-4">
                    {booking.pickupDate} at {booking.pickupTime}
                  </td>
                  <td className="px-6 py-4">{booking.dropoffDate}</td>
                  <td className="px-6 py-4">{booking.pax}</td>
                  <td className="px-6 py-4">
                    {booking.needDriver ? "Yes (+RS:5000)" : "No"}
                  </td>
                  <td className="px-6 py-4 font-semibold">RS:{booking.totalPrice}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-4 py-2 rounded-full ${
                        booking.status === "Completed"
                          ? "bg-green-500 text-white"
                          : booking.status === "Pending"
                          ? "bg-yellow-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex space-x-3">
                    <button
                      className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-500"
                      onClick={() => alert(`Viewing booking for ${booking.customerName}`)}
                    >
                      View
                    </button>
                    {booking.status !== "Completed" && (
                      <button
                        className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-500"
                        onClick={() => handleCompleteBooking(booking.id)}
                      >
                        Mark Completed
                      </button>
                    )}
                    <button
                      className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-500"
                      onClick={() => handleDeleteBooking(booking.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center py-4 text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Toastify */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Bookings;

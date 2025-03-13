import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const [reservation, setReservation] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedReservation = JSON.parse(localStorage.getItem("reservation"));
    if (storedReservation) {
      setReservation(storedReservation);
    } else {
      toast.error("No reservation found! Redirecting...", { autoClose: 2000 });
      setTimeout(() => navigate("/reservation"), 2000);
    }
  }, [navigate]);

  const generateInvoicePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Car Reservation Invoice", 70, 20);

    doc.setFontSize(12);
    doc.text(`Customer Name: ${customerName}`, 20, 40);
    doc.text(`Car Model: ${reservation.carModel}`, 20, 50);
    doc.text(`Car Type: ${reservation.carType}`, 20, 60);
    doc.text(`Pickup Location: ${reservation.location}`, 20, 70);
    doc.text(`Pickup Date: ${reservation.pickupDate} at ${reservation.pickupTime}`, 20, 80);
    doc.text(`Drop-off Date: ${reservation.dropoffDate}`, 20, 90);
    doc.text(`Passengers: ${reservation.pax}`, 20, 100);
    doc.text(`Driver Required: ${reservation.needDriver ? "Yes (+LKR 5000)" : "No"}`, 20, 110);

    doc.setFontSize(14);
    doc.text("Price Breakdown:", 20, 130);
    doc.setFontSize(12);
    doc.text(`Subtotal: LKR ${reservation.totalPrice}`, 20, 140);
    doc.text("Delivery: LKR 0", 20, 150);
    doc.setFontSize(14);
    doc.text(`Total: LKR ${reservation.totalPrice}`, 20, 160);

    doc.setFontSize(12);
    doc.text(`Payment Method: ${paymentMethod}`, 20, 180);
    doc.text("Thank you for your reservation!", 20, 220);

    doc.save(`Invoice_${reservation.pickupDate}.pdf`);
  };

  const handlePayment = () => {
    if (!paymentMethod || !customerName || !cardNumber || !expiryDate) {
      toast.error("Please fill in all payment details!", { autoClose: 2000 });
      return;
    }

    toast.success(`Payment Successful with ${paymentMethod}!`, { autoClose: 2000 });

    generateInvoicePDF();
    localStorage.removeItem("reservation");

    setTimeout(() => navigate("/"), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="container mx-auto max-w-4xl bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Payment Summary</h2>

        {reservation ? (
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Reservation Details</h3>
            <div className="border-b pb-2 mb-2 text-gray-600">
              <p><strong>Car Model:</strong> {reservation.carModel}</p>
              <p><strong>Car Type:</strong> {reservation.carType}</p>
              <p><strong>Pickup Location:</strong> {reservation.location}</p>
              <p><strong>Pickup Date:</strong> {reservation.pickupDate} at {reservation.pickupTime}</p>
              <p><strong>Drop-off Date:</strong> {reservation.dropoffDate}</p>
              <p><strong>Passengers:</strong> {reservation.pax}</p>
              <p><strong>Driver Required:</strong> {reservation.needDriver ? "Yes (+LKR 50)" : "No"}</p>
            </div>

            <h3 className="text-lg font-semibold mt-4">Price Breakdown</h3>
            <div className="border-b pb-2 mb-2 flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>LKR {reservation.totalPrice}</span>
            </div>
            <div className="border-b pb-2 mb-2 flex justify-between text-gray-600">
              <span>Delivery</span>
              <span>LKR 0</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>LKR {reservation.totalPrice}</span>
            </div>

            <h3 className="text-lg font-semibold mt-6">Select Payment Method</h3>
            <div className="mt-3 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="payment" value="Credit Card" onChange={(e) => setPaymentMethod(e.target.value)} />
                Credit Card
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="payment" value="PayPal" onChange={(e) => setPaymentMethod(e.target.value)} />
                PayPal
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="payment" value="Cash on Delivery" onChange={(e) => setPaymentMethod(e.target.value)} />
                Cash on Delivery
              </label>
            </div>

            <div className="mt-6 space-y-2">
              <label className="block text-sm font-semibold">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your name"
              />

              <label className="block text-sm font-semibold">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your card number"
              />

              <label className="block text-sm font-semibold">Expiry Date</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="MM/YY"
              />
            </div>

            <button
              onClick={handlePayment}
              className="mt-6 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
            >
              Confirm Payment & Download Invoice
            </button>
          </div>
        ) : (
          <p className="text-gray-500">No reservation found.</p>
        )}
      </div>
      
    </div>
  );
};

export default Cart;

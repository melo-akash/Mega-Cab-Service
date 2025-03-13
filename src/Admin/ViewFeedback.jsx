import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/feedback");
        if (response.ok) {
          const data = await response.json();
          setFeedbackList(data);
          toast.success("Feedback loaded successfully!");
        } else {
          setError("Failed to load feedback.");
          toast.error("Failed to load feedback.");
        }
      } catch (error) {
        setError("Error: " + error.message);
        toast.error("Error fetching feedback.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">View All Feedback</h2>

      {/* Loading State */}
      {loading && <p className="text-lg text-gray-700">Loading feedback...</p>}

      {/* Error State */}
      {error && <p className="text-red-600 font-medium">{error}</p>}

      {/* Feedback List */}
      {!loading && !error && (
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <ul className="divide-y divide-gray-300">
            {feedbackList.map((feedback) => (
              <li key={feedback.id} className="p-4">
                <p className="text-lg font-semibold text-gray-900">{feedback.name}</p>
                <p className="text-gray-600">{feedback.email}</p>
                <p className="text-gray-800 mt-2">{feedback.feedback}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ViewFeedback;

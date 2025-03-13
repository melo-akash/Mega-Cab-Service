import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Feedback = () => {
    const [feedback, setFeedback] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedbackList, setFeedbackList] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const API_URL = "http://localhost:8080/api/feedback";

    // Fetch all feedback
    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            const response = await axios.get(API_URL);
            setFeedbackList(response.data);
        } catch (err) {
            console.error("Error fetching feedback:", err);
        }
    };

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        if (!feedback.trim()) {
            setError("Feedback cannot be empty.");
            return;
        }

        try {
            const response = await axios.post(API_URL, {
                name,
                email,
                feedback
            });

            setSuccess("Thank you for your feedback!");
            setError('');
            setFeedback('');
            setName('');
            setEmail('');
            fetchFeedback(); // Refresh the list
        } catch (err) {
            setError("Failed to submit feedback. Please try again.");
            console.error("Error submitting feedback:", err);
        }
    };

    const handleDeleteFeedback = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchFeedback(); // Refresh the list
        } catch (err) {
            console.error("Error deleting feedback:", err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" 
             style={{ backgroundImage: "url('/car_1.jpg')" }}> 
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Submit Feedback</h2>
                <form onSubmit={handleFeedbackSubmit} className="mt-4">
                    <input
                        type="text"
                        placeholder="Your Name (Optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    <input
                        type="email"
                        placeholder="Your Email (Optional)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    <textarea
                        placeholder="Write your feedback..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        rows="4"
                    ></textarea>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {success && <p className="text-green-500 text-sm text-center">{success}</p>}
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
                        Submit Feedback
                    </button>
                </form>
            </div>

            {/* Display Feedback List */}
            <div className="mt-6 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-xl font-semibold text-center text-gray-800">All Feedback</h3>
                <ul className="mt-4">
                    {feedbackList.length === 0 ? (
                        <p className="text-gray-500 text-center">No feedback yet.</p>
                    ) : (
                        feedbackList.map((item) => (
                            <li key={item.id} className="border-b py-2 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{item.name || "Anonymous"}</p>
                                    <p className="text-gray-600">{item.feedback}</p>
                                </div>
                                <button
                                    onClick={() => handleDeleteFeedback(item.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 transition duration-300"
                                >
                                    Delete
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Feedback;

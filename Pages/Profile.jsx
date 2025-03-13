import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            navigate("/register");
        } else {
            setUser(storedUser);
            setUpdatedUser(storedUser);
        }
    }, [navigate]);

    const handleChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/api/users/${user.id}`, updatedUser);
            toast.success("Profile updated successfully!", { position: "top-center" });

            setUser(response.data);
            setIsEditing(false);
            localStorage.setItem("user", JSON.stringify(response.data)); // Update localStorage
        } catch (error) {
            toast.error("Error updating profile. Please try again.", { position: "top-center" });
            console.error("Error updating profile:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        toast.info("Logged out successfully.", { position: "top-center" });
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
            style={{ backgroundImage: "url('/car_8.jpg')" }}>
            <ToastContainer />
            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">User Profile</h2>

                {!isEditing ? (
                    <>
                        <p className="mb-2"><strong>Username:</strong> {user?.username}</p>
                        <p className="mb-2"><strong>Email:</strong> {user?.email}</p>
                        <p className="mb-2"><strong>City:</strong> {user?.city}</p>
                        <p className="mb-2"><strong>Contact Number:</strong> {user?.contactNumber}</p>
                        <p className="mb-4"><strong>Date of Birth:</strong> {user?.dateOfBirth}</p>

                        <button onClick={() => setIsEditing(true)} 
                                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
                            Edit Profile
                        </button>
                        <button onClick={handleLogout} 
                                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-700 transition duration-300 mt-2">
                            Logout
                        </button>
                    </>
                ) : (
                    <form onSubmit={handleUpdateProfile}>
                        <div className="mb-3">
                            <input type="text" name="username" value={updatedUser.username} onChange={handleChange} 
                                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>
                        <div className="mb-3">
                            <input type="email" name="email" value={updatedUser.email} onChange={handleChange} 
                                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>
                        <button type="submit" 
                                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300">
                            Save Changes
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Profile;

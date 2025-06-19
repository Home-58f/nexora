import React, { useState, useEffect } from 'react';
import { Send, Trash2, Loader2, RefreshCw, XCircle } from 'lucide-react'; // Icons from lucide-react

// Base URL for your backend API
// In a real project with Create React App, this would be: process.env.REACT_APP_API_BASE_URL
// In Next.js: process.env.NEXT_PUBLIC_API_BASE_URL
const API_BASE_URL = 'http://localhost:5000/api'; // Ensure this matches your backend port

const App = () => {
    // State for managing feedbacks data
    const [feedbacks, setFeedbacks] = useState([]);
    // State for feedback form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    // State for loading and error handling
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // State for delete confirmation modal
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [feedbackToDelete, setFeedbackToDelete] = useState(null);

    // Function to fetch all feedbacks from the backend
    const fetchFeedbacks = async () => {
        setIsLoading(true);
        setError(null); // Clear previous errors
        try {
            const response = await fetch(`${API_BASE_URL}/feedbacks`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setFeedbacks(data); // Data is already sorted by createdAt descending from backend
        } catch (err) {
            setError('Failed to fetch feedbacks. Please try again.');
            console.error("Fetch feedbacks error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect hook to fetch feedbacks when the component mounts
    useEffect(() => {
        fetchFeedbacks();
    }, []); // Empty dependency array means this runs once on mount

    // Handler for submitting new feedback
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError(null); // Clear previous errors

        // Basic client-side validation
        if (!name.trim() || !email.trim() || !message.trim()) {
            setError('All fields are required.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit feedback.');
            }

            // If successful, refetch feedbacks to update the list
            setName('');
            setEmail('');
            setMessage('');
            fetchFeedbacks(); // Refresh the list
        } catch (err) {
            setError(err.message);
            console.error("Submit feedback error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Handler for initiating feedback deletion (opens confirmation modal)
    const handleDeleteClick = (feedbackId) => {
        setFeedbackToDelete(feedbackId);
        setShowConfirmModal(true);
    };

    // Handler for confirming feedback deletion
    const confirmDelete = async () => {
        setError(null);
        setIsLoading(true);
        setShowConfirmModal(false); // Close modal immediately

        try {
            const response = await fetch(`${API_BASE_URL}/feedback/${feedbackToDelete}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete feedback.');
            }

            // If successful, refetch feedbacks to update the list
            fetchFeedbacks(); // Refresh the list
        } catch (err) {
            setError(err.message);
            console.error("Delete feedback error:", err);
        } finally {
            setIsLoading(false);
            setFeedbackToDelete(null); // Clear feedback to delete
        }
    };

    // Handler for canceling feedback deletion
    const cancelDelete = () => {
        setShowConfirmModal(false);
        setFeedbackToDelete(null);
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 font-sans text-gray-900 flex flex-col items-center py-10 px-4">
            <style>
                {`
                    body { font-family: 'Inter', sans-serif; }
                    .modal-overlay {
                        background-color: rgba(0, 0, 0, 0.6); /* Slightly darker overlay */
                        z-index: 1000;
                    }
                    .modal-content {
                        z-index: 1001;
                        animation: fadeIn 0.3s ease-out;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}
            </style>

            {/* Header */}
            <header className="w-full max-w-3xl bg-green-700 text-white p-6 rounded-lg shadow-xl mb-8 text-center">
                <h1 className="text-4xl font-bold mb-2">Nexora Grid Feedback</h1>
                <p className="text-xl">Your thoughts help us improve!</p>
            </header>

            {/* Feedback Submission Form */}
            <section className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md mb-8 border border-green-200">
                <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">Submit Your Feedback</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 shadow-sm transition duration-150 ease-in-out"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 shadow-sm transition duration-150 ease-in-out"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                            id="message"
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 shadow-sm transition duration-150 ease-in-out"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tell us what you think..."
                            required
                            disabled={isLoading}
                        ></textarea>
                    </div>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm" role="alert">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md shadow-lg transition duration-300 ease-in-out flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin mr-2" size={20} /> Submitting...
                            </>
                        ) : (
                            <>
                                <Send size={20} /> Submit Feedback
                            </>
                        )}
                    </button>
                </form>
            </section>

            {/* Feedback List Section */}
            <section className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md border border-green-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-green-700">All Feedbacks</h2>
                    <button
                        onClick={fetchFeedbacks}
                        className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-3 py-2 rounded-md transition duration-150 ease-in-out flex items-center space-x-1 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                        <span>Refresh</span>
                    </button>
                </div>

                {isLoading && feedbacks.length === 0 ? (
                    <div className="text-center text-gray-500 py-10 flex flex-col items-center">
                        <Loader2 className="animate-spin text-green-500 mb-2" size={32} />
                        Loading feedbacks...
                    </div>
                ) : feedbacks.length === 0 ? (
                    <p className="text-center text-gray-500 py-10">No feedbacks submitted yet. Be the first!</p>
                ) : (
                    <div className="space-y-4">
                        {feedbacks.map((feedback) => (
                            <div key={feedback._id} className="bg-green-50 p-5 rounded-lg shadow-sm border border-green-100 relative">
                                <h3 className="text-lg font-bold text-gray-800">{feedback.name}</h3>
                                <p className="text-sm text-gray-600 mb-2">{feedback.email}</p>
                                <p className="text-gray-700">{feedback.message}</p>
                                <p className="text-xs text-gray-500 mt-2">
                                    {new Date(feedback.createdAt).toLocaleString()}
                                </p>
                                <button
                                    onClick={() => handleDeleteClick(feedback._id)}
                                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition duration-150 ease-in-out"
                                    title="Delete Feedback"
                                    disabled={isLoading}
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Delete Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center modal-overlay">
                    <div className="bg-white p-8 rounded-lg shadow-xl modal-content max-w-sm w-full relative border-t-4 border-red-500">
                        <h3 className="text-xl font-bold text-red-700 mb-4">Confirm Deletion</h3>
                        <p className="text-gray-700 mb-6">Are you sure you want to delete this feedback? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={cancelDelete}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-150 ease-in-out"
                            >
                                Delete
                            </button>
                        </div>
                        <button
                            onClick={cancelDelete}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors duration-200"
                        >
                            <XCircle size={24} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;

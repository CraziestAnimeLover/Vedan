import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant.js';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar.jsx';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");  // State for displaying validation error
    const [success, setSuccess] = useState(""); // State to handle success message
    const navigate = useNavigate();

    const validateEmail = (email) => {
        // Simple regex for email validation
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");  // Reset any previous error
        setSuccess(""); // Reset previous success message
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;  // Prevent submitting the form if email is invalid
        }
        setLoading(true);

        try {
            const res = await axios.post(
                `www.vedann.com/forgot-password`,  // Ensure this is correct
                { email },
                { headers: { 'Content-Type': "application/json" } }
            );
            

            if (res.data.success) {
                setSuccess(res.data.message);  // Display success message
                setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            // Improved error handling
            const errorMessage = error?.response?.data?.message || "Something went wrong. Please try again later.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <div>
                <Navbar/>
            </div>
        
        <div className="flex items-center justify-center max-w-7xl mx-auto">
            
            <form onSubmit={handleSubmit} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
                <h1 className="font-bold text-2xl mb-5">Forgot Password</h1>

                {/* Display validation error if any */}
                {error && <div className="text-red-500 mb-2">{error}</div>}
                {success && <div className="text-green-500 mb-2">{success}</div>} {/* Success Message */}

                <div className="my-2">
                    <label>Email</label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>

                {loading ? (
                    <Button className="w-full my-4" disabled>
                        Sending...
                    </Button>
                ) : (
                    <Button type="submit" className="w-full my-4">
                        Send Reset Link
                    </Button>
                )}
            </form>
        </div>
        </>
    );
};

export default ForgotPassword;

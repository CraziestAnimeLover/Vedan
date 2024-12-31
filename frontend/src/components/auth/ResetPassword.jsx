import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant.js';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");  // Validation error state
    const navigate = useNavigate();
    const { token } = useParams(); // Token will be passed via the URL

    useEffect(() => {
        if (!token) {
            toast.error("Invalid or expired reset link.");
            navigate("/login");
        }
    }, [token, navigate]);

    const validatePassword = (password) => {
        // Simple password validation (length > 6)
        return password.length >= 6;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset previous error messages

        if (!validatePassword(newPassword)) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post(
                `${USER_API_END_POINT}/reset-password/${token}`, // Use token in URL 
                { token, newPassword },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center max-w-7xl mx-auto">
            <form onSubmit={handleSubmit} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
                <h1 className="font-bold text-2xl mb-5">Reset Password</h1>

                {/* Display validation error if any */}
                {error && <div className="text-red-500 mb-2">{error}</div>}

                <div className="my-2">
                    <label>New Password</label>
                    <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                    />
                </div>

                <div className="my-2">
                    <label>Confirm Password</label>
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                    />
                </div>

                {loading ? (
                    <Button className="w-full my-4" disabled>
                        Resetting...
                    </Button>
                ) : (
                    <Button type="submit" className="w-full my-4">
                        Reset Password
                    </Button>
                )}
            </form>
        </div>
    );
};

export default ResetPassword;

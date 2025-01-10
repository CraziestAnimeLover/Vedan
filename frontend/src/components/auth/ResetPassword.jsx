import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false); // Toggle password visibility
    const navigate = useNavigate();
    const { token } = useParams();

    useEffect(() => {
        if (!token) {
            toast.error("Invalid or expired reset link.");
            navigate("/login");
        }
    }, [token, navigate]);

    const validatePassword = (password) => password.length >= 6;

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

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

            const res = await axios.post(`${USER_API_END_POINT}/reset-password/${token}`, { newPassword });


            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message); // Backend error message
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(errorMessage);
        }
        
    };
    

    return (
        <div className="flex items-center justify-center max-w-7xl mx-auto">
            <form onSubmit={handleSubmit} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
                <h1 className="font-bold text-2xl mb-5">Reset Password</h1>

                {error && <div className="text-red-500 mb-2">{error}</div>}

                <div className="my-2">
                    <label htmlFor="new-password">New Password</label>
                    <div className="relative">
                        <Input
                            id="new-password"
                            type={passwordVisible ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 px-3"
                            aria-label={passwordVisible ? "Hide password" : "Show password"}
                        >
                            {passwordVisible ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                <div className="my-2">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <Input
                        id="confirm-password"
                        type={passwordVisible ? "text" : "password"}
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

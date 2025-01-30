import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant.js'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { setAuthUser, setLoading } from '../../redux/authSlice.js'


const Login = () => {

    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    
    const {loading, user} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
    
        // Validate inputs
        if (!input.email || !input.password) {
            toast.error("Email and password are required.");
            return;
        }
    
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(input.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }
    
        try {
            dispatch(setLoading(true)); // Set loading state
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { 'Content-Type': "application/json" },
                withCredentials: true,  // Add credentials if using cookies for token
            });
    
            if (res.data.success) {
                // Store token securely (e.g., via httpOnly cookie or sessionStorage)
                sessionStorage.setItem('token', res.data.token); // You may want to use sessionStorage instead of localStorage for session-based login
    
                // Dispatch user data to Redux store
                dispatch(setAuthUser(res.data.user));
    
                // Redirect to select page after successful login
                navigate("/select");
    
                // Show success message
                toast.success(res.data.message);
            } else {
                // If success flag is false, handle appropriately
                toast.error(res.data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.log(error);
    
            // Better error handling, check for network errors or response errors
            if (!error.response) {
                toast.error("Network error. Please try again later.");
            } else {
                toast.error(error.response?.data?.message || "An error occurred.");
            }
        } finally {
            dispatch(setLoading(false)); // Reset loading state
        }
    }
    

    useEffect(() => {
        if (user) {
            navigate("/select");
        }
    }, [user, navigate])

  return (
    <div>
        <Navbar />
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                <h1 className='font-bold text-2xl mb-5'>Log In</h1>
                
                <div className='my-2'>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        value={input.email}
                        name="email"
                        onChange={changeEventHandler}
                        placeholder="Vedan@gmail.com"
                    />
                </div>
                
                <div className='my-2'>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        value={input.password}
                        name="password"
                        onChange={changeEventHandler}
                        placeholder="Password"
                    />
                </div>

                {
                    loading ? (
                        <Button className="w-full my-4"> 
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait 
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">Login</Button>
                    )
                }
                
                <span className='text-sm'>
  Don't have an account? 
  <Link to="/register" className='text-blue-600 hover:underline'>
    Sign Up
  </Link>
</span>

                
                {/* Forgot password link */}
                <div className="mt-4 text-center">
                    <Link to="/forgot-password" className='text-blue-600 text-sm'>Forgot Password?</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login

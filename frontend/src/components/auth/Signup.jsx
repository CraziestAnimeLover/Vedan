
import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import myImage from '../../assets/signupback.jpeg';
import CustomCard from './CustomCard';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const phoneRegex = /^\d{10}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    if (!phoneRegex.test(input.phoneNumber)) {
      toast.error('Phone number must be exactly 10 digits.');
      return;
    }
  
    if (!passwordRegex.test(input.password)) {
      toast.error(
        'Password must include at least 8 characters, an uppercase letter, a lowercase letter, a number, and a special character.'
      );
      return;
    }
  
    if (input.password !== input.confirmPassword) {
      toast.error('Password and Confirm Password do not match.');
      return;
    }
  
    const formData = {
      fullname: input.fullname,
      email: input.email,
      phoneNumber: input.phoneNumber,
      password: input.password,
    };
  
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'application/json' }, // Ensure the content type is JSON
        withCredentials: true,
      });
  
      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong.');
    } finally {
      dispatch(setLoading(false));
    }
  };
  

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className='pb-4'>
      <Navbar />
      <div
      className="flex items-end justify-end min-h-screen  pb-2 pe-2 opacity-89"
      style={{
        backgroundImage: `url(${myImage})`, // Only use the image without gradient
        backgroundSize: 'cover', // Ensure the image covers the entire div
        backgroundPosition: 'center', // Center the image
      }}
    >
      <div className='w-full max-w-lg sm:max-w-md  p-1 me-1'> 

      <form
  onSubmit={submitHandler}
  className="w-full max-w-lg sm:max-w-md bg-blue-100 border border-gray-900 mx-3 rounded-md p-4 sm:p-4 p-2 shadow-lg pb-10 mb-10 mt-10 pt-10"
>


          <h1 className="font-bold text-xl sm:text-2xl mb-5 text-center">Sign Up</h1>

          <div className="my-3">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Onlyjobs"
              className="w-full"
            />
          </div>

          <div className="my-3">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="onlyjobs@gmail.com"
              className="w-full"
            />
          </div>

          <div className="my-3">
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="1010101010"
              className="w-full"
            />
          </div>

          <div className="my-3 relative">
            <Label>Password</Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Password"
              className="w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-12 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <div className="my-3 relative">
            <Label>Confirm Password</Label>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              value={input.confirmPassword}
              name="confirmPassword"
              onChange={changeEventHandler}
              placeholder="Confirm Password"
              className="w-full"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-12 right-3 flex items-center text-gray-500 "
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
          )}

          <span className="text-sm text-center block">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
        <CustomCard/>
      </div>
      </div>
    </div>
  );
};

export default Signup;


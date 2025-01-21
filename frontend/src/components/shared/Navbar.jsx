import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { USER_API_END_POINT } from '../../utils/constant.js';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Logo from "../../assets/Vedann.png";
import { setAuthUser } from '../../redux/authSlice.js';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="bg-white  shadow-xl sticky top-0 z-50 ">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-24 p-4 md:p-0 relative">
                {/* Center Section (Logo and Vedann) */}
                <div className="absolute left-0 transform-none md:left-1/2 md:transform -translate-x-1/2 flex items-center gap-2">
                    <img
                        src={Logo}
                        alt="Vedann Logo"
                        className="h-16 w-16 sm:h-20 sm:w-20 cursor-pointer"
                        onClick={() => navigate("/")}
                    />
                    <h1 className="text-3xl sm:text-4xl md:text-7xl font-semibold text-gray-800 cursor-pointer">
                        Vedann
                    </h1>
                </div>

                {/* Right Side (User Avatar and Login/Signup Button) */}
                <div className="ml-auto flex items-center gap-4">
                    <ul className="hidden md:flex font-medium items-center gap-5">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        ) : null}
                    </ul>

                    {/* Conditionally render Login or Signup button */}
                    {!user ? (
                        location.pathname === '/login' ? (
                            <div className='flex items-center gap-2'>
                                {/* <Link to="/register">
                                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Sign Up</Button>
                                </Link> */}
                            </div>
                        ) : (
                            <div className='flex items-center gap-2'>
                                {/* <Link to="/login">
                                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Login</Button>
                                </Link> */}
                            </div>
                        )
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className='flex gap-2 space-y-2'>
                                    <Avatar>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>{user?.fullname}</h4>
                                        <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col my-2 text-gray-600'>
                                    {user && (
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2 />
                                            <Button variant="link">
                                                <Link to="/profile">View Profile</Link>
                                            </Button>
                                        </div>
                                    )}
                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                        <LogOut />
                                        <Button onClick={logoutHandler} variant="link">Logout</Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'; // Assuming Popover components are in ui/popover
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <div className="bg-white rounded-md shadow-xl sticky top-0 z-50">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-20 p-4 md:p-0">
                {/* Center Section (Logo and Vedann) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
          <img
            src={Logo}
            alt="Vedann Logo"
            className="h-20 w-18 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h1 className="text-7xl my-[-1] font-semibold text-gray-800 cursor-pointer">
            Vedann
          </h1>
        </div>

                <div className="ml-auto flex items-center gap-4">
                    <ul className="hidden md:flex font-medium items-center gap-5">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        ) : null}
                    </ul>

                    <div className="md:hidden">
                        <Button
                            className="bg-[#6A38C2] hover:bg-[#5b30a6]"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            Menu
                        </Button>
                    </div>

                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to="/login">
                                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Login</Button>
                            </Link>
                        </div>
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
                                    {user &&  (
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

            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-lg p-4">
                    <ul className="flex flex-col items-center font-medium gap-4">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/sotre">Store</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                                <li><Link to="/newsfeed">NewsFeed</Link></li>
                            </>
                        )}
                        {!user ? (
                            <li>
                                <Link to="/login">
                                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Login</Button>
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;

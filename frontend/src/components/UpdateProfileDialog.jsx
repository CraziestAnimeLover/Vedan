import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Loader2, X } from 'lucide-react';
import { Input } from './ui/input';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { setAuthUser } from '../redux/authSlice';

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  // Initialize state with existing user data
  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.join(', ') || '',  // Skills joined as a string
    profileNumber: user?.profileNumber || '',  // Default to the existing profile number, if any
    handlerName: user?.handlerName || '',  // Default to the existing handler name, if any
    file: null,
});


  const dispatch = useDispatch();

  // Handle input change events
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };



const submitHandler = async (e) => {
    e.preventDefault();

    try {
        dispatch(setLoading(true));
        const res = await axios.put(`${USER_API_END_POINT}/update`, input, {
            headers: { 'Content-Type': "application/json" },
            withCredentials: true,
        });
        if (res.data.success) {
            dispatch(setAuthUser(res.data.user));
            navigate("/profile");
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    } finally {
        dispatch(setLoading(false));
    }
};


  
// To get the token from localStorage
const token = localStorage.getItem('token'); 
console.log('Token from localStorage:', token);

// To get the token from cookies (if it's stored there)
const tokenFromCookies = document.cookie.split('; ').find(row => row.startsWith('token='));
console.log('Token from Cookies:', tokenFromCookies ? tokenFromCookies.split('=')[1] : 'No token in cookies');


  return (
    <div>
      <Dialog open={open} onInteractOutside={() => setOpen(false)}>
        <DialogContent
          className="sm:max-w-[425px]"
          aria-describedby="update-profile-description"
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <button
              type="button"
              className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
            <div id="update-profile-description" className="text-sm">
              Fill in the fields below to update your profile information.
            </div>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              {[ 
                { id: 'fullname', label: 'Name', type: 'text', value: input.fullname },
                { id: 'email', label: 'Email', type: 'email', value: input.email },
                { id: 'phoneNumber', label: 'Phone Number', type: 'tel', value: input.phoneNumber },
                { id: 'bio', label: 'Bio', type: 'text', value: input.bio },
                { id: 'skills', label: 'Skills', type: 'text', value: input.skills },
              ].map(({ id, label, type, value }) => (
                <div key={id} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={id} className="text-right">
                    {label}
                  </Label>
                  <Input
                    id={id}
                    name={id}
                    type={type}
                    value={value}
                    onChange={changeEventHandler}
                    className="col-span-3"
                    required={id !== 'bio' && id !== 'skills'} // Optional fields
                  />
                </div>
              ))}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;

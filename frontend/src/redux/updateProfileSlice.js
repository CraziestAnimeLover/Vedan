import axios from "axios";
import { setAuthUser, setLoading } from "./authSlice";
import { toast } from "sonner";  // Assuming you are using a toast library
import {USER_API_END_POINT} from '../utils/constant.js'

export const updateProfile = (input) => async (dispatch) => {
  try {
    dispatch(setLoading(true));  // Set loading state to true

    const response = await axios.put(`${USER_API_END_POINT}/update-profile`, input, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (response.data.success) {
      dispatch(setAuthUser(response.data.user));  // Dispatch the user data
      toast.success(response.data.message);  // Show success message
    }

    dispatch(setLoading(false));  // Set loading state to false
  } catch (error) {
    console.error(error);
    dispatch(setLoading(false));  // Set loading state to false
    toast.error(error.response?.data?.message || "Something went wrong!");  // Show error message
  }
};

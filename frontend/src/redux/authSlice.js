import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
        token: null, // Add token to the state
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setAuthUser: (state, action) => {
            state.user = action.payload;
        },
        setAuthToken: (state, action) => { // Action to set token
            state.token = action.payload;
        },
        clearAuth: (state) => { // Action to clear the authentication state
            state.loading = false;
            state.user = null;
            state.token = null;
        }
    },
});

export const { setLoading, setAuthUser, setAuthToken, clearAuth } = authSlice.actions;

export default authSlice.reducer;

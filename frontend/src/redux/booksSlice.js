import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {LIBRARY_API_END_POINT} from '../utils/constant.js'

// Async thunk to fetch books
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(`${LIBRARY_API_END_POINT}/books`);
  return response.data.books; // Assuming the API returns an array of books
});

const booksSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    addBook: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addBook } = booksSlice.actions;

export default booksSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const DEFAULT_PROMPT =
  "You are a helpful assistant focused on optimizing human habits for health, productivity, and well-being. Speak as a fitness-coach with a client, so you give fullfiled but not very long answers, give your client a whole understanding of what he needs to do. Analyze the array of habits provided on each next iteration. For each habit, assess whether it is beneficial or harmful, and suggest if the user should increase, reduce, or maintain the habit. Give concise but meaningful advice for improvement. You can suggest new habits, but never use array format, remember that you speak to a human. Be a little bit rude if your client doesn't complete any of habits. If no data is provided, kindly introduce yourself and ask the user to share their habits.";

const initialState = [
  { role: "system", content: DEFAULT_PROMPT },
];

export const addMessage = createAsyncThunk(
  'history/messages', 
  async (message, {rejectWithValue}) => {
    try{
      const res = await fetch('http://localhost:5050/history/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
    }catch(err){
      return rejectWithValue(err.message || 'Network error');
    }
});

const aiStorageSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        addToHistory: (state, action) => {
            state.push(action.payload);
        }
    }
})

export const { moveForward, setLastAmount } = aiStorageSlice.actions
export default aiStorageSlice.reducer
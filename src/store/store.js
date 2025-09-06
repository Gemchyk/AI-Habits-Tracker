import { configureStore, createSlice } from "@reduxjs/toolkit";
import habitsReducer from './habitsSlice.js';
import streakReducer from './streakSlice.js';
import dashboardReducer from './dashboardSlice.js'



const store = configureStore({
    reducer: {
        habits: habitsReducer,
        streak: streakReducer,
        dashboard: dashboardReducer
    }
})


export default store;
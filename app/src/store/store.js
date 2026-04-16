import { configureStore } from "@reduxjs/toolkit";
import aiStorageReducer from './aiStorageslice.js'
import habitsReducer from './habitsSlice.js';
import streakReducer from './streakSlice.js';
import dashboardReducer from './dashboardSlice.js'



const store = configureStore({
    reducer: {
        aiStorage: aiStorageReducer,
        habits: habitsReducer,
        streak: streakReducer,
        dashboard: dashboardReducer
    }
})


export default store;
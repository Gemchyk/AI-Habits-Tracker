import {createSlice, current} from '@reduxjs/toolkit';
import moment from 'moment'
import { differenceInCalendarDays, parseISO } from 'date-fns';

const initialState = {
    streak: 3,
    lastUpdated: '2025-08-10',
    currentDate: null
}

const streakSlice = createSlice({
    name: 'streak',  
    initialState,
    reducers: {
        setStreak: (state) => {
            state.currentDate = moment().format('YYYY-MM-DD');
            const diff = differenceInCalendarDays(state.currentDate, state.lastUpdated,);
            if(diff != 0){
                if(diff === 1){
                    state.lastUpdated = state.currentDate;
                    state.streak++;
                }else{
                    state.streak = 0;
                }
           }
        },
        resetStreak: (state) => {
            state.streak = 0;
        }
        
    }

});

export const {setStreak, resetStreak } = streakSlice.actions;
export default streakSlice.reducer;
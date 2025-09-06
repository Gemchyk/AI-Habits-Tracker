import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setStreak, resetStreak } from './streakSlice';
import { setLastAmount } from './dashboardSlice';



const initialState = {
    habitsData:[
        {
            id: 1,
            name: 'Drink Water',
            description: 'Drink 2 liters of water daily',
            frequency: 'Daily',
            completed: true
        },
        {
            id: 2,
            name: 'Exercise',
            description: '30 minutes of exercise daily',
            frequency: 'Daily',
            completed: false
        },
        {
            id: 3,
            name: 'Read a Book',
            description: 'Read at least 20 pages daily',
            frequency: 'Daily',
            completed: false
        }
    ]
}

export const toggleIsCompletedAndUpdateStreak = createAsyncThunk(
    'habits/toggleIsCompletedAndUpdateStreak',
    async ({ id }, {getState, dispatch}) => {
        dispatch(toggleIsCompleted(id));
        dispatch(setStreak());
        const state = getState().habits.habitsData;
        const payload = state.reduce((acc, cur) => cur.completed ? acc += 1 : acc
        , 0)
        dispatch(setLastAmount(payload));
    }
)


export const resetHabitsAndStreak = createAsyncThunk(
    'habits/resetHabitsAndStreak',
    async (_, {dispatch, getState}) => {
        const state = getState().habits.habitsData;
        const amountOfDoneHabits = 0;
        console.log(state);
        for(let i = 0; i < state.length; i++){
            if(state[i].completed){
               amountOfDoneHabits++;
            }
        }
        if(amountOfDoneHabits < state.length){
            dispatch(resetStreak());
        }
        dispatch(resetHabits());

    }
)


const habitsSlice = createSlice({
    name: 'habits', 
    initialState,
    reducers: {
        addHabit: (state, action) => {
            const newHabit = {
                id: Date.now(),
                name: action.payload.name,
                description: action.payload.description,
                frequency: action.payload.frequency,
                completed: false
            }
            state.habitsData.push(newHabit);
        },
        removeHabit: (state, action) => {
            state.habitsData = state.habitsData.filter(i => i.id !== action.payload);
        },
        toggleIsCompleted: (state, action) => {
            console.log(action.payload);
            state.habitsData = state.habitsData.map(i => i.id !== action.payload ? i : {...i, completed: !i.completed});
        },
        resetHabits: (state) =>{
            state.habitsData = state.habitsData.map(habit => {return {...habit, completed: false}});
        }
    }
});





export const {addHabit, removeHabit, toggleIsCompleted, resetHabits} = habitsSlice.actions;
export default habitsSlice.reducer;
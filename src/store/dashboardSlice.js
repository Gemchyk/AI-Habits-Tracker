import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { name: 'Page A', amount: 1 },
    { name: 'Page B', amount: 1 },
    { name: 'Page C', amount: 1 },
    { name: 'Page D', amount: 1 },
    { name: 'Page E', amount: 1 },
    { name: 'Page F', amount: 1 },
    { name: 'Page G', amount: 1 },
  
];


const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        moveForward: (state, action) => {
            state.shift();
            const date = ((new Date()).getDate()) < 10 ? `0${((new Date()).getDate())}` : ((new Date()).getDate());;
            const month = ((new Date()).getMonth() + 1) < 10 ? `0${((new Date()).getMonth() + 1)}` : ((new Date()).getMonth() + 1);
            const newObj = {
                name: `${date}.${month}`,
                amount: action.payload
            }
            state.push(newObj);
        },
        setLastAmount: (state, action) => {
            state[state.length - 1].amount = action.payload;
        }
    }
})

export const { moveForward, setLastAmount } = dashboardSlice.actions
export default dashboardSlice.reducer
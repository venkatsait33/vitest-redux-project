import { createSlice } from "@reduxjs/toolkit";


export const subscribeSlice = createSlice({
    name: "subscribe",
    initialState: {
        subscribes: []
    },
    reducers: {
        addSubscribe: (state, action) => {
            state.subscribes.push(action.payload)
        },
        deleteSubscriber: (state, action) => {
            const index = action.payload;
            state.subscribes.splice(index, 1);
        },
        clearSubscribers: (state) => {
            state.subscribes = [];
        }
    }
})

export const { addSubscribe, deleteSubscriber, clearSubscribers } = subscribeSlice.actions
export default subscribeSlice.reducer
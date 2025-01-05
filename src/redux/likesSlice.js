import { createSlice } from "@reduxjs/toolkit";

export const likesSlice = createSlice({
    name: "likes",
    initialState: {
        likes: 0,
        dislikes: 0,
    },
    reducers: {
        addLike: (state) => {
            state.likes += 1
        },
        disLike: (state) => {
            state.dislikes += 1
        }
    }
})

export const { addLike, disLike } = likesSlice.actions
export default likesSlice.reducer
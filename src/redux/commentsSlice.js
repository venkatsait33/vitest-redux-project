import { createSlice } from "@reduxjs/toolkit";


export const commentSlice = createSlice({
    name: "comment",
    initialState: {
        comments: []
    },
    reducers: {
        addComment: (state, action) => {
            state.comments.push(action.payload)
        },
        deleteComment: (state, action) => {
            const index = action.payload;
            state.comments.splice(index, 1);

        },

        clearComments: (state) => {
            state.comments = [];
        }
    }
})

export const { addComment, deleteComment, editComments, clearComments } = commentSlice.actions
export default commentSlice.reducer
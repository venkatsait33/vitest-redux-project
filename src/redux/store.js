import { configureStore } from "@reduxjs/toolkit";
import likeReducer from "../redux/likesSlice"
import commentReducer from "../redux/commentsSlice"
import subscribeReducer from "../redux/subscriberSlice"

export const store = configureStore({
    reducer: {
        likes: likeReducer,
        comment: commentReducer,
        subscribe: subscribeReducer
    },
})
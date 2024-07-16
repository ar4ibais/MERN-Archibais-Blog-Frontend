import { configureStore } from "@reduxjs/toolkit";
import postReducer from './slices/posts'
import authReducer from './slices/auth'
import commentReducer from './slices/comments'

const store = configureStore({
    devTools: true,
    reducer: {
        postReducer,
        authReducer,
        commentReducer
    }
})

export default store
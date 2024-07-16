import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchComments = createAsyncThunk('posts/fetchComments', async (postId) => {
    const { data } = await axios.get(`/posts/${postId}/comments`);
    return data;
});

const initialState = {
    status: "loading",
    items: []
}

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchComments.pending]: (state) => {
            state.items = [];
            state.status = 'loading';
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'loaded';
        },
        [fetchComments.rejected]: (state) => {
            state.items = [];
            state.status = 'error';
        },
    }
})

export default commentSlice.reducer
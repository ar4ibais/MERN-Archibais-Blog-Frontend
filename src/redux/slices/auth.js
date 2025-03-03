import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
})

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
    const { data } = await axios.get('/auth/me');
    return data;
})

export const fetchRegister = createAsyncThunk("auth/fetchRegister", async (params) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
})

const initialState = {
    data: null,
    status: "loading"
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: {
        //Авторизация
        [fetchAuth.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuth.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },

        //Идентификация
        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },

        //Регистрация
        [fetchRegister.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchRegister.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
    }
})

export default authSlice.reducer
export const {logout} = authSlice.actions
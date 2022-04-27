import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth_slice",
    initialState: {
        isLogged: false,
        token: null,
        userId: null,
        userName: null,
        error: null,
    },
    reducers: {
        logIn(state, action) {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
            state.isLogged = !!action.payload.token;
            state.error = action.payload.message || null;
        },
        logOut(state) {/*
           clean: [token],
                  [userId],
                  [userName],
                  [isLogged],
        */},
    }
})

export default authSlice.reducer;
export const {
    logIn
} = authSlice.actions;
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth_slice",
    initialState: {
        isLogged: false,
        token: null,
        userId: null,
        userName: null,
        error: null,
        pingStatus: null,
        signInStatus: null
    },
    reducers: {
        logIn(state, action) {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
            state.isLogged = !!action.payload.token;
            state.error = action.payload.message || null;
        },
        ping(state, action) {
            state.pingStatus = action.payload;
        },
        logOut(state, action) {
            state.token = null;
            state.userId = null;
            state.userName = null;
            state.isLogged = false;
            state.pingStatus = action.payload || null;
            state.error = 'logged_out';
        },
        signIn(state, action) {
            state.signInStatus = action.payload
        }

    }
})

export default authSlice.reducer;
export const {
    logIn,
    ping,
    logOut,
    signIn
} = authSlice.actions;
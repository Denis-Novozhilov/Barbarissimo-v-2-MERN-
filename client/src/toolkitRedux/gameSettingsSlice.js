import { createSlice } from "@reduxjs/toolkit";

const gameSettingsSlice = createSlice({
    name: "game_settings_slice",
    initialState: {
        nativeLang: null,
        learnedLang: null,
        phraseSetting: null
    },
    reducers: {
        setGameSettings(state, action){
            state.nativeLang = action.payload.nativeLang;
            state.learnedLang = action.payload.learnedLang;
            state.phraseSetting = action.payload.phraseSetting;
        },
        clearGameSettings(state){
            state.nativeLang = null;
            state.learnedLang = null;
            state.phraseSetting = null;
        }
    }
})

export default gameSettingsSlice.reducer;
export const {
    setGameSettings,
    clearGameSettings
} = gameSettingsSlice.actions;
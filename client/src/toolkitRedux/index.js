import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import toolkitReducer from "./toolkitReducer";
import toolkitSlice from "./toolkitSlice";

const rootReducer = combineReducers({
    toolkit_reducer: toolkitSlice
})

export const store = configureStore({
    reducer: rootReducer,
})



























///////////////////////////////////////////////////////////////////////////////////////////////////

/*
import { createStore, combineReducers, applyMiddleware } from "redux";
import { cashReducer } from "./cashReducer";
import { customerReducer } from "./customerReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    cash_rd: cashReducer
})


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
*/

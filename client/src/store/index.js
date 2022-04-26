import { createStore, combineReducers, applyMiddleware } from "redux";
import { cashReducer } from "./cashReducer";
import { customerReducer } from "./customerReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    cash_rd: cashReducer,
    customer_rd: customerReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
// export const store = createStore(rootReducer, composeWithDevTools({ trace: true }));
// export const store = createStore(rootReducer, composeWithDevTools({ trace: true}));
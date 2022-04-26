const { createReducer, createAction } = require("@reduxjs/toolkit");

const initialState = {
    count: 0,
    todos: ['task_1', 'task_2', 'task_3']
}

export const increment = createAction('INCREMENT');
export const decrement = createAction('DECREMENT');

export default createReducer(
    initialState,
    {
        [increment]: function (state) {
            state.count = state.count + 1
        },
        [decrement]: function (state) {
            state.count = state.count - 1
        },
    }
)


































//////////////////////////////////////////////////////////////////////////////////////////////////////

// const ADD_CASH = "ADD_CASH";
// const GET_CASH = "GET_CASH";

// const defaultState = {
//     cash: 0,
// }

// export const cashReducer = (state = defaultState, action) => {

//     switch (action.type) {
//         case "ADD_CASH":
//             return {
//                 ...state,
//                 cash: state.cash + action.payload
//             }
//         case "GET_CASH":
//             return {
//                 ...state,
//                 cash: state.cash - action.payload
//             }
//         default:
//             return state;
//     }
// }

// export const addCashAction = (payload) => ({ type: "ADD_CASH", payload });
// export const getCashAction = (payload) => ({ type: "GET_CASH", payload });
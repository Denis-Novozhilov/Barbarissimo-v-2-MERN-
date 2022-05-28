// const { createSlice } = require("@reduxjs/toolkit");

// const toolkitSlice = createSlice({
//     name: "toolkit_slice",
//     initialState: {
//         count: 0,
//         todos: ['task_1', 'task_2', 'task_3', 'task_4', 'task_5'],
//         users: [
//             {
//                 name: 'user1',
//                 id: 1
//             },
//             {
//                 name: 'user2',
//                 id: 2
//             }
//         ]
//     },
//     reducers: {
//         increment(state) {
//             state.count = state.count + 1
//         },
//         decrement(state) {
//             state.count = state.count - 1
//         },
//         addTodo(state, action) {
//             if (!state.todos.includes(action.payload)) {
//                 state.todos.push(action.payload)
//             } else {
//                 state.todos.push(`${action.payload}_${Date.now()}`)
//             }
//         },
//         removeLastTodos(state) {
//             state.todos.pop()
//         },
//         removeAllTodos(state) {
//             state.todos = []
//         },
//         downloadUsers(state, action) {
//             state.users.push(...action.payload)
//         },
//         deleteAllUsers(state) {
//             state.users = []
//         }
//     }
// });

// export default toolkitSlice.reducer;
// export const {
//     increment,
//     decrement,
//     addTodo,
//     removeLastTodos,
//     removeAllTodos,
//     downloadUsers,
//     deleteAllUsers
// } = toolkitSlice.actions;
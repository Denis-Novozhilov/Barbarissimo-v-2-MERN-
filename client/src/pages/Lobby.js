import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMockCustomersSlice } from '../asyncActions/customersMockSlice';
import { logInThunk } from '../asyncActions/logInThunk';

import { addTodo, decrement, deleteAllUsers, increment, removeAllTodos, removeLastTodos } from '../toolkitRedux/toolkitSlice';

export const Lobby = () => {

    const count = useSelector(state => state.toolkit_reducer.count)
    const todos = useSelector(state => state.toolkit_reducer.todos)
    const users = useSelector(state => state.toolkit_reducer.users)
    const dispatch = useDispatch();

    return (
        <>
            <h1>Lobby_empty_template_redux/toolkit_test</h1>
            <h3>count: {count}</h3>
            <button
                onClick={() => dispatch(increment())}
            >increment</button>
            <button
                onClick={() => dispatch(decrement())}
            >decrement</button>
            <ul>
                {todos.map((td, id) =>
                    <li key={id * Date.now()}>{td}</li>
                )}
            </ul>
            <button
                onClick={() => dispatch(addTodo(prompt()))}
            >add_toDo</button>
            <button
                onClick={() => dispatch(removeLastTodos())}
            >remove_last_toDo</button>
            <button
                onClick={() => dispatch(removeAllTodos())}
            >remove_all_toDo</button>
            <ul>
                {users.map((user, id) =>
                    <li key={id * Date.now()}>{`${user.name}_${user.id}`}</li>
                    // <li key={id * Date.now()}>{`${user.name}_${user.id}`}</li>
                )}
            </ul>
            <button
                onClick={() => dispatch(fetchMockCustomersSlice())}
            >download_users</button>
            <button
                onClick={() => dispatch(deleteAllUsers())}
            >delete_all_users</button>
        </>
    )
}

// https://www.youtube.com/watch?v=CtrWoX_KDjE
// redux_thunk - get objcts from mongoDB
// redux_toolkit - use in project
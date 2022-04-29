import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMockCustomersSlice } from '../asyncActions/customersMockSlice';
import { STORAGE_AUTHENTICATION } from '../configuration/config';
import { logOut } from '../toolkitRedux/authSlice';
import { v4 as uuidv4 } from 'uuid';
// import { messageSimple } from "../hooks/messageSimple";

import { addTodo, decrement, deleteAllUsers, increment, removeAllTodos, removeLastTodos } from '../toolkitRedux/toolkitSlice';

export const Lobby = () => {

    const [mdbUsers, setMdbUsers] = useState([]);
    console.log(`mdbUsers: ${mdbUsers}`)

    const count = useSelector(state => state.toolkit_reducer.count)
    const todos = useSelector(state => state.toolkit_reducer.todos)
    const users = useSelector(state => state.toolkit_reducer.users)
    const dispatch = useDispatch();


    const logoutHandlerThunk = () => {
        localStorage.removeItem(STORAGE_AUTHENTICATION);
        dispatch(logOut());
    }

    return (
        <>
            <h4>Lobby_empty_template<br />redux/toolkit_test</h4>
            <button
                onClick={() => logoutHandlerThunk()}>
                logOut</button><br />
            <h5>Get_all_app_users_from_mongoDB</h5>
            <ul>
                {mdbUsers && mdbUsers.length > 0 ?
                    mdbUsers.map(user => <li key={uuidv4()}>{user}</li>) :
                    'empty'}
            </ul>
            <button
                onClick={() => setMdbUsers((prev) => {
                    console.log(`prev: ${prev}`)
                    return [...prev, `${uuidv4()}_empty`]
                })}
            >add_random_users</button>
            <button onClick={async () => {
                fetch('api/admin/test')
                    .then(response => response.json())
                    .then(json => {
                        let arr = json.allUsers.map(obj => obj.email.split('@')[0]);
                        setMdbUsers((prev) => [...prev, ...arr])
                    })
            }}
            >get_from_server</button>
            <button onClick={() => setMdbUsers(() => [])}
            >clear_all</button>
            <h5>count: {count}</h5>
            <button
                onClick={() => dispatch(increment())}
            >increment</button>
            <button
                onClick={() => dispatch(decrement())}
            >decrement</button>
            <ul>
                {todos.map((td, id) =>
                    <li key={uuidv4()}>{td}</li>
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
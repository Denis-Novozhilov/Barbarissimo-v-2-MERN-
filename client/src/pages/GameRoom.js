import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMockCustomersSlice } from '../asyncActions/customersMockSlice';
import { CREATE_PHRASE_URL, CREATE_USER_PHRASE, GET_ALL_COMMON_PHRASES_URL, STORAGE_AUTHENTICATION } from '../configuration/config';
import { logOut } from '../toolkitRedux/authSlice';
import { v4 as uuidv4 } from 'uuid';
import { messageSimple } from "../hooks/messageSimple";

import cn from 'classnames';
import s from './GameRoom.module.scss';

import { addTodo, decrement, deleteAllUsers, increment, removeAllTodos, removeLastTodos } from '../toolkitRedux/toolkitSlice';

export const GameRoom = () => {

    const nativeLang = useSelector(state => state.game_settings_reducer.nativeLang);
    const learnedLang = useSelector(state => state.game_settings_reducer.learnedLang);
    const phraseSetting = useSelector(state => state.game_settings_reducer.phraseSetting);


    const [mdbUsers, setMdbUsers] = useState([]);
    const [mdbPhrases, setMdbPhrases] = useState([]);

    // const count = useSelector(state => state.toolkit_reducer.count);
    // const todos = useSelector(state => state.toolkit_reducer.todos);
    // const users = useSelector(state => state.toolkit_reducer.users);

    // task [] add redux auth_reducer with email and improve this variable ↓
    // const userEmail = `${useSelector(state => state.auth_reducer.userName)}@gmail.com`;

    const dispatch = useDispatch();


    const logoutHandlerThunk = () => {
        localStorage.removeItem(STORAGE_AUTHENTICATION);
        dispatch(logOut());
    }



    // task [] DRAFT createUserPhrase
    const createUserPhrase = async () => {
        const phrase = {
            "russian": "russ_value",
            "spanish": "span_value",
            "english": "eng_value",
            "german": "germ_value",
            "additional": "nothing",
            "id": "x_10"
        };
        // const mail = userEmail;
        // const body = JSON.stringify({mail,phrase});
        // const method = "POST";
        // const headers = { "Content-Type": "application/json" };
        // fetch(CREATE_USER_PHRASE, { method, headers, body })
        //     .then(response => response.json())
        //     .then(json => messageSimple(JSON.stringify(json.message)))
    };

    return (
        <>
            <div className={cn(s.container)}>
                <h4>GameRoom_empty_template</h4>
                <h5>nativeLang: {nativeLang}</h5>
                <h5>learnedLang: {learnedLang}</h5>
                <h5>phraseSetting: {phraseSetting}</h5>

                <h4>Create Common Phrase area:</h4>
                <NavLink className={cn(s.common__button)} to="/create-phrase">/create-phrase</NavLink>
                <button className={cn(s.common__button)}
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
                    fetch('api/admin/allusers')
                        .then(response => response.json())
                        .then(json => {
                            let _arr = json.allUsers.map(obj => obj);
                            console.table(_arr);
                            let arr = json.allUsers.map(obj => obj.email.split('@')[0]);
                            setMdbUsers((prev) => [...prev, ...arr])
                        })
                }}
                >get_from_server</button>

                <button onClick={async () => {
                    fetch('api/admin/test')
                        .then(response => response.json())
                        .then(json => {
                            let _arr = Array.isArray(json.allUsers) ? json.allUsers.map(obj => obj) : json.allUsers;
                            console.table(_arr);
                            // let arr = json.allUsers.map(obj => obj.email.split('@')[0]);
                            // setMdbUsers((prev) => [...prev, ...arr])
                        })
                }}
                >get_test_for_user_denmatuha001@gmail.com</button>

                <button onClick={() => setMdbUsers(() => [])}
                >clear_all</button>


                <h5>links:</h5>
                <NavLink to="/create-phrase">/create-phrase</NavLink>
                <NavLink to="/phrases-list">/phrases-list</NavLink>
                <NavLink to="/phrases-detail/115">/phrases-detail/115</NavLink>
                <NavLink to="/phrases-detail">/phrases-detail</NavLink>
                <NavLink to="/">/</NavLink>

                <h5>Phrases</h5>
                <ul>
                    {mdbPhrases && mdbPhrases.length > 0 ?
                        mdbPhrases.map(phrase => <li key={uuidv4()}>{JSON.stringify(phrase)}</li>) :
                        'empty'}
                </ul>
                <button onClick={async () => {
                    fetch(CREATE_PHRASE_URL)
                        .then(response => response.json())
                        .then(json => console.log(JSON.stringify(json)))
                }}
                >create_common_phrase</button>


                <button onClick={async () => {
                    createUserPhrase();
                }}
                >create_USER_phrase</button>


                <button onClick={async () => {
                    fetch(GET_ALL_COMMON_PHRASES_URL)
                        .then(response => response.json())
                        .then(json => {
                            console.log(JSON.stringify(json))
                            let arr = json.allCommonPhrases.map(obj => JSON.stringify(obj));
                            // let arr = json.allCommonPhrases.map(obj => obj.Russian);
                            setMdbPhrases(arr)
                        })
                }}
                >get_all_phrases</button>

                {/* <h5>count: {count}</h5> */}
                <button
                    onClick={() => dispatch(increment())}
                >increment</button>
                <button
                    onClick={() => dispatch(decrement())}
                >decrement</button>
                {/* <ul>
                {todos.map((td, id) =>
                    <li key={uuidv4()}>{td}</li>
                )}
            </ul> */}
                <button
                    onClick={() => dispatch(addTodo(prompt()))}
                >add_toDo</button>
                <button
                    onClick={() => dispatch(removeLastTodos())}
                >remove_last_toDo</button>
                <button
                    onClick={() => dispatch(removeAllTodos())}
                >remove_all_toDo</button>
                {/* <ul>
                {users.map((user, id) =>
                    <li key={id * Date.now()}>{`${user.name}_${user.id}`}</li>
                )}
            </ul> */}
                <button
                    onClick={() => dispatch(fetchMockCustomersSlice())}
                >download_users</button>
                <button
                    onClick={() => dispatch(deleteAllUsers())}
                >delete_all_users</button>
            </div>
        </>
    )
}

// https://www.youtube.com/watch?v=CtrWoX_KDjE
// redux_thunk - get objcts from mongoDB
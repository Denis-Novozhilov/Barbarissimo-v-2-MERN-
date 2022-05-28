import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_USER_PHRASE, STORAGE_AUTHENTICATION } from '../configuration/config';
import { logOut } from '../toolkitRedux/authSlice';
import { v4 as uuidv4 } from 'uuid';
import { messageSimple } from "../hooks/messageSimple";
import cn from 'classnames';
import s from './Lobby.module.css'

// import { addTodo, decrement, deleteAllUsers, increment, removeAllTodos, removeLastTodos } from '../toolkitRedux/toolkitSlice';

export const Lobby = () => {

    const userName = useSelector(state => state.auth_reducer.userName);
    const [mdbUsers, setMdbUsers] = useState([]);
    const wheelFieldset = useRef();

    const dispatch = useDispatch();

    const logoutHandlerThunk = () => {
        localStorage.removeItem(STORAGE_AUTHENTICATION);
        dispatch(logOut());
    }

    let counterWheelControl = 0;
    let timerA = (new Date()).getTime();
    const wheelControlHandler = (e) => {

        let timerB = (new Date()).getTime();

        if (((timerB - timerA)/1000) < 0.3) {
            return
        };

        e.target.style.display = 'none';
        const subElem = document.elementFromPoint(e.clientX,e.clientY)
        subElem.click();
        e.target.style.display = 'block';
        e.target.dataset.direction === 'up' ?
        counterWheelControl++ :
        counterWheelControl-- ;
        [...wheelFieldset.current.childNodes].forEach(elem => elem.style.transform = `perspective(300px) rotateX(calc(35deg*${counterWheelControl} + var(--anglP))) translateZ(50px)`);

        timerA = (new Date()).getTime();
    }

    return (
        <>
            <div className={cn(s.container)}>
                <h1>{userName}</h1>

                <br></br>
                <div className={cn(s.wheel__container)}>
                        <div
                            data-direction="down"
                            onClick={wheelControlHandler}
                            className={cn(s.wheel__controll, s.wheel__controll_up)}>
                        </div>
                        <div
                            data-direction="up"
                            onClick={wheelControlHandler}
                            className={cn(s.wheel__controll, s.wheel__controll_down)}>
                        </div>
                    <fieldset 
                        ref={wheelFieldset}
                        className={cn(s.wheel)}>

                        <label
                            className={cn(s.wheel__item, s.wheel__item_1)}
                            style={{
                                "--i": 1,
                                "--anglP": "calc((135deg) * var(--i))",
                                transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                            }}
                            htmlFor="eng_1">
                            <span>English__1</span>
                            <input type="radio" id="eng_1" name="lang_input" value="" />
                        </label>

                        <label
                            className={cn(s.wheel__item, s.wheel__item_2)}
                            style={{
                                "--i": 2,
                                "--anglP": "calc((135deg) * var(--i))",
                                transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                            }}
                            htmlFor="ger_1">
                            <span>German__2</span>
                            <input type="radio" id="ger_1" name="lang_input" value="" />
                        </label>

                        <label
                            className={cn(s.wheel__item, s.wheel__item_3)}
                            style={{
                                "--i": 3,
                                "--anglP": "calc((135deg) * var(--i))",
                                transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                            }}
                            htmlFor="rus_1">
                            <span>Russian__3</span>
                            <input type="radio" id="rus_1" name="lang_input" value="" />
                        </label>

                        <label
                            className={cn(s.wheel__item, s.wheel__item_4)}
                            style={{
                                "--i": 4,
                                "--anglP": "calc((135deg) * var(--i))",
                                transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                            }}
                            htmlFor="spa_1">
                            <span>Spanish__4</span>
                            <input type="radio" id="spa_1" name="lang_input" value="" />
                        </label>

                        <label
                            className={cn(s.wheel__item, s.wheel__item_5)}
                            style={{
                                "--i": 5,
                                "--anglP": "calc((135deg) * var(--i))",
                                transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                            }}
                            htmlFor="eng_2">
                            <span>English__5</span>
                            <input type="radio" id="eng_2" name="lang_input" value="" />
                        </label>

                        <label
                            className={cn(s.wheel__item, s.wheel__item_6)}
                            style={{
                                "--i": 6,
                                "--anglP": "calc((135deg) * var(--i))",
                                transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                            }}
                            htmlFor="ger_2">
                            <span>German__6</span>
                            <input type="radio" id="ger_2" name="lang_input" value="" />
                        </label>

                        <label
                            className={cn(s.wheel__item, s.wheel__item_7)}
                            style={{
                                "--i": 7,
                                "--anglP": "calc((135deg) * var(--i))",
                                transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                            }}
                            htmlFor="rus_2">
                            <span>Russian__7</span>
                            <input type="radio" id="rus_2" name="lang_input" value="" />
                        </label>

                        <label
                            className={cn(s.wheel__item, s.wheel__item_8)}
                            style={{
                                "--i": 8,
                                "--anglP": "calc((135deg) * var(--i))",
                                transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                            }}
                            htmlFor="spa_2">
                            <span>Spanish__8</span>
                            <input type="radio" id="spa_2" name="lang_input" value="" />
                        </label>
                    </fieldset>
                </div>
                <br></br>


                <label htmlFor="langQuestion">
                    <span>language of Question</span>
                    <select name="langQuestion" id="langQuestion">
                        <option value="English" selected={true}>English</option>
                        <option value="German">German</option>
                        <option value="Russian">Russian</option>
                        <option value="Spanish">Spanish</option>
                    </select>
                </label>
                <label htmlFor="langAnswer">
                    <span>language of Answer</span>
                    <select name="langAnswer" id="langAnswer">
                        <option value="English">English</option>
                        <option value="German" selected={true}>German</option>
                        <option value="Russian">Russian</option>
                        <option value="Spanish">Spanish</option>
                    </select>
                </label>

                <button className={cn(s.common__button)}
                    disabled>
                    Start new Game
                </button>
                <button className={cn(s.common__button)}>
                    Create new Phrases Set
                </button>


                <button className={cn(s.common__button)}
                    onClick={() => logoutHandlerThunk()}>
                    logOut</button><br />
                <h5>Get_all_app_users_from_mongoDB</h5>
                <ul>
                    {mdbUsers && mdbUsers.length > 0 ?
                        mdbUsers.map(user => <li key={uuidv4()}>{user}</li>) :
                        'empty'}
                </ul>
                <button className={cn(s.common__button)}
                    onClick={() => setMdbUsers((prev) => {
                        return [...prev, `${uuidv4()}_empty`]
                    })}
                >add_random_users</button>

                <button className={cn(s.common__button)}
                    onClick={async () => {
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


                {/* <h5>links:</h5>
                <NavLink className={cn(s.common__button)} to="/create-phrase">/create-phrase</NavLink>
                <NavLink className={cn(s.common__button)} to="/phrases-list">/phrases-list</NavLink>
                <NavLink className={cn(s.common__button)} to="/phrases-detail/115">/phrases-detail/115</NavLink>
                <NavLink className={cn(s.common__button)} to="/phrases-detail">/phrases-detail</NavLink>
                <NavLink className={cn(s.common__button)} to="/">/</NavLink> */}
            </div>
        </>
    )
}
import React, { useState, useEffect, useContext, useRef } from 'react';
import cn from 'classnames';
import s from './AuthPage.module.css'
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

// Clean Imports

import { useDispatch, useSelector } from 'react-redux';
import { logInThunk } from '../asyncActions/logInThunk';
import { pingThunk } from '../asyncActions/pingThunk';
import { STORAGE_AUTHENTICATION } from '../configuration/config';
import { signInThunk } from '../asyncActions/signInThunk';


// export const messageHandlerX = (m) => {
//     // let message = useMessage();
//     // console.log(`messageHandlerX`);
//     // console.log(`${m}`);
//     window.M.toast({ html: m })
//     // return m;
// }

export const AuthPage = () => {

    // Clean consts

    const logedStatus = useSelector(state => state.auth_reducer.isLogged);
    const pingStatus = useSelector(state => state.auth_reducer.pingStatus);
    const errorStatus = useSelector(state => state.auth_reducer.error);

    const signInStatus = useSelector(state => state.auth_reducer.signInStatus);

    const dispatch = useDispatch();

    const inputEmail = useRef();
    const inputPassword = useRef();

    // const auth = useContext(AuthContext);

    const message = useMessage();

    // const { loading, request, error, clearError } = useHttp();

    // const [form, setForm] = useState({ email: '', password: '' });


    // CLEAN ping function ↓
    useEffect(() => {
        window.M && window.M.updateTextFields();

        // write external fn PING ↓
        const data = JSON.parse(localStorage.getItem(STORAGE_AUTHENTICATION))
        if (data && data.token) {
            const bodyReq = JSON.stringify({ token: data.token });
            dispatch(pingThunk(bodyReq, data));
        }

    }, []);

    // const changeHandler = event => {
    //     setForm({ ...form, [event.target.name]: event.target.value })
    // }

    // const registerHandler = async () => {
    //     try {
    //         const data = await request("api/auth/register", "POST", { ...form });
    //         message(data.message);
    //         message(`wait...`);
    //         setTimeout(() => { loginHandler() }, 3000)
    //     } catch (error) {
    //         console.log(`Error:`, error.message);
    //         message(error);
    //     }
    // };

    // const loginHandler = async () => {
    //     try {
    //         const data = await request('api/auth/login', 'POST', { ...form });
    //         auth.login(data.token, data.userId);
    //     } catch (error) {
    //         console.log(`Error:`, error.message);
    //         message(error);
    //     }
    // };
    // const requestBody = JSON.stringify({email:"qwerty123@gmail.com",password:"12345678zxzcxcz"});

    const loginHandlerThunk = async () => {
        const requestBody = JSON.stringify({ [inputEmail.current.name]: inputEmail.current.value, [inputPassword.current.name]: inputPassword.current.value });
        dispatch(logInThunk(requestBody));
    };

    const signInHandlerThunk = async () => {
        const requestBody = JSON.stringify({ [inputEmail.current.name]: inputEmail.current.value, [inputPassword.current.name]: inputPassword.current.value });
        dispatch(signInThunk(requestBody));
        // const {message} = dispatch( await signInThunk(requestBody));
        // message(`${JSON.stringify(signInStatus)}`);
        // setTimeout(() => message('Wellcome'), 500)
    }



    //  clean up
    const messageHandler = () => {
        message('asdas');
        message(`${signInStatus}`);
    }

    return (
        <div>
            <h4>Wellcome to Barbarissimo v2</h4>
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <div>
                        TEST_LOGIN <br />
                        <input ref={inputEmail} type="text" name="email" defaultValue="" />
                        <input ref={inputPassword} type="password" name="password" defaultValue="" />

                        <button
                            onClick={() => loginHandlerThunk()}>
                            login</button><br />
                        <button
                            onClick={() => signInHandlerThunk()}>
                            Sign In</button><br />
                        <button
                            onClick={() => messageHandler()}>
                            write message</button><br />
                        logedStatus <br />
                        {`${logedStatus}`}<br />
                        pingStatus <br />
                        {`${JSON.stringify(pingStatus)}`}<br />
                        {/* </div> */}
                    </div>
                </div>
            </div>

            <h5>Authorization</h5>
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title">Login or Sign Up</span>
                    <div>
                        <div className="input-field">
                            {/* <input
                                placeholder="email"
                                id="email"
                                type="text"
                                className="validate"
                                name="email"
                                onChange={changeHandler}
                            /> */}
                            <label htmlFor="email">First Name</label>
                        </div>
                        <div className="input-field">
                            {/* <input
                                placeholder="password"
                                id="password"
                                type="password"
                                className="validate"
                                name="password"
                                onChange={changeHandler}
                            /> */}
                            <label htmlFor="password">First Name</label>
                        </div>
                    </div>
                </div>
                {/* <div className="card-action">
                    <button
                        className={cn("btn lightgreen darken-4", s.margin_0_10)}
                        onClick={loginHandler}
                        disabled={loading}
                    >
                        Login
                    </button>
                    <button
                        className={cn("btn lightgreen darken", s.margin_0_10)}
                        onClick={registerHandler}
                        disabled={loading}
                    >
                        Sign Up
                    </button>
                </div> */}
            </div>
        </div >
    );
};
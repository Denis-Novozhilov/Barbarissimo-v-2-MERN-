import React, { useEffect, useRef } from 'react';
// import cn from 'classnames';
// import s from './AuthPage.module.css'

import { useDispatch, useSelector } from 'react-redux';
import { logInThunk } from '../asyncActions/logInThunk';
import { pingThunk } from '../asyncActions/pingThunk';
import { STORAGE_AUTHENTICATION } from '../configuration/config';
import { signInThunk } from '../asyncActions/signInThunk';

export const AuthPage = () => {

    const logedStatus = useSelector(state => state.auth_reducer.isLogged);
    const pingStatus = useSelector(state => state.auth_reducer.pingStatus);
    const dispatch = useDispatch();
    const inputEmail = useRef();
    const inputPassword = useRef();

    useEffect(() => {
        window.M && window.M.updateTextFields();
        pingAuth();
    });

    const pingAuth = () => {
        const data = JSON.parse(localStorage.getItem(STORAGE_AUTHENTICATION))
        if (data && data.token) {
            const bodyReq = JSON.stringify({ token: data.token });
            dispatch(pingThunk(bodyReq, data));
        }
    };

    const loginHandlerThunk = async () => {
        const requestBody = JSON.stringify({ [inputEmail.current.name]: inputEmail.current.value, [inputPassword.current.name]: inputPassword.current.value });
        dispatch(logInThunk(requestBody));
    };

    const signInHandlerThunk = async () => {
        const requestBody = JSON.stringify({ [inputEmail.current.name]: inputEmail.current.value, [inputPassword.current.name]: inputPassword.current.value });
        dispatch(signInThunk(requestBody));
    };

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

                        logedStatus <br />
                        {`${logedStatus}`}<br />
                        pingStatus <br />
                        {`${JSON.stringify(pingStatus)}`}<br />
                    </div>
                </div>
            </div>
        </div >
    );
};
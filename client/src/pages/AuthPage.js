import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import s from './AuthNSignUp.module.css'

import { useDispatch } from 'react-redux';
import { logInThunk } from '../asyncActions/logInThunk';
import { pingThunk } from '../asyncActions/pingThunk';
import { STORAGE_AUTHENTICATION } from '../configuration/config';
import { NavLink } from 'react-router-dom';

export const AuthPage = () => {

    const dispatch = useDispatch();
    const inputEmail = useRef();
    const inputPassword = useRef();
    const authForm = useRef();

    useEffect(() => {
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

    return (
        <div className={cn(s.container)}>
            <h1 className={cn(s.header__main)}>Barbarissimo</h1>
            <div className={cn(s.form__wrapper)}>
                <h2 className={cn(s.form__header)}>LogIn or SignUp</h2>
                <form ref={authForm} id="authForm">
                    <div className={cn(s.form__inp_wrapper)}>
                        <label htmlFor="emailInputId">
                            <span>
                                email
                            </span>
                            <input required className={cn(s.form__input)} ref={inputEmail} type="text" name="email" id="emailInputId" defaultValue="" placeholder="email" />
                        </label>
                        <label htmlFor="passwordInputId">
                            <span>
                                password
                            </span>
                            <input required className={cn(s.form__input)} ref={inputPassword} type="password" name="password" id="passwordInputId" defaultValue="" placeholder="password" />
                        </label>
                    </div>

                    <div className={cn(s.form__btn_wrapper)}>
                        <button
                            className={cn(s.form__button)}
                            onClick={(e) => {
                                e.preventDefault();
                                authForm.current.checkValidity() ? loginHandlerThunk() : authForm.current.reportValidity();
                            }}>
                            logIn</button>
                        <NavLink className={cn(s.form__button, s.form__button_unfilled)} to="/signup">
                            SignUp
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
};
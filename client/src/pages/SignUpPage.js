import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import s from './AuthNSignUp.module.css'

import { useDispatch, useSelector } from 'react-redux';
import { logInThunk } from '../asyncActions/logInThunk';
import { pingThunk } from '../asyncActions/pingThunk';
import { STORAGE_AUTHENTICATION } from '../configuration/config';
import { signUpThunk } from '../asyncActions/signUpThunk';
import { NavLink } from 'react-router-dom';

export const SignUpPage = () => {

    const dispatch = useDispatch();
    const inputName = useRef();
    const inputEmail = useRef();
    const inputPassword = useRef();
    const authForm = useRef();

    const signInHandlerThunk = async () => {
        const requestBody = JSON.stringify({ nick: inputName.current.value, email: inputEmail.current.value, password: inputPassword.current.value });
        console.log(requestBody)
        dispatch(signUpThunk(requestBody));
    };

    return (
        <div className={cn(s.container)}>
            <h1 className={cn(s.header__main)}>Barbarissimo</h1>
            <div className={cn(s.form__wrapper)}>
                <h2 className={cn(s.form__header)}>Create new account<br></br>Signing Up</h2>
                <form ref={authForm} id="authForm">
                    <div className={cn(s.form__inp_wrapper)}>
                        <label htmlFor="nickNameInputId">
                            <span>
                                nickname
                            </span>
                            <input required className={cn(s.form__input)} ref={inputName} type="text" name="nickName" id="nickNameInputId" defaultValue="" placeholder="nickname" autoComplete="off" maxlength="20" />
                        </label>
                        <label htmlFor="emailInputId">
                            <span>
                                email
                            </span>
                            <input required className={cn(s.form__input)} ref={inputEmail} type="text" name="email" id="emailInputId" defaultValue="" placeholder="login" autoComplete="off" />
                        </label>
                        <label htmlFor="passwordInputId">
                            <span>
                                password
                            </span>
                            <input required className={cn(s.form__input)} ref={inputPassword} type="password" name="password" id="passwordInputId" defaultValue="" placeholder="password" autoComplete="off" />
                        </label>
                    </div>

                    <div className={cn(s.form__btn_wrapper)}>
                        <button
                            className={cn(s.form__button)}
                            onClick={(e) => {
                                e.preventDefault();
                                authForm.current.checkValidity() ? signInHandlerThunk() : authForm.current.reportValidity();
                            }}>
                            SignUp
                        </button>
                        <NavLink className={cn(s.form__button, s.form__button_unfilled)} to="/">
                            ← Back to LogIn
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
};
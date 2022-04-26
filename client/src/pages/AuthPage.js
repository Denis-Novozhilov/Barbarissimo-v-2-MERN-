import React, { useState, useEffect, useContext } from 'react';
import cn from 'classnames';
import s from './AuthPage.module.css'
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {

    const auth = useContext(AuthContext)

    const message = useMessage();

    const { loading, request, error, clearError } = useHttp();

    const [form, setForm] = useState({ email: '', password: '' });

    // useEffect(() => {
    //     message(error);
    //     clearError();
    // }, [error, message, clearError]);

    useEffect(() => {
        window.M && window.M.updateTextFields()
    }, []);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request("api/auth/register", "POST", { ...form });
            message(data.message);
            message(`wait...`);
            setTimeout(() => { loginHandler() }, 3000)
        } catch (error) {
            console.log(`Error:`,error.message);
            message(error);
        }
    };

    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', 'POST', { ...form });
            auth.login(data.token, data.userId);
        } catch (error) {
            console.log(`Error:`,error.message);
            message(error);
        }
    };

    return (
        <div>
            <h1>Wellcome to Barbarissimo v2</h1>
            <h2>Authorization</h2>
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title">Login or Sign Up</span>
                    <div>
                        <div className="input-field">
                            <input
                                placeholder="email"
                                id="email"
                                type="text"
                                className="validate"
                                name="email"
                                onChange={changeHandler}
                            />
                            <label htmlFor="email">First Name</label>
                        </div>
                        <div className="input-field">
                            <input
                                placeholder="password"
                                id="password"
                                type="password"
                                className="validate"
                                name="password"
                                onChange={changeHandler}
                            />
                            <label htmlFor="password">First Name</label>
                        </div>
                    </div>
                </div>
                <div className="card-action">
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
                </div>
            </div>
        </div>
    );
};
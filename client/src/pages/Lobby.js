import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_USER_PHRASE, STORAGE_AUTHENTICATION, STORAGE_GAME_LANGUAGE_SETTINGS } from '../configuration/config';
import { logOut } from '../toolkitRedux/authSlice';
import { v4 as uuidv4 } from 'uuid';
import { messageSimple } from "../hooks/messageSimple";
import cn from 'classnames';
import s from './Lobby.module.css'
import { setGameSettings } from '../toolkitRedux/gameSettingsSlice';

// import { addTodo, decrement, deleteAllUsers, increment, removeAllTodos, removeLastTodos } from '../toolkitRedux/toolkitSlice';

export const Lobby = () => {

    const userName = useSelector(state => state.auth_reducer.userName);

    const [mdbUsers, setMdbUsers] = useState([]);

    const langForm = useRef();
    let dataF = new FormData(langForm.current);
    const nativeLang = useRef("none");
    const learnedLang = useRef("none");
    const validity = useRef(false);
    const [validityState, setValidityState] = useState(false);
    // const [nativeLangState, setNativeLangState] = useState(`${dataF.get('lang_native')}`);
    const [nativeLangState, setNativeLangState] = useState(`eng`);

    // wheel's variables
    const counterWheel1 = useRef(0);
    const counterWheel2 = useRef(0);
    const wheelFieldset1 = useRef();
    const wheelFieldset2 = useRef();
    const touchStartY = useRef(0);
    const touchEndY = useRef(0);
    const wheelElemChilds = useRef([]);

    // scrollBlock for ClearTimeout
    const scrollBlockTimeout = useRef({});

    const history = useHistory();

    const dispatch = useDispatch();

    const logoutHandlerThunk = () => {
        localStorage.removeItem(STORAGE_AUTHENTICATION);
        dispatch(logOut());
    }

    const startGame = () => {
        dataF = new FormData(langForm.current);
        const nativeLang = dataF.get('lang_native');
        const learnedLang = dataF.get('lang_learned');
        const phraseSetting = dataF.get('phrase_setting');

        if (nativeLang && learnedLang && phraseSetting) {

            const settings = {nativeLang, learnedLang, phraseSetting};
            console.log('settings',settings)
            dispatch(setGameSettings(settings))

            // localStorage.setItem(STORAGE_AUTHENTICATION, JSON.stringify({
            localStorage.setItem(STORAGE_GAME_LANGUAGE_SETTINGS, JSON.stringify({
                nativeLang,
                learnedLang,
                phraseSetting
            }));
            
            history.push("/game-room");

        } else {
            messageSimple('choose right settings');
            messageSimple('something wrong');
        }
    }



    const wheelRotate = (wheelN, direction, wheelElem, counterDelta) => {

        const counterVar = wheelN === 1 ?
            counterWheel1 :
            counterWheel2;

        counterVar.current = direction === "up" ?
            counterVar.current + counterDelta :
            counterVar.current - counterDelta;

        wheelElem.forEach(elem => elem.style.transform = `perspective(300px) rotateX(calc(35deg*${counterVar.current} + var(--anglP))) translateZ(50px)`);
    }

    let timerA = (new Date()).getTime();

    const wheelClickHandler = (e) => {
        // timer init
        let timerB = (new Date()).getTime();
        if (((timerB - timerA) / 1000) < 0.3) {
            return
        };

        const transitClick = () => {
            e.target.style.display = 'none';
            const subElem = document.elementFromPoint(e.clientX, e.clientY);
            subElem.click();
            e.target.style.display = 'block';
        }

        if (e.target.dataset.role && e.target.dataset.role === "wheel_1_conroller") {
            const wheel = [...wheelFieldset1.current.childNodes];
            transitClick(e, e.target);
            wheelRotate(1, e.target.dataset.direction, wheel, 1);
        } else if (e.target.dataset.role && e.target.dataset.role === "wheel_2_conroller") {
            const wheel = [...wheelFieldset2.current.childNodes];
            transitClick(e, e.target);
            wheelRotate(2, e.target.dataset.direction, wheel, 1);
        }

        timerA = (new Date()).getTime();
    }


    const isNative = (lang) => nativeLangState === lang;

    const onChangeHandler = (e) => {

        dataF = new FormData(langForm.current);

        nativeLang.current = `${dataF.get('lang_native')}`;
        setNativeLangState(nativeLang.current);
        learnedLang.current = `${dataF.get('lang_learned')}`;

        if (nativeLang.current === learnedLang.current) {
            validity.current = false;
            setValidityState(validity.current);
        } else if (nativeLang.current !== 'null' && learnedLang.current !== 'null') {
            validity.current = langForm.current.checkValidity();
            setValidityState(validity.current);
        }
    }


    const initialWheelRotate = (wheel, degValue, delayInit = 0, delaySecond = 0) => {
        setTimeout(() => {
            [...wheel.childNodes].forEach(elem => elem.style.transform = `perspective(300px) rotateX(calc(${degValue}deg + var(--anglP))) translateZ(50px)`);
            setTimeout(() => {
                [...wheel.childNodes].forEach(elem => elem.style.transform = `perspective(300px) rotateX(calc(-${degValue}deg + var(--anglP))) translateZ(50px)`);
            }, delaySecond)
        }, delayInit)
    }


    const touchHandler = (e) => {
        
        if (e.nativeEvent.pointerType && e.nativeEvent.pointerType === "touch") {
            blockScrollForSec();
        }

        e.persist();

        const e_type = e.nativeEvent.type;

        if (e_type === 'click') {
            wheelClickHandler(e);
        }

        if (e_type === 'touchstart') {


            wheelElemChilds.current = e.target.dataset.identity === "wheel_1" ?
                [...wheelFieldset1.current.childNodes] :
                [...wheelFieldset2.current.childNodes];

            touchStartY.current = Math.floor([...e.nativeEvent.changedTouches][0].clientY);
        }

        if (e_type === 'touchend') {

            let timerB = (new Date()).getTime();
            if (((timerB - timerA) / 1000) < 0.3) {
                return
            };

            touchEndY.current = Math.floor([...e.nativeEvent.changedTouches][0].clientY);

            let deltaY = touchStartY.current - touchEndY.current;
            let rotateDirection = deltaY >= 0 ? "up" : "down";
            deltaY = Math.abs(deltaY);
            let inertia = 0;

            if (13 > deltaY) {

                if (e.target.dataset.role && e.target.dataset.role === "wheel_1_conroller") {
                    rotateDirection = e.target.dataset.direction;
                    inertia = 1;
                    e.target.style.display = 'none';
                    const subElem = document.elementFromPoint([...e.changedTouches][0].clientX, [...e.changedTouches][0].clientY);
                    subElem.click();
                    e.target.style.display = 'block';
                } else if (e.target.dataset.role && e.target.dataset.role === "wheel_2_conroller") {
                    rotateDirection = e.target.dataset.direction;
                    inertia = 1;
                    e.target.style.display = 'none';
                    const subElem = document.elementFromPoint([...e.changedTouches][0].clientX, [...e.changedTouches][0].clientY);
                    subElem.click();
                    e.target.style.display = 'block';
                } else {
                    inertia = 0;
                }

            } else if ((13 <= deltaY) && (deltaY <= 30)) {

                inertia = 2;

            } else if ((30 < deltaY) && (deltaY <= 60)) {

                inertia = 3;

            } else if ((60 < deltaY) && (deltaY <= 100)) {

                inertia = 5;

            } else if (100 < deltaY) {

                inertia = 7;

            }

            const wheelN = e.target.dataset.identity === "wheel_1" ? 1 : 2;

            wheelRotate(wheelN, rotateDirection, wheelElemChilds.current, inertia);

            timerA = (new Date()).getTime();
        }
    }


    const blockScrollForSec = () => {

        if (JSON.stringify(scrollBlockTimeout.current) !== '{}') {
            clearTimeout(scrollBlockTimeout.current);
        }

        const resetScrollTimeout = setTimeout(() => {
            document.body.classList.remove(s.blocked_scroll);
        }, 1500);

        scrollBlockTimeout.current = resetScrollTimeout;
        
        document.body.classList.add(s.blocked_scroll);
    }

    useEffect(() => {

        const data = JSON.parse(localStorage.getItem(STORAGE_GAME_LANGUAGE_SETTINGS));

        if (data) {
            history.push("/game-room");
        }

        initialWheelRotate(wheelFieldset1.current, 40, 600, 600);
        initialWheelRotate(wheelFieldset2.current, 40, 600, 600);
    }, [])

    return (
        <>
            <div className={cn(s.container)}>
                <h1 className={cn(s.lobby__header)}>{userName}</h1>



                <form
                    onChange={onChangeHandler}
                    id="langFormID"
                    ref={langForm}
                    className={cn(s.wheel_form)}>

                    {/* WHEEL 1 */}
                    <h2 className={cn(s.lobby__header_sub2)}>native laguage:</h2>
                    <div data-identity="wheel_1"
                        onClick={touchHandler}
                        onTouchStart={touchHandler}
                        onTouchEnd={touchHandler}
                        onTouchMove={blockScrollForSec}
                        className={cn(s.wheel__container)}>
                        <div
                            data-identity="wheel_1"
                            data-role="wheel_1_conroller"
                            data-direction="down"
                            className={cn(s.wheel__controll, s.wheel__controll_up)}>
                        </div>
                        <div
                            data-identity="wheel_1"
                            data-role="wheel_1_conroller"
                            data-direction="up"
                            className={cn(s.wheel__controll, s.wheel__controll_down)}>
                        </div>

                        <fieldset
                            data-identity="wheel_1"
                            name="fieldset_1"
                            form="langFormID"
                            ref={wheelFieldset1}
                            className={cn(s.wheel)}>

                            <label
                                data-identity="wheel_1"
                                className={cn(s.wheel__item, s.wheel__item_1)}
                                style={{
                                    "--i": 1,
                                    "--anglP": "calc((135deg) * var(--i))",
                                    transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                                }}
                                htmlFor="rus_1_1">
                                <input data-identity="wheel_1" type="radio" value="rus" id="rus_1_1" name="lang_native" />
                                <span className={cn(s.wheel__item_text)} data-identity="wheel_1">Russian</span>
                            </label>

                            <label
                                data-identity="wheel_1"
                                className={cn(s.wheel__item, s.wheel__item_2)}
                                style={{
                                    "--i": 2,
                                    "--anglP": "calc((135deg) * var(--i))",
                                    transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                                }}
                                htmlFor="ger_1_1">
                                <input data-identity="wheel_1" type="radio" value="ger" id="ger_1_1" name="lang_native" />
                                <span className={cn(s.wheel__item_text)} data-identity="wheel_1">German</span>
                            </label>

                            <label data-identity="wheel_1"
                                className={cn(s.wheel__item, s.wheel__item_3)}
                                style={{
                                    "--i": 3,
                                    "--anglP": "calc((135deg) * var(--i))",
                                    transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                                }}
                                htmlFor="eng_1_1">
                                <input required data-identity="wheel_1" type="radio" value="eng" id="eng_1_1" name="lang_native" defaultChecked />
                                <span className={cn(s.wheel__item_text)} data-identity="wheel_1">English</span>
                            </label>

                            <label data-identity="wheel_1"
                                className={cn(s.wheel__item, s.wheel__item_4)}
                                style={{
                                    "--i": 4,
                                    "--anglP": "calc((135deg) * var(--i))",
                                    transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                                }}
                                htmlFor="spa_1_1">
                                <input data-identity="wheel_1" type="radio" value="spa" id="spa_1_1" name="lang_native" />
                                <span className={cn(s.wheel__item_text)} data-identity="wheel_1">Spanish</span>
                            </label>

                            <label data-identity="wheel_1"
                                className={cn(s.wheel__item, s.wheel__item_5)}
                                style={{
                                    "--i": 5,
                                    "--anglP": "calc((135deg) * var(--i))",
                                    transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                                }}
                                htmlFor="rus_1_2">
                                <input data-identity="wheel_1" type="radio" value="rus" id="rus_1_2" name="lang_native" />
                                <span className={cn(s.wheel__item_text)} data-identity="wheel_1">Russian</span>
                            </label>

                            <label data-identity="wheel_1"
                                className={cn(s.wheel__item, s.wheel__item_6)}
                                style={{
                                    "--i": 6,
                                    "--anglP": "calc((135deg) * var(--i))",
                                    transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                                }}
                                htmlFor="ger_1_2">
                                <input data-identity="wheel_1" type="radio" value="ger" id="ger_1_2" name="lang_native" />
                                <span className={cn(s.wheel__item_text)} data-identity="wheel_1">German</span>
                            </label>

                            <label data-identity="wheel_1"
                                className={cn(s.wheel__item, s.wheel__item_7)}
                                style={{
                                    "--i": 7,
                                    "--anglP": "calc((135deg) * var(--i))",
                                    transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                                }}
                                htmlFor="eng_1_2">
                                <input data-identity="wheel_1" type="radio" value="eng" id="eng_1_2" name="lang_native" />
                                <span className={cn(s.wheel__item_text)} data-identity="wheel_1">English</span>

                            </label>

                            <label data-identity="wheel_1"
                                className={cn(s.wheel__item, s.wheel__item_8)}
                                style={{
                                    "--i": 8,
                                    "--anglP": "calc((135deg) * var(--i))",
                                    transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                                }}
                                htmlFor="spa_1_2">
                                <input data-identity="wheel_1" type="radio" value="spa" id="spa_1_2" name="lang_native" />
                                <span className={cn(s.wheel__item_text)} data-identity="wheel_1">Spanish</span>
                            </label>
                        </fieldset>
                    </div>


                    {/* WHEEL 2 */}
                    <h2 className={cn(s.lobby__header_sub2)}>learned laguage:</h2>
                    <div data-identity="wheel_2"
                        onClick={touchHandler}
                        onTouchStart={touchHandler}
                        onTouchEnd={touchHandler}
                        onTouchMove={blockScrollForSec}
                        className={cn(s.wheel__container)}>

                        <div data-identity="wheel_2"
                            data-role="wheel_2_conroller"
                            data-direction="down"
                            className={cn(s.wheel__controll, s.wheel__controll_up)}>
                        </div>
                        <div data-identity="wheel_2"
                            data-role="wheel_2_conroller"
                            data-direction="up"
                            className={cn(s.wheel__controll, s.wheel__controll_down)}>
                        </div>

                        <fieldset data-identity="wheel_2"
                            name="fieldset_2"
                            form="langFormID"
                            ref={wheelFieldset2}
                            className={cn(s.wheel)}>

                            <label data-identity="wheel_2"
                                className={cn(s.wheel__item, { [s.wheel__item_disabled]: isNative('rus') }, s.wheel__item_1)}
                                style={{
                                    "--i": 1,
                                    "--anglP": "calc((135deg) * var(--i))",
                                    transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                                }}
                                htmlFor="rus_2_1">
                                <input data-identity="wheel_2"
                                    type="radio"
                                    value="rus"
                                    id="rus_2_1"
                                    name="lang_learned"
                                    disabled={isNative('rus')} />
                                <span className={cn(s.wheel__item_text)}
                                    data-identity="wheel_2">Russian</span>
                            </label>

                            <label data-identity="wheel_2"
                                className={cn(s.wheel__item, { [s.wheel__item_disabled]: isNative('ger') }, s.wheel__item_2)}
                                style={{
                                    "--i": 2,
                                    "--anglP": "calc((135deg) * var(--i))",
                                    transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                                }}
                                htmlFor="ger_2_1">
                                <input data-identity="wheel_2"
                                    type="radio"
                                    value="ger"
                                    id="ger_2_1"
                                    name="lang_learned"
                                    disabled={isNative('ger')} />
                                <span className={cn(s.wheel__item_text)}
                                    data-identity="wheel_2">German</span>
                            </label>

                            <label data-identity="wheel_2"
                                className={cn(s.wheel__item, { [s.wheel__item_disabled]: isNative('eng') }, s.wheel__item_3)}
                                style={{
                                    "--i": 3,
                                    "--anglP": "calc((135deg) * var(--i))",
                                    transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                                }}
                                htmlFor="eng_2_1">
                                <input
                                    required
                                    data-identity="wheel_2"
                                    type="radio"
                                    value="eng"
                                    id="eng_2_1"
                                    name="lang_learned"
                                    disabled={isNative('eng')} />
                                <span className={cn(s.wheel__item_text)}
                                    data-identity="wheel_2">English</span>

                            </label>

                            <label data-identity="wheel_2"
                                className={cn(s.wheel__item, { [s.wheel__item_disabled]: isNative('spa') }, s.wheel__item_4)}
                                style={{
                                    "--i": 4,
                                    "--anglP": "calc((135deg) * var(--i))",
                                    transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                                }}
                                htmlFor="spa_2_1">
                                <input data-identity="wheel_2"
                                    type="radio"
                                    value="spa"
                                    id="spa_2_1"
                                    name="lang_learned"
                                    disabled={isNative('spa')} />
                                <span className={cn(s.wheel__item_text)}
                                    data-identity="wheel_2">Spanish</span>
                            </label>

                            <label data-identity="wheel_2"
                                className={cn(s.wheel__item, { [s.wheel__item_disabled]: isNative('rus') }, s.wheel__item_5)}
                                style={{
                                    "--i": 5,
                                    "--anglP": "calc((135deg) * var(--i))",
                                    transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                                }}
                                htmlFor="rus_2_2">
                                <input data-identity="wheel_2"
                                    type="radio"
                                    value="rus"
                                    id="rus_2_2"
                                    name="lang_learned"
                                    disabled={isNative('rus')} />
                                <span className={cn(s.wheel__item_text)}
                                    data-identity="wheel_2">Russian</span>
                            </label>

                            <label data-identity="wheel_2"
                                className={cn(s.wheel__item, { [s.wheel__item_disabled]: isNative('ger') }, s.wheel__item_6)}
                                style={{
                                    "--i": 6,
                                    "--anglP": "calc((135deg) * var(--i))",
                                    transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                                }}
                                htmlFor="ger_2_2">
                                <input data-identity="wheel_2"
                                    type="radio"
                                    value="ger"
                                    id="ger_2_2"
                                    name="lang_learned"
                                    disabled={isNative('ger')} />
                                <span className={cn(s.wheel__item_text)}
                                    data-identity="wheel_2">German</span>
                            </label>

                            <label data-identity="wheel_2"
                                className={cn(s.wheel__item, { [s.wheel__item_disabled]: isNative('eng') }, s.wheel__item_7)}
                                style={{
                                    "--i": 7,
                                    "--anglP": "calc((135deg) * var(--i))",
                                    transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                                }}
                                htmlFor="eng_2_2">
                                <input data-identity="wheel_2"
                                    type="radio"
                                    value="eng"
                                    id="eng_2_2"
                                    name="lang_learned"
                                    disabled={isNative('eng')} />
                                <span className={cn(s.wheel__item_text)}
                                    data-identity="wheel_2">English</span>

                            </label>

                            <label data-identity="wheel_2"
                                className={cn(s.wheel__item, { [s.wheel__item_disabled]: isNative('spa') }, s.wheel__item_8)}
                                style={{
                                    "--i": 8,
                                    "--anglP": "calc((135deg) * var(--i))",
                                    transform: `perspective(300px) rotateX(calc(135deg * var(--i))) translateZ(50px)`
                                }}
                                htmlFor="spa_2_2">
                                <input data-identity="wheel_2"
                                    type="radio"
                                    value="spa"
                                    id="spa_2_2"
                                    name="lang_learned"
                                    disabled={isNative('spa')} />
                                <span className={cn(s.wheel__item_text)}
                                    data-identity="wheel_2">Spanish</span>
                            </label>
                        </fieldset>
                    </div>

                    <h2 className={cn(s.lobby__header_sub2)}>include phrases:</h2>
                    <fieldset className={cn(s.fieldset_sub)}>
                        <label htmlFor="phrase_setting_1">
                            <input
                                type="radio"
                                name="phrase_setting"
                                id="phrase_setting_1"
                                value="common" defaultChecked />
                            <div className={cn(s.fieldset_sub__item)}>
                                <span>common</span>
                            </div>
                        </label>
                        <label htmlFor="phrase_setting_2">
                            <input
                                type="radio"
                                name="phrase_setting"
                                id="phrase_setting_2"
                                value="my_own" />
                            <div className={cn(s.fieldset_sub__item)}>
                                <span>my&nbsp;own</span>
                            </div>
                        </label>
                        <label htmlFor="phrase_setting_3">
                            <input
                                type="radio"
                                name="phrase_setting"
                                id="phrase_setting_3"
                                value="all" />
                            <div className={cn(s.fieldset_sub__item)}>
                                <span>all</span>
                            </div>
                        </label>
                    </fieldset>
                </form>
                
                <button className={cn(s.common__button)}
                    disabled={!validityState}
                    onClick={startGame}>
                    Start new Game
                </button>

                <button className={cn(s.common__button)}
                    onClick={() => logoutHandlerThunk()}>
                    logOut
                </button>


                {/* <button className={cn(s.common__button)}>
                    Create new Phrases Set
                </button>

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
                >get_from_server</button> */}


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
import React, { useRef } from 'react';
import cn from 'classnames';
import s from './Common.module.scss';
import s2 from './CreateGame.module.scss';
import { createCommonPhrase } from '../asyncActions/createCommonPhrase';
import { messageSimple } from '../hooks/messageSimple';

export const CreatePhrase = () => {

    const commonForm = useRef();
    const inputEng = useRef();
    const inputGer = useRef();
    const inputRus = useRef();
    const inputSpa = useRef();

    const createPhraseHandler = () => {
        const phrase = JSON.stringify({
            [inputEng.current.name]: inputEng.current.value,
            [inputGer.current.name]: inputGer.current.value,
            [inputRus.current.name]: inputRus.current.value,
            [inputSpa.current.name]: inputSpa.current.value
        });
        try {
            createCommonPhrase(phrase);
        } catch (error) {
            messageSimple(error);
        }
        // commonForm.current.reset();
    }

    return (
        <>
            <div className={cn(s.container, s2.container)}>
                <h2>Create common phrase</h2>
                <form className={cn(s2.form)} ref={commonForm}>
                    <input required className={cn(s2.form__input)} ref={inputEng} type="text" name="english" defaultValue="" placeholder="english variant" />
                    <input required className={cn(s2.form__input)} ref={inputGer} type="text" name="german" defaultValue="" placeholder="german variant" />
                    <input required className={cn(s2.form__input)} ref={inputRus} type="text" name="russian" defaultValue="" placeholder="russian variant" />
                    <input required className={cn(s2.form__input)} ref={inputSpa} type="text" name="spanish" defaultValue="" placeholder="spanish variant" />
                </form>
                <button className={cn(s.common__button , s2.common__button)}
                    onClick={createPhraseHandler}
                >create</button>
            </div>
        </>
    );
};



import cn from 'classnames';
import s from '../pages/Common.module.scss';

export const messageSimple = (text) => {

    const createFilledElem = (tag = 'div', classes = [], txtContent = '') => {
        let element = document.createElement(tag);
        element.classList.add(...classes);
        txtContent && (element.textContent = txtContent);
        return element
    }
    const deleteElemWithDelay = (elem, delay = 500) => {
        setTimeout(() => { 
            elem.classList.add('anim-remove') 
            setTimeout(() => {
                elem.remove()
             }, delay+200)
         }, delay)
    };

    if (document.querySelector("#popUpWrapper")) {
       
        // const popUp = createFilledElem('p', ['popup_common', 'anim-show'], text);
        const popUp = createFilledElem('p', [s.popup_common, s.anim_show], text);
        deleteElemWithDelay(popUp, 3000);
        
        document.querySelector("#popUpWrapper").prepend(popUp);

    } else {

        // const popUpWrapper = createFilledElem('div', ['popup_common-wrapper']);
        const popUpWrapper = createFilledElem('div', [s.popup_common_wrapper]);

        popUpWrapper.id = "popUpWrapper";
        document.body.prepend(popUpWrapper);

        const popUp = createFilledElem('p', [s.popup_common, s.anim_show], text);
        deleteElemWithDelay(popUp, 3000);
        popUpWrapper.prepend(popUp);
    }
    // deleteElemWithDelay(popUp, 3000);
}

// [] improve classes work and naming sn s ang clg - common.scss
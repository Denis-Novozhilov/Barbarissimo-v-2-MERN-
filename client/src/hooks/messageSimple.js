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
       
        const popUp = createFilledElem('p', ['popup_common', 'anim-show'], text);
        deleteElemWithDelay(popUp, 3000);
        
        document.querySelector("#popUpWrapper").prepend(popUp);

    } else {

        const popUpWrapper = createFilledElem('div', ['popup_common-wrapper']);

        popUpWrapper.id = "popUpWrapper";
        document.body.prepend(popUpWrapper);

        const popUp = createFilledElem('p', ['popup_common', 'anim-show'], text);
        deleteElemWithDelay(popUp, 3000);
        popUpWrapper.prepend(popUp);
    }
}
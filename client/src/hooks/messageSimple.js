export const messageSimple = (text) => {
    if (window.M && text) {
        window.M.toast({ html: text })
    }
}
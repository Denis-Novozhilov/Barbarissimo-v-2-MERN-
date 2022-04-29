import { REGISTRATION_URL } from "../configuration/config";
import { messageSimple } from "../hooks/messageSimple";
import { signIn } from "../toolkitRedux/authSlice";
import { logInThunk } from "./logInThunk";

export const signInThunk = (body) => {

    const method = "POST";
    const headers = { "Content-Type": "application/json" };

    return function (dispatch) {
        fetch(REGISTRATION_URL, { method, body, headers })
            .then(response => response.json())
            .then(json => {
                dispatch(signIn(json));
                messageSimple(JSON.stringify(json.message))
                if (json.status === 'ok') {
                    messageSimple('Logging in...')
                    setTimeout(() => dispatch(logInThunk(body)), 2000)
                }
            })
    }
};
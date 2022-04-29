import { REGISTRATION_URL } from "../configuration/config";
import { messageSimple } from "../hooks/messageSimple";
import { messageHandlerX } from "../pages/AuthPage";
import { signIn } from "../toolkitRedux/authSlice";
import { logInThunk } from "./logInThunk";

export const signInThunk = (body) => {

    const method = "POST";
    const headers = { ["Content-Type"]: "application/json" };

    return function (dispatch) {
        fetch(REGISTRATION_URL, { method, body, headers })
            .then(response => response.json())
            .then(json => {
                dispatch(signIn(json));
                if (json.status === 'ok') {
                    messageSimple(JSON.stringify(json.message))
                    setTimeout(() => dispatch(logInThunk(body)), 4000)
                } else {
                    messageSimple(JSON.stringify(json.message))
                }
            })
    }
};

/* json_VARIANT_ERROR_1
 {
    "errors":[
        {
            "msg":"Email is not correct",
            "param":"email",
            "location":"body"
        },
        {
            "msg":"Min password length - 6 symbols",
            "param":"password",
            "location":"body"
        }],
    "message":"Authentication error."
}
*/

/*
REGISTRATION_URL

const registerHandler = async () => {
    try {
        const data = await request("api/auth/register", "POST", { ...form });
        message(data.message);
        message(`wait...`);
        setTimeout(() => { loginHandler() }, 3000)
    } catch (error) {
        console.log(`Error:`, error.message);
        message(error);
    }
};
*/
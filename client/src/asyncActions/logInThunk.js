import { LOGIN_URL, STORAGE_AUTHENTICATION } from "../configuration/config";
import { messageSimple } from "../hooks/messageSimple";
import { logIn } from "../toolkitRedux/authSlice";

const method = "POST";
const headers = { "Content-Type": "application/json" };

export const logInThunk = (body) => {

    return function (dispatch) {
        fetch(LOGIN_URL, { method, body, headers })
            .then(response => response.json())
            .then(json => {
                localStorage.setItem(STORAGE_AUTHENTICATION, JSON.stringify({
                    token: json.token,
                    userId: json.userId,
                    userName: json.userName
                }));
                // messageSimple(json.message);
                console.dir(json)
                messageSimple(`Wellcome ${json.userName}`);
                dispatch(logIn(json));
            })
    }
};
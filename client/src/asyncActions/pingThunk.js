import { PING_URL } from "../configuration/config";
import { logIn, logOut, ping } from "../toolkitRedux/authSlice";

export const pingThunk = (body, prewData) => {

    const method = "POST";
    const headers = { "Content-Type": "application/json" };

    return function (dispatch) {
        fetch(PING_URL, { method, body, headers })
            .then(response => response.json())
            .then(json => {
                dispatch(ping(json))
                json.tokenStatus === "ok" ?
                    dispatch(logIn(prewData)) :
                    dispatch(logOut(json))
            })
    }
}
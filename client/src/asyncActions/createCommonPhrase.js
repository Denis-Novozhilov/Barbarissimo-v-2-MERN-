import { CREATE_COMMON_PHRASE_URL } from "../configuration/config";
import { messageSimple } from "../hooks/messageSimple";

const method = "POST";
const headers = { "Content-Type": "application/json" };

export const createCommonPhrase = (body) => {
    try {
        fetch(CREATE_COMMON_PHRASE_URL, { method, body, headers })
        .then(response => response.json())
        .then(json => {
            console.log(`CREATE_COMMON_PHRASE_URL`)
            console.dir(json)
            if (json.status !== 'ok') {
                throw new Error(json.message)
            } else {
                messageSimple(json.message)
            }

        });
    } catch (error) {
        throw new Error(error.message)
    }
};
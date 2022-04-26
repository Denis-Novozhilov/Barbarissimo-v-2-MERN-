import { downloadUsers } from "../toolkitRedux/toolkitSlice"

export const fetchMockCustomersSlice = () => {
    return function (dispatch) {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => dispatch(downloadUsers(json)))
    }
}
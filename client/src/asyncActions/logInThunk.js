import { logIn } from "../toolkitRedux/authSlice";

export const logInThunk = (url, method, body, headers) => {
    return function (dispatch) {
        fetch(url, { method, body, headers })
            .then(response => response.json())
            .then(json => dispatch(logIn(json)))
    }
}

// {
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…EyOX0.TA3FipHurnItGbWjtqWJuxgxej9r7F7idxQ5Vk9cPdw', 
//     userId: '6252bb3b95e63898efbe7aff', 
//     message: 'Wellcome denmatuha3.'
// }

// export const logInThunk = () => {
//     return function (dispatch) {
//         fetch('https://jsonplaceholder.typicode.com/users')
//             .then(response => response.json())
//             .then(json => dispatch(logIn(json)))
//     }
// }

// import action
// ~magic~
// dispatch json
// at App component render Logged status
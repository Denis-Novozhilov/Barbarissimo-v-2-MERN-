import { addManyCustomersAction } from "../store/customerReducer"

export const fetchMockCustomers = () => {
    return function (dispatch) {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => dispatch(addManyCustomersAction(json)))
    }
}

// import action
// ~magic~
// dispatch json
// at App component render Logged status
const defaultState = {
    customers: [
        {
            name: 'user1',
            id: 1650881046054
        },
        {
            name: 'user2',
            id: 1650881051813
        },
        {
            name: 'user3',
            id: 1650881056113
        },
    ],
}

const ADD_CUSTOMER = "ADD_CUSTOMER";
const REMOVE_CUSTOMER = "REMOVE_CUSTOMER";
const DELETE_ALL_CUSTOMERS = "DELETE_ALL_CUSTOMERS";

export const customerReducer = (state = defaultState, action) => {

    switch (action.type) {
        case ADD_CUSTOMER:
            return { ...state, customers: [...state.customers, action.payload] }
        case REMOVE_CUSTOMER:
            return { ...state, customers: state.customers.filter(customer => customer.id !== action.payload) }
        case DELETE_ALL_CUSTOMERS:
            return { ...state, customers: [] }
        default:
            return state;
    }
}

export const addCustomerAction = (payload) => ({ type: ADD_CUSTOMER, payload });
export const removeCustomerAction = (payload) => ({ type: REMOVE_CUSTOMER, payload });
export const deleteAllCustomersAction = () => ({ type: DELETE_ALL_CUSTOMERS });
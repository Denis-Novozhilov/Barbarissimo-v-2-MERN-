import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMockCustomersSlice } from '../asyncActions/customersMockSlice';
import { addTodo, decrement, deleteAllUsers, increment, removeAllTodos, removeLastTodos } from '../toolkitRedux/toolkitSlice';

// import { decrement, increment } from '../toolkitRedux/toolkitReducer';

export const Lobby = () => {

    const count = useSelector(state => state.toolkit_reducer.count)
    const todos = useSelector(state => state.toolkit_reducer.todos)
    const users = useSelector(state => state.toolkit_reducer.users)
    const dispatch = useDispatch();

    return (
        <>
            <h1>Lobby_empty_template_redux/toolkit_test</h1>
            <h3>count: {count}</h3>
            <button
                onClick={() => dispatch(increment())}
            >increment</button>
            <button
                onClick={() => dispatch(decrement())}
            >decrement</button>
            <ul>
                {todos.map((td, id) =>
                    <li key={id * Date.now()}>{td}</li>
                )}
            </ul>
            <button
                onClick={() => dispatch(addTodo(prompt()))}
            >add_toDo</button>
            <button
                onClick={() => dispatch(removeLastTodos())}
            >remove_last_toDo</button>
            <button
                onClick={() => dispatch(removeAllTodos())}
            >remove_all_toDo</button>
            <ul>
                {users.map((user, id) =>
                    <li key={id * Date.now()}>{`${user.name}_${user.id}`}</li>
                    // <li key={id * Date.now()}>{`${user.name}_${user.id}`}</li>
                )}
            </ul>
            <button
                onClick={() => dispatch(fetchMockCustomersSlice())}
            >download_users</button>
            <button
                onClick={() => dispatch(deleteAllUsers())}
            >delete_all_users</button>
        </>
    )
}

// import React, { useContext, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMockCustomers } from '../asyncActions/customersMock';
// import { AuthContext } from '../context/AuthContext';
// import { addCashAction, getCashAction } from '../store/cashReducer';
// import { addCustomerAction, deleteAllCustomersAction, removeCustomerAction } from '../store/customerReducer';

// export const Lobby = () => {

//     // !*
//     const dispatch = useDispatch();
//     const cash = useSelector(state => state.cash_rd.cash);
//     const customers = useSelector(state => state.customer_rd.customers);

//     const auth = useContext(AuthContext);

//     // {
//     //     //console.log(`auth `, auth)
//     // }

//     // !*
//     // const addCash = (csh) => {
//     //     console.log(`addCash ${typeof csh}, ${csh}`);
//     //     dispatch({ type: "ADD_CASH", payload: csh });
//     // }
//     // const getCash = (csh) => {
//     //     console.log(`getCash ${typeof csh}, ${csh}`);
//     //     dispatch({ type: "GET_CASH", payload: csh })
//     // }

//     const addCash = (csh) => dispatch(addCashAction(csh));

//     const getCash = (csh) => dispatch(getCashAction(csh));

//     const addCustomer = (name) => {
//         const customer = {
//             name,
//             id: Date.now(),
//         }
//         dispatch(addCustomerAction(customer));
//     }

//     const removeCustomer = (customer) => {
//         dispatch(removeCustomerAction(customer.id));
//     }
//     const deleteAllCustomers = () => {
//         dispatch(deleteAllCustomersAction());
//     }

//     const inputEl1 = useRef(null);
//     const inputEl2 = useRef(null);

//     return (
//         <div>
//             <h1>Lobby</h1>
//             <button
//                 onClick={auth.logout}
//             >Logout</button>
//             <hr />
//             <div>
//                 <h5>cash from lobby <b>[{cash}]</b></h5>
//             </div>
//             <div>

//                 <input ref={inputEl1} type="number" name="addCash" defaultValue="5" min="0" max="100" />

//                 <button
//                     onClick={() => { addCash(+inputEl1.current.value) }}
//                 // onClick={() => { dispatch(addCashAction(+inputEl1.current.value)) }}
//                 >add_cash</button>

//                 <input ref={inputEl2} type="number" name="getCash" defaultValue="5" min="0" max="100" />

//                 <button
//                     onClick={() => { getCash(+inputEl2.current.value) }}
//                 // onClick={() => { dispatch(getCashAction(+inputEl2.current.value)) }}
//                 >get_cash</button>

//             </div>
//             <div>
//                 <hr />
//                 {customers.length > 0 ?
//                     <div>
//                         {customers.map(c => <div>
//                             <b>{c.name}</b>_____{c.id}_____
//                             <button
//                                 onClick={() => { removeCustomer(c) }}
//                             >delete</button>
//                         </div>)}
//                     </div>
//                     :
//                     <div>
//                         Clints list is empty
//                     </div>
//                 }
//                 <button
//                     onClick={() => { addCustomer(prompt()) }}
//                 >add_customer</button>
//                 <button
//                     onClick={deleteAllCustomers}
//                 >delete_all_customers</button>
//                 <button
//                     onClick={() => dispatch(fetchMockCustomers())}
//                 >add_MOCK_customers</button>
//             </div>
//         </div>
//     );
// };

// https://www.youtube.com/watch?v=CtrWoX_KDjE
// redux_thunk - get objcts from mongoDB
// redux_toolkit - use in project
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';



export const Lobby = () => {

    const auth = useContext(AuthContext);

    console.log(`auth `,auth);

    return (
        <div>
            <h1>Lobby</h1>
            <button
                onClick={auth.logout}
            >Logout</button>
        </div>
    );
};
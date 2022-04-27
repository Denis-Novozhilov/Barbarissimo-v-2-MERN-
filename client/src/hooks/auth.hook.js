import { useState, useCallback, useEffect } from 'react';
import { useHttp } from './http.hook';

const storageName = 'userData';
// write to store and to storage

export const useAuth = () => {

    const { request } = useHttp();

    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);
    const [userId, setUserId] = useState(null);

    const ping = useCallback(async (token) => {
        try {
            const tokenStatus = await request("api/auth/ping", "POST", { token });
            console.table(tokenStatus);
            return tokenStatus;
            // return true;
        } catch (e) {
            console.log(`e.message →`, e.message);
            logout();
            return false;
        }
    },[]);

const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(storageName, JSON.stringify({
        userId: id, token: jwtToken
    }));
}, []);


const logout = useCallback(() => {
    localStorage.removeItem(storageName);
    setToken(null);
    setUserId(null);
}, []);


useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data && data.token) {
            ping(data.token);
            login(data.token, data.userId);
    }
    setReady(true);
}, [login]);

return { login, logout, token, userId, ready , ping};
}
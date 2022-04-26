// import React from 'react';
import React, { useMemo, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import s from './outline.module.css';
import { AuthContext } from './context/AuthContext';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import 'materialize-css';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';


function App() {

  const dispatch = useDispatch();

  // !* ALL useEffect, useState - map thrue useSelector from defaultStore
  // const cash = useSelector(state => state.cash_R.cash);
  // console.log(`
  
  // CASH - ${cash}
  // `)

  const { token, login, logout, userId, ping } = useAuth();

  const isAuthenticated = !!token;

  // const isAuthenticated = ping(token);
  // const isAuthenticated = true;


  // useEffect(() => {
  // const isAuthenticated = useMemo(() => !!token);
  // }, [token]);

  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated }}>
      <Router>
        {/* <div className={cn("container")}> */}
        <div className={cn("container", "hoverable", "z-depth-2", s.outlineRed)}>
          {
            console.log(`
  
              APP
              isAuthenticated - ${isAuthenticated}

          `)}
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

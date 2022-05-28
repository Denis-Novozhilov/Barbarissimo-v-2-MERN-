import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
// import s from './outline.module.css';
import { useRoutes } from './routes';
import 'materialize-css';
import cn from 'classnames';

function App() {

  const logedStatus = useSelector(state => state.auth_reducer.isLogged);
  const isAuthenticated = logedStatus;
  const routes = useRoutes(isAuthenticated);

  return (
      <Router>
        <div className={cn()}>
          {routes}
        </div>
      </Router>
  );
}

export default App;

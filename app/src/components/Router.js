import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';
import LoginPage from '../Router/LoginPage';

const AppRouter = ({ init, logged, setLogged, setJwt }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            logged ? (
              <Main setJwt={setJwt} setLogged={setLogged} />
            ) : (
              <LoginPage setJwt={setJwt} setLogged={setLogged} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;

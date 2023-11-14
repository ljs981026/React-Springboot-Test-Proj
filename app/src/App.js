import './App.css';
import Login from './components/Login.js';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Top from './components/Top.js';
import SignUp from './components/SignUp.js';
import Main from './components/Main.js';
import { useState } from 'react';

function App() {
  const [logged, setLogged] = useState(false);

  const test = () => {
    setLogged(true);
  };

  console.log(logged);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {logged ? (
            <Route path="/" element={<Main />} />
          ) : (
            <Route path="/" element={<Login test={test} />} />
          )}
          <Route path="/join" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

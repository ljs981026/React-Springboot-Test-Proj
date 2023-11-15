import React, { useState } from 'react';
import Login from '../components/Login';
import { Button } from 'react-bootstrap';
import '../style/loginPage.css';
import Top from '../components/Top';
import SignUp from '../components/SignUp';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setJwt, setLogged }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(true);
  return (
    <>
      <Top name={form ? '로그인' : '회원가입'} />
      <div className="Form_Box">
        {form ? (
          <Login setJwt={setJwt} setLogged={setLogged} setForm={setForm} />
        ) : (
          <SignUp setJwt={setJwt} setLogged={setLogged} setForm={setForm} />
        )}
      </div>
    </>
  );
}

export default LoginPage;

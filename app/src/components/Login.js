import React, { useState } from 'react';
import Top from './Top';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

function Login({ setLogged, setJwt, setForm }) {
  const [logInfo, setLogInfo] = useState({ memberId: '', password: '' });
  const navigate = useNavigate();
  const val_chk = (e) => {
    console.log('dh');
    e.preventDefault();
    if (logInfo.memberId == '') {
      alert('아이디를 입력해주세요');
      return false;
    }
    if (logInfo.password == '') {
      alert('비밀번호를 입력해주세요.');
      return false;
    }
    login_chk();
  };

  const login_chk = async () => {
    try {
      const req = await axios.post('/api/member/login', logInfo);
      console.log(req.data);
      if (req.data) {
        alert('로그인 성공');
        window.localStorage.setItem('accessToken', req.data.accessToken);
        window.localStorage.setItem('refreshToken', req.data.refreshToken);
        setJwt({ accessToken: req.data.accessToken, refreshToken: req.data.refreshToken });
        setLogged(true);
      } else {
        alert('로그인 실패');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isToken = async () => {
    try {
      const req = await axios.post('/api/member/token', null, {
        // headers: {
        //   Authorization: window.localStorage.getItem('jwt_token'),
        // },
        params: {
          token: window.localStorage.getItem('accessToken'),
        },
      });
      console.log(req.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login_form">
      <Form onSubmit={val_chk}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label>ID</Form.Label>
          <Col>
            <Form.Control
              type="text"
              value={logInfo.memberId}
              onChange={(e) => setLogInfo({ ...logInfo, memberId: e.target.value })}
            />
          </Col>
          <Form.Label>PW</Form.Label>
          <Col>
            <Form.Control
              type="password"
              value={logInfo.password}
              onChange={(e) => setLogInfo({ ...logInfo, password: e.target.value })}
            />
          </Col>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="secondary" type="submit" size="lg" block>
            LOGIN
          </Button>
          <Button
            variant="secondary"
            onClick={(e) => {
              setForm(false);
            }}
            size="lg"
            block
          >
            SIGNUP
          </Button>
        </div>
      </Form>

      {/* <button onClick={isToken}>토큰확인</button> */}
    </div>
  );
}

export default Login;

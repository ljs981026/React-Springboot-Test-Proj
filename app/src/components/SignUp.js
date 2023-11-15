import axios from 'axios';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Top from './Top';
import { Button, Col, Form, Row } from 'react-bootstrap';

function SignUp({ setForm }) {
  const [user, setUser] = useState({
    email: '',
    nickName: '',
    memberId: '',
    password: '',
    roles: [],
  });

  const [pw2, setPw2] = useState('');

  const [isDup, setIsDup] = useState(false);

  const info = {
    email: '이메일',
    nickName: '이름',
    memberId: '아이디',
    password: '패스워드',
    roles: '권한',
  };

  const id_chk = async () => {
    try {
      if (user.memberId == '') {
        alert('아이디를 입력해주세요');
        return false;
      }
      const req = await axios.post('/api/member/isDupId', null, {
        params: {
          memberId: user.memberId,
        },
      });
      if (!req.data) {
        setIsDup(true);
        alert('사용할 수 있는 아이디입니다.');
      } else {
        setIsDup(false);
        setUser({ ...user, memberId: '' });
        alert('이미 사용중인 아이디입니다.');
      }
    } catch (error) {}
  };

  const val_chk = (e) => {
    e.preventDefault();
    console.log(user, info);
    for (const key of Object.keys(user)) {
      console.log(key, info);
      const value = user[key];
      const value2 = info[key];
      console.log(value, value2);
      if (value == '') {
        alert(value2 + '를 입력해주세요');
        return false;
      }
    }
    if (user.password != pw2) {
      alert('비밀번호가 서로 일치하지 않습니다.');
      return false;
    }

    if (!isDup) {
      alert('아이디 중복 검사를 해주세요');
      return false;
    }

    join();
  };

  const join = async (e) => {
    try {
      const req = await axios.post('/api/member/signin', user);
      console.log(req.data, 'fdslkfj');
      if (req.data) {
        alert('회원가입 성공');
        setForm(true);
      } else {
        alert('회원가입 실패');
        setUser({
          eamil: '',
          nickName: '',
          memberId: '',
          password: '',
          roles: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login_form">
      <Form onSubmit={val_chk}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label>Email</Form.Label>
          <Col>
            <Form.Control
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Col>
          <Form.Label>Name</Form.Label>
          <Col>
            <Form.Control
              type="text"
              name="nickName"
              value={user.nickName}
              onChange={(e) => setUser({ ...user, nickName: e.target.value })}
            />
          </Col>
          <Form.Label>ID</Form.Label>
          <Col className="d-flex gap-2">
            <Form.Control
              type="text"
              name="memberId"
              value={user.memberId}
              onChange={(e) => setUser({ ...user, memberId: e.target.value })}
              style={{ height: '30px', width: '80%' }}
            />
            <Button
              variant="secondary"
              onClick={id_chk}
              style={{ height: '30px', width: '20%', lineHeight: '10px' }}
            >
              ID check
            </Button>
          </Col>
          <Form.Label>PW</Form.Label>
          <Col>
            <Form.Control
              type="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </Col>
          <Form.Label>PW Check</Form.Label>
          <Col>
            <Form.Control
              type="password"
              name="userPassword2"
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
            />
          </Col>
          <Form.Label>Role</Form.Label>
          <Col>
            <Form.Check
              type="checkbox"
              name="roles"
              value={['USER']}
              onChange={(e) => setUser({ ...user, roles: [e.target.value] })}
              label={`User`}
            />
          </Col>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button type="submit" variant="secondary" size="lg" block>
            SignUp
          </Button>
          <Button
            variant="secondary"
            onClick={(e) => {
              setForm(true);
            }}
            size="lg"
            block
          >
            ToLogin
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;

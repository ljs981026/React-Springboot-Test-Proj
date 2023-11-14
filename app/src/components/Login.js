import React, { useState } from 'react';
import Top from './Top';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login({ test }) {
  const [logInfo, setLogInfo] = useState({ userId: '', userPassword: '' });

  console.log(logInfo);

  const val_chk = (e) => {
    e.preventDefault();
    if (logInfo.userId == '') {
      alert('아이디를 입력해주세요');
      return false;
    }
    if (logInfo.userPassword == '') {
      alert('비밀번호를 입력해주세요.');
      return false;
    }
    login_chk();
  };

  const login_chk = async () => {
    try {
      const req = await axios.post('/api/user/login', null, {
        params: logInfo,
      });
      if (req.data) {
        alert('로그인 성공');
        // test();
      } else {
        alert('로그인 실패');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Top name={'로그인'} />
      <form onSubmit={val_chk}>
        <label htmlFor="userId" />
        아이디 <label />
        <input
          type="text"
          name="userId"
          value={logInfo.userId}
          onChange={(e) => setLogInfo({ ...logInfo, userId: e.target.value })}
        />
        <br />
        <label htmlFor="userPw" />
        비밀번호 <label />
        <input
          type="password"
          name="userPw"
          value={logInfo.userPassword}
          onChange={(e) => setLogInfo({ ...logInfo, userPassword: e.target.value })}
        />
        <br />
        <button>로그인</button>
      </form>
      <button>
        <Link to="/join">회원가입</Link>
      </button>
    </div>
  );
}

export default Login;

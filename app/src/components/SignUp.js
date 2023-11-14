import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Top from './Top';

function SignUp() {
  const [user, setUser] = useState({
    userEmail: '',
    userName: '',
    userId: '',
    userPassword: '',
  });

  const [pw2, setPw2] = useState('');

  const [isDup, setIsDup] = useState(false);

  const info = {
    userEmail: '이메일',
    userName: '이름',
    userId: '아이디',
    userPassword: '패스워드',
  };

  const id_chk = async () => {
    try {
      if (user.userId == '') {
        alert('아이디를 입력해주세요');
        return false;
      }
      const req = await axios.post('/api/user/idchk', null, {
        params: {
          userId: user.userId,
        },
      });
      if (!req.data) {
        setIsDup(true);
        alert('사용할 수 있는 아이디입니다.');
      } else {
        setIsDup(false);
        setUser({ ...user, userId: '' });
        alert('이미 사용중인 아이디입니다.');
      }
    } catch (error) {}
  };

  const val_chk = (e) => {
    e.preventDefault();
    for (const key of Object.keys(user)) {
      const value = user[key];
      const value2 = info[key];
      if (value == '') {
        alert(value2 + '를 입력해주세요');
        return false;
      }
    }
    if (user.userPassword != pw2) {
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
      const req = await axios.post('/api/user/save', user);
      console.log(req.data, 'fdslkfj');
      if (req.data) {
        alert('회원가입 성공');
      } else {
        alert('회원가입 실패');
        setUser({
          userEmail: '',
          userName: '',
          userId: '',
          userPassword: '',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Top name={'회원가입'} />
      <form onSubmit={val_chk}>
        <label htmlFor="userEmail">이메일: </label>
        <input
          type="text"
          name="userEmail"
          value={user.userEmail}
          onChange={(e) => setUser({ ...user, userEmail: e.target.value })}
        />
        <br />
        <label htmlFor="userName">이름: </label>
        <input
          type="text"
          name="userName"
          value={user.userName}
          onChange={(e) => setUser({ ...user, userName: e.target.value })}
        />
        <br />
        <label htmlFor="userId">아이디: </label>
        <input
          type="text"
          name="userId"
          value={user.userId}
          onChange={(e) => setUser({ ...user, userId: e.target.value })}
        />
        <input type="button" value="중복체크" onClick={id_chk} />
        <br />
        <label htmlFor="userPassword">비밀번호: </label>
        <input
          type="password"
          name="userPassword"
          value={user.userPassword}
          onChange={(e) => setUser({ ...user, userPassword: e.target.value })}
        />
        <br />
        <label htmlFor="userPassword2">비밀번호 확인: </label>
        <input
          type="password"
          name="userPassword2"
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
        />
        <br />
        <input type="submit" value="회원가입"></input>
        <button>
          <Link to="/">로그인하러가기</Link>
        </button>
      </form>
    </div>
  );
}

export default SignUp;

import React from 'react';
import Top from './Top';

function Main({ setLogged, setJwt }) {
  const logout = () => {
    setLogged(false);
    setJwt({ accessToken: '', refreshToken: '' });
    localStorage.clear();
  };

  return (
    <div>
      <Top name={'메인'} />
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}

export default Main;

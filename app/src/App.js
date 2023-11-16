import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AppRouter from './components/Router.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [logged, setLogged] = useState(false);
  const [init, setInit] = useState(false);
  const [jwt, setJwt] = useState({
    accessToken: '',
    refreshToken: '',
  });

  const tokenChk = async () => {
    try {
      const req = await axios.post('/api/member/token', null, {
        params: {
          token: localStorage.getItem('accessToken'),
        },
      });
      if (req.data) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    } catch (error) {
      console.log(error);
    }
    setInit(true);
  };

  useEffect(() => {
    tokenChk();
  }, [logged]);

  // const

  console.log(logged);

  return (
    <>
      {init ? (
        <AppRouter init={init} logged={logged} setJwt={setJwt} setLogged={setLogged} />
      ) : (
        'loading...'
      )}
    </>
  );
}

export default App;

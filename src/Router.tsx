import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import SignUp from './pages/signup/SignUp';
import { useEffect, useState } from 'react';
import Main from './pages/main/Main';

const Router = () => {
  const [isLogin, setIsLogin] = useState(window.localStorage.getItem('token'));

  useEffect(() => {
    setIsLogin(localStorage.getItem('token'));
    console.log(localStorage.getItem('token'));
  }, [localStorage.getItem('token')]);

  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <GlobalStyle />
        <Routes>
          <Route path='/' element={isLogin ? <Main /> : <Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
};

export default Router;

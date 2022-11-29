import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Main from './pages/main/Main';

import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import SignUp from './pages/signup/SignUp';
import LoadingLogin from './pages/signup/LoadingLogin';
import Write from './pages/main/write/Write';

const Router = () => {
  const [isLogin, setIsLogin] = useState<string | null>(
    localStorage.getItem('token')
  );

  const getToken = () => {
    setIsLogin(localStorage.getItem('token'));
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route
            path='/'
            element={isLogin ? <Main /> : <Login getToken={getToken} />}
          />
          <Route path='/signup' element={<SignUp />} />
          <Route
            path='/loading'
            element={<LoadingLogin getToken={getToken} />}
          />
          <Route path='/write' element={<Write />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Router;

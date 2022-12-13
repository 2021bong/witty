import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

import Login from './pages/login/Login';
import Main from './pages/main/Main';
import SignUp from './pages/signup/SignUp';
import LoadingLogin from './pages/signup/LoadingLogin';
import Create from './pages/create/Create';
import Detail from './pages/main/Detail';
import Category from './pages/category/Category';
import Edit from './pages/edit/Edit';
import MyPage from './pages/mypage/MyPage';

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
          <Route path='/create' element={<Create />} />
          <Route path='/main/:id' element={<Detail />} />
          <Route path='/category' element={<Category />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/mypage' element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Router;

import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import styled from 'styled-components';

import Login from './pages/Login';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import LoadingLogin from './components/signup/LoadingLogin';
import Create from './pages/Create';
import Detail from './pages/Detail';
import Search from './pages/Search';
import Edit from './pages/Edit';
import MyPage from './pages/MyPage';
import Dock from './components/common/Dock';
import MyNickname from './components/mypage/MyNickname';
import MyFeeds from './components/mypage/MyFeeds';
import MyBookmark from './components/mypage/MyBookmark';
import MyWithdrawal from './components/mypage/MyWithdrawal';
import Chat from './pages/Chat';

const Router = () => {
  const [isLogin, setIsLogin] = useState<string | null>(
    sessionStorage.getItem('token')
  );

  const getToken = () => {
    setIsLogin(sessionStorage.getItem('token'));
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        {!isLogin && (
          <Container isLogin={!!isLogin}>
            <Routes>
              <Route
                path='/loading'
                element={<LoadingLogin getToken={getToken} />}
              />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/' element={<Login getToken={getToken} />} />
            </Routes>
          </Container>
        )}
        {isLogin && (
          <Container isLogin={!!isLogin}>
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/create' element={<Create />} />
              <Route path='/main/:id' element={<Detail />} />
              <Route path='/search' element={<Search />} />
              <Route path='/search/category' element={<Search />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/mypage' element={<MyPage getToken={getToken} />} />
              <Route path='/mypage/nickname' element={<MyNickname />} />
              <Route path='/mypage/feeds' element={<MyFeeds />} />
              <Route path='/mypage/bookmarks' element={<MyBookmark />} />
              <Route
                path='/mypage/withdrawal'
                element={<MyWithdrawal getToken={getToken} />}
              />
            </Routes>
            <Dock />
          </Container>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Router;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: ${({ isLogin }: { isLogin: boolean }) =>
    isLogin ? 'space-between' : 'center'};
  align-items: center;
  width: 100%;
  height: 95vh;
  max-width: 500px;
  margin: 20px auto;
  padding: ${({ isLogin }: { isLogin: boolean }) =>
    isLogin ? '2rem' : '3rem'};
  border: 1px solid #ddd;
  border-radius: 1rem;
  color: ${({ theme }) => theme.text};
  overflow: scroll;
`;

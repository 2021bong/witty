import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import SignUp from './pages/signup/SignUp';

const Router = () => {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <GlobalStyle />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
};

export default Router;

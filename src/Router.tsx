import { HashRouter, Routes, Route } from 'react-router-dom';
import WittyLogin from './pages/witty/login/WittyLogin';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import SignUp from './pages/witty/signup/SignUp';

const Router = () => {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <GlobalStyle />
        <Routes>
          <Route path='/' element={<WittyLogin />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
};

export default Router;

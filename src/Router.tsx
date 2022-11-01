import { HashRouter, Routes, Route } from 'react-router-dom';
import WittyLogin from './pages/witty/login/WittyLogin';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

const Router = () => {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <GlobalStyle />
        <Routes>
          <Route path='/' element={<WittyLogin />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
};

export default Router;

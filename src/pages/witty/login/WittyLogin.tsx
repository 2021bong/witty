import styled from 'styled-components';

const WittyLogin = () => {
  return (
    <Main>
      <h3>Hello Witty!</h3>
    </Main>
  );
};

export default WittyLogin;

const Main = styled.div`
  width: 600px;
  margin: 100px auto;

  h3 {
    font-weight: 700;
  }
`;

import styled from 'styled-components';
import NoResult from '../../components/common/NoResult';

const Chat = () => {
  return (
    <Container>
      <NoResult type='chat' />
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  color: ${({ theme }) => theme.subText};
`;

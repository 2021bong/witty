import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaRegSadTear } from 'react-icons/fa';

const Chat = () => {
  return (
    <Container>
      <FaRegSadTear className='icon' size='50px' />
      <p className='desc'>준비 중인 서비스입니다.</p>
      <Link to='/' className='link'>
        메인으로
      </Link>
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

  .icon {
    margin-bottom: 10px;
  }

  .desc {
    margin-bottom: 30px;
  }

  .link {
    color: ${({ theme }) => theme.subText};
    &:hover {
      color: ${({ theme }) => theme.mainColor};
    }
    &:active {
      color: ${({ theme }) => theme.mainColor2};
    }
  }
`;

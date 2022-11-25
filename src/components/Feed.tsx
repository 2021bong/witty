import styled from 'styled-components';
import { FeedProps } from '../utils/interface';

const Feed = ({ user, content, time }: FeedProps) => {
  return (
    <Container>
      <div className='info'>
        <p className='user'>{user}</p>
        <p className='time'>{time}</p>
      </div>
      <p>{content}</p>
    </Container>
  );
};
export default Feed;

const Container = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};

  &:last-of-type {
    border: none;
  }

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .user {
      font-weight: 700;
    }

    .time {
      font-weight: 300;
      color: ${({ theme }) => theme.text};
    }
  }
`;

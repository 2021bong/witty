import styled from 'styled-components';
import {
  BsHeartFill,
  BsHeart,
  BsChat,
  BsBookmark,
  BsFillBookmarkFill,
} from 'react-icons/bs';
import { FeedProps } from '../utils/interface';
import { useState } from 'react';

const Feed = ({ user, content, time, like, comment }: FeedProps) => {
  const [heart, setHeart] = useState(false);
  const [save, setSave] = useState(false);

  const handleLikeHeart = () => {
    setHeart((prev) => !prev);
  };

  const handleSaveFeed = () => {
    setSave((prev) => !prev);
  };

  return (
    <Container>
      <div className='info'>
        <p className='user'>{user}</p>
        <p className='time'>{time}</p>
      </div>
      <p className='content'>{content}</p>
      <div className='reactionContainer'>
        <div className='interactionContainer'>
          <span className='heartBox' onClick={handleLikeHeart}>
            {heart ? <BsHeartFill className='checked' /> : <BsHeart />}
            <span>{like.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
          </span>
          <BsChat />
          <span>
            {comment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </span>
        </div>
        <div className='bookmark'>
          {save ? (
            <BsFillBookmarkFill className='checked' onClick={handleSaveFeed} />
          ) : (
            <BsBookmark onClick={handleSaveFeed} />
          )}
        </div>
      </div>
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

  .content {
    margin-bottom: 10px;
    line-height: 1.2rem;
  }

  .reactionContainer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .heartBox,
    .bookmark {
      cursor: pointer;
    }
    .interactionContainer {
      span {
        margin: 0 5px;
      }
    }

    .checked {
      color: ${({ theme }) => theme.mainColor};
    }
  }
`;

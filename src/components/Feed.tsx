import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  BsHeartFill,
  BsHeart,
  BsChat,
  BsBookmark,
  BsFillBookmarkFill,
} from 'react-icons/bs';
import { FeedProps } from '../utils/interface';

const Feed = ({
  id,
  user,
  content,
  time,
  like,
  comment,
  isLiked,
  isSaved,
}: FeedProps) => {
  const [heart, setHeart] = useState(isLiked || false);
  const [save, setSave] = useState(isSaved || false);

  const handleLikeHeart = () => {
    setHeart((prev) => !prev);
  };

  const handleSaveFeed = () => {
    setSave((prev) => !prev);
  };

  return (
    <Container>
      <Link to={`/main/${id}`}>
        <div className='info'>
          <p className='user'>{user}</p>
          <p className='time'>{time}</p>
        </div>
        <p className='content'>{content}</p>
      </Link>
      <div className='reactionContainer'>
        <div className='interactionContainer'>
          <div className='heartBox' onClick={handleLikeHeart}>
            {heart ? <BsHeartFill className='checked' /> : <BsHeart />}
            <span>
              {like ? like.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0}
            </span>
          </div>
          <div>
            <BsChat />
            <span>
              {comment
                ? comment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : 0}
            </span>
          </div>
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
  border-bottom: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};

  &:last-of-type {
    border: none;
  }

  a {
    display: block;
    padding: 20px 20px 0 20px;
    color: ${({ theme }) => theme.text};

    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .user {
        font-weight: 700;
      }

      .time {
        font-size: 14px;
        color: ${({ theme }) => theme.subText};
      }
    }

    .content {
      margin-bottom: 10px;
      line-height: 1.2rem;
    }
  }

  .reactionContainer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 20px 20px 20px;

    .heartBox,
    .bookmark {
      cursor: pointer;
    }

    .interactionContainer {
      display: flex;

      div {
        display: flex;
        align-items: center;

        &:first-child {
          margin-right: 15px;
        }

        span {
          margin-left: 5px;
        }

        svg {
          transform: translateY(-2px);
        }
      }
    }

    .checked {
      color: ${({ theme }) => theme.mainColor};
    }
  }
`;

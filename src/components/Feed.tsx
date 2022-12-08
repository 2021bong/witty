import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import {
  BsHeartFill,
  BsHeart,
  BsChat,
  BsBookmark,
  BsFillBookmarkFill,
} from 'react-icons/bs';
import { FeedProps } from '../utils/interface';
import axios from 'axios';

const Feed = ({
  id,
  user,
  category,
  content,
  time,
  like,
  comment,
  isLiked,
  isSaved,
  owner,
}: FeedProps) => {
  const [heart, setHeart] = useState(isLiked || false);
  const [save, setSave] = useState(isSaved || false);
  const navigate = useNavigate();

  const handleLikeHeart = () => {
    setHeart((prev) => !prev);
  };

  const handleSaveFeed = () => {
    setSave((prev) => !prev);
  };

  const goEditMode = () => {
    navigate(`/edit/${id}`);
  };

  const removeFeed = () => {
    if (confirm('정말로 삭제하실 건가요?😭')) {
      axios
        .delete('url', { data: { id: id } })
        .then((res) => alert('삭제되었습니다. ✨'))
        .catch((err) =>
          alert(`삭제에 실패했습니다. 잠시 뒤 다시 시도해주세요. 😭\n${err}`)
        );
    }
  };

  return (
    <Container>
      <span className='category'>
        <Link to='/category' className='goCategory'>
          {'#' + category}
        </Link>
      </span>

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
        <div className='rightIconBox'>
          {owner && <AiTwotoneEdit className='edit' onClick={goEditMode} />}
          {owner && <AiFillDelete className='delete' onClick={removeFeed} />}
          {save ? (
            <BsFillBookmarkFill
              className='bookmark checked'
              onClick={handleSaveFeed}
            />
          ) : (
            <BsBookmark className='bookmark' onClick={handleSaveFeed} />
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

  .category {
    display: inline-block;
    margin: 20px 20px 15px 20px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.mainColor2};
    font-size: 14px;

    .goCategory {
      padding: 5px;
      color: #fff;
    }
  }

  a {
    display: block;
    padding: 0 20px;
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

    .rightIconBox {
      display: flex;
      align-items: center;

      .edit,
      .delete {
        margin-right: 8px;
        font-size: 1.3rem;
        color: ${({ theme }) => theme.subText};

        &:hover {
          color: ${({ theme }) => theme.text};
        }

        &:active {
          color: ${({ theme }) => theme.mainColor2};
        }
      }
    }

    .heartBox,
    .edit,
    .delete,
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

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import {
  BsHeartFill,
  BsHeart,
  BsChat,
  BsBookmark,
  BsFillBookmarkFill,
} from 'react-icons/bs';
import { goEditMode, removeFeed, handleSaveFeed } from '../utils/function';
import { FeedProps } from '../utils/interface';
import { URL_PATCH_POST_LIKE } from '../utils/url';

const Feed = ({
  id,
  nickname,
  category,
  content,
  time,
  like,
  comment,
  isLiked,
  isSaved,
  owner,
  images,
  setFeeds,
}: FeedProps) => {
  const [heart, setHeart] = useState(isLiked || false);
  const [save, setSave] = useState(isSaved || false);
  const navigate = useNavigate();

  const handleLikeHeart = () => {
    axios
      .patch(
        URL_PATCH_POST_LIKE(id),
        {},
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      )
      .then((res) => {
        setHeart((prev) => !prev);
        setFeeds((prev) => {
          const newData =
            prev &&
            [...prev].map((feedData) => {
              return feedData.id === id
                ? {
                    ...feedData,
                    count_likes: feedData.count_likes,
                    is_liked: feedData.is_liked,
                  }
                : { ...feedData };
            });
          return newData;
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <div className='categoryContainer'>
        {category?.map((cate) => (
          <Link to='/search/category' className='goCategory' key={cate}>
            <p className='category'>{'#' + cate}</p>
          </Link>
        ))}
      </div>
      <Link to={`/main/${id}`}>
        <div className='info'>
          <p className='user'>{nickname}</p>
          <p className='time'>{time}</p>
        </div>
        <p className='content'>{content}</p>
      </Link>
      {images && (
        <div className='photoContainer'>
          {images?.map((url, i) => (
            <img
              key={url + i}
              alt={`photo${i + 1}}`}
              src={url}
              className='photo'
            />
          ))}
        </div>
      )}
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
          {owner && (
            <AiTwotoneEdit
              className='edit'
              onClick={() => goEditMode(id, navigate)}
            />
          )}
          {owner && (
            <AiFillDelete className='delete' onClick={() => removeFeed(id)} />
          )}
          {save ? (
            <BsFillBookmarkFill
              className='bookmark checked'
              onClick={() => handleSaveFeed(setSave, id)}
            />
          ) : (
            <BsBookmark
              className='bookmark'
              onClick={() => handleSaveFeed(setSave, id)}
            />
          )}
        </div>
      </div>
    </Container>
  );
};
export default Feed;

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};

  &:last-of-type {
    border: none;
  }

  .categoryContainer {
    display: flex;
    margin: 15px 0;
    padding-left: 20px;

    .goCategory {
      margin: 0;
      padding: 0;

      .category {
        margin-right: 5px;
        padding: 5px;
        border-radius: 5px;
        background-color: ${({ theme }) => theme.mainColor2};
        font-size: 14px;
        color: #fff;
      }
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

  .photoContainer {
    display: flex;
    align-items: center;
    width: 90%;
    margin-bottom: 20px;
    overflow-x: scroll;
    transform: translateX(20px);

    .photo {
      width: 40%;
      height: 120px;
      border: 1px solid ${({ theme }) => theme.border};
      border-radius: 10px;
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }
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

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
import { AddComma, goEditMode } from '../../utils/function';
import { getAllPosts, removePost, handleSavePost } from '../../api/communicate';
import { FeedProps } from '../../utils/interface';
import { URL_PATCH_POST_LIKE } from '../../api/url';
import token from '../../api/token';

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
          headers: token,
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

  const handleRefreshMain = async () => {
    await getAllPosts(setFeeds, 0);
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
        <div className='photoContainer'>
          {images && (
            <div
              className={images.length >= 3 ? 'longPhotoBox' : 'shortPhotoBox'}
            >
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
        </div>
      </Link>
      <div className='reactionContainer'>
        <div className='interactionContainer'>
          <div className='heartBox' onClick={handleLikeHeart}>
            {heart ? <BsHeartFill className='checked' /> : <BsHeart />}
            {heart ? (
              <span>{like ? AddComma(like) : 1}</span>
            ) : (
              <span>{like ? AddComma(like - 1) : 0}</span>
            )}
          </div>
          <div>
            <BsChat />
            <span>{comment ? AddComma(comment) : 0}</span>
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
            <AiFillDelete
              className='delete'
              onClick={async () => {
                await removePost(id);
                await handleRefreshMain();
              }}
            />
          )}
          {save ? (
            <BsFillBookmarkFill
              className='bookmark checked'
              onClick={() => handleSavePost(setSave, id)}
            />
          ) : (
            <BsBookmark
              className='bookmark'
              onClick={() => handleSavePost(setSave, id)}
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
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};

  &:last-of-type {
    border: none;
  }

  .categoryContainer {
    display: flex;
    margin: 15px 0;

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
    margin-bottom: 20px;
    color: ${({ theme }) => theme.text};
    overflow-x: scroll;

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

    .photoContainer {
      overflow-x: scroll;
      width: 100%;

      .longPhotoBox {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 140%;

        .photo {
          width: 40%;
        }
      }

      .shortPhotoBox {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .photo {
          width: 50%;
        }
      }

      .photo {
        height: 120px;
        border: 1px solid ${({ theme }) => theme.border};
        border-radius: 10px;
        margin-right: 10px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .reactionContainer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 20px;

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

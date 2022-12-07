import { ChangeEvent, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled, { DefaultTheme } from 'styled-components';
import {
  BsHeartFill,
  BsHeart,
  BsChat,
  BsBookmark,
  BsFillBookmarkFill,
} from 'react-icons/bs';
import { FaCommentAlt } from 'react-icons/fa';
import Dock from '../../components/Dock';
import Greeting from '../../components/Greeting';
import { DetailFeedDataType } from '../../utils/interface';
import { getDetailTime } from '../../utils/function';

const Detail = () => {
  const [feedData, setFeedData] = useState<DetailFeedDataType | undefined>();
  const [heart, setHeart] = useState(false);
  const [save, setSave] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [cmtIconColor, setCmtIconColor] = useState(false);
  const param = useParams().id;

  useEffect(() => {
    axios.get('../data/detail.json').then((res) => {
      setFeedData(res.data.feeds[Number(param) - 1]);
      setHeart(res.data.feeds[Number(param) - 1].is_liked || false);
      setSave(res.data.feeds[Number(param) - 1].is_marked || false);
    });

    // axios
    //   .get(`http://localhost:8000/posts/${param}`, {
    //     headers: { Authorization: localStorage.getItem('token') },
    //   })
    //   .then((res) => {
    //     setFeedData(res.data[0]);
    //     setHeart(res.data[0].is_liked || false);
    //     setSave(res.data[0].is_marked || false);
    //   });
  }, []);

  const handleWriteComment = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!commentValue) {
      alert('댓글 내용을 작성해주세요! 🥲');
      return;
    }
    axios
      .post(
        `http://localhost:8000/${param}/comment`,
        {
          content: commentValue,
        },
        { headers: { Authorization: localStorage.getItem('token') } }
      )
      .then()
      .catch((err) => alert(`네트워크 통신이 원활하지 않습니다.🥲\n${err}`));
    setCommentValue('');

    // axios
    //   .get(`http://localhost:8000/posts/${param}`, {
    //     headers: { Authorization: localStorage.getItem('token') },
    //   })
    //   .then((res) => {
    //     setFeedData(res.data[0]);
    //     setHeart(res.data[0].is_liked || false);
    //     setSave(res.data[0].is_marked || false);
    //   });
  };

  const handleLikeHeart = () => {
    setHeart((prev) => !prev);
    axios
      .patch(`http://localhost:8000/${param}/like`, {
        is_liked: !heart ? 1 : 0,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleSaveFeed = () => {
    setSave((prev) => !prev);
    axios
      .patch(`http://localhost:8000/${param}/is_marked`, {
        is_marked: !save ? 1 : 0,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleIconcolor = (e: ChangeEvent) => {
    e.type === 'focus' ? setCmtIconColor(true) : setCmtIconColor(false);
  };

  return (
    <Container>
      <Greeting text="What's happening now" />
      {feedData && (
        <div className='contentContainer'>
          <main className='detailFeedContainer'>
            <div className='ctgrAndBmk'>
              <Link to='/category' className='goCategory'>
                <span className='category'>{'#' + feedData.category}</span>
              </Link>
              <div className='bookmark'>
                {save ? (
                  <BsFillBookmarkFill
                    className='checked'
                    onClick={handleSaveFeed}
                  />
                ) : (
                  <BsBookmark onClick={handleSaveFeed} />
                )}
              </div>
            </div>
            <p className='userName'>
              <b>{feedData.nickname}</b>
            </p>
            <p className='content'>
              <b>{feedData.content}</b>
            </p>
            <div className='interactionContainer'>
              <div className='likeCountBox' onClick={handleLikeHeart}>
                {heart ? <BsHeartFill className='checked' /> : <BsHeart />}
                <span>
                  좋아요
                  <b>{feedData.count_likes || 0}</b>
                </span>
              </div>
              <div>
                <BsChat />
                <span>
                  댓글
                  <b>{feedData.count_comments || 0}</b>
                </span>
              </div>
            </div>
            <p className='date'>{getDetailTime(feedData.created_at)}</p>
          </main>
          <form className='formContainer' onSubmit={(e) => e.preventDefault()}>
            <CommentIcon $iconColor={cmtIconColor} />
            <input
              type='text'
              value={commentValue}
              onChange={handleWriteComment}
              onFocus={handleIconcolor}
              onBlur={handleIconcolor}
            />
            <button onClick={handleSubmit}>작성</button>
          </form>
          {
            <ul className='commentsContainer'>
              {feedData.comments?.map((el) => (
                <li className='commentBox' key={el.id}>
                  <div>
                    <p className='nameAndContentBox'>
                      <b className='nickname'>{el.nickname}</b>
                      <span>{el.comment}</span>
                    </p>
                    <p className='date'>{getDetailTime(feedData.created_at)}</p>
                  </div>
                  {heart ? <BsHeartFill className='checked' /> : <BsHeart />}
                </li>
              ))}
            </ul>
          }
        </div>
      )}
      <Dock />
    </Container>
  );
};

export default Detail;

const CommentIcon = styled(FaCommentAlt)`
  margin-right: 10px;
  color: ${({
    $iconColor,
    theme,
  }: {
    $iconColor: boolean;
    theme: DefaultTheme;
  }) => ($iconColor ? theme.mainColor : theme.border)};
  font-size: 1.4rem;
  transition: 0.3s ease-in-out;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 90vh;
  max-width: 500px;
  margin: 50px auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 1rem;
  color: ${({ theme }) => theme.text};

  .contentContainer {
    width: 100%;
    height: 100%;

    .detailFeedContainer {
      width: 100%;
      padding: 20px;
      border-bottom: 1px solid ${({ theme }) => theme.border};

      .userName {
        margin-bottom: 10px;

        b {
          color: ${({ theme }) => theme.subColor};
        }
      }

      .content {
        margin-bottom: 23px;

        b {
          color: ${({ theme }) => theme.subColor};
        }
      }

      .ctgrAndBmk {
        display: flex;
        justify-content: space-between;

        .goCategory {
          margin: 0;

          .category {
            display: inline-block;
            margin-bottom: 15px;
            padding: 5px;
            border-radius: 5px;
            background-color: ${({ theme }) => theme.mainColor};
            color: #fff;
            font-size: 14px;
          }
        }

        .bookmark {
          text-align: right;
          cursor: pointer;
        }
      }
    }

    .interactionContainer {
      display: flex;
      margin-bottom: 15px;

      .likeCountBox {
        margin-right: 20px;
        cursor: pointer;
      }

      span {
        margin: 0 5px;

        b {
          margin-left: 5px;
        }
      }

      svg {
        transform: translateY(2px);
      }
    }

    .checked {
      color: ${({ theme }) => theme.mainColor};
    }

    .date {
      font-size: 14px;
      color: ${({ theme }) => theme.subText};
    }
  }

  .formContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px 5px 10px 8px;

    input {
      width: 70%;
      margin-right: 15px;
      padding: 5px;
      border: none;
      border-bottom: 1px solid ${({ theme }) => theme.border};
      font-size: 1rem;
      transition: 0.2s ease-in-out;

      &:focus {
        border-bottom: 1px solid ${({ theme }) => theme.mainColor};
      }
    }

    button {
      width: 20%;
      padding: 5px;
      border: 1px solid ${({ theme }) => theme.mainColor};
      border-radius: 5px;
      background-color: #fff;
      color: ${({ theme }) => theme.mainColor};

      &:hover {
        border: 1px solid ${({ theme }) => theme.mainColor};
        background-color: ${({ theme }) => theme.mainColor};
        color: #fff;
      }

      &:active {
        border: 1px solid ${({ theme }) => theme.mainColor2};
        background-color: ${({ theme }) => theme.mainColor2};
        color: #fff;
      }
    }
  }

  .commentsContainer {
    width: 100%;

    .commentBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid ${({ theme }) => theme.border};

      &:last-child {
        border-bottom: none;
      }

      .nameAndContentBox {
        margin-bottom: 10px;

        .nickname {
          margin-right: 10px;
        }
      }
    }
  }
`;

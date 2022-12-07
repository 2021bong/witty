import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import {
  BsHeartFill,
  BsHeart,
  BsChat,
  BsBookmark,
  BsFillBookmarkFill,
} from 'react-icons/bs';
import Dock from '../../components/Dock';
import Greeting from '../../components/Greeting';
import { DetailFeedDataType } from '../../utils/interface';
import { getDetailTime } from '../../utils/function';

const Detail = () => {
  const [feedData, setFeedData] = useState<DetailFeedDataType | undefined>();
  const [heart, setHeart] = useState(false);
  const [save, setSave] = useState(false);
  const param = useParams().id;

  const handleLikeHeart = () => {
    setHeart((prev) => !prev);
  };

  const handleSaveFeed = () => {
    setSave((prev) => !prev);
  };

  useEffect(() => {
    // axios.get('../data/feeds.json').then((res) => {
    //   setFeedData(res.data.feeds[Number(param) - 1]);
    //   setHeart(res.data.feeds[Number(param) - 1].is_liked || false);
    //   setSave(res.data.feeds[Number(param) - 1].is_marked || false);
    // });

    axios
      .get(`http://localhost:8000/posts/${param}`, {
        headers: { Authorization: localStorage.getItem('token') },
      })
      .then((res) => {
        setFeedData(res.data[0]);
        setHeart(res.data[0].is_liked || false);
        setSave(res.data[0].is_marked || false);
      });
  }, []);

  return (
    <Container>
      <Greeting text="What's happening now" />
      {feedData && (
        <div className='contentContainer'>
          <div className='detailFeedContainer'>
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
            <p className='userName'>
              <b>{feedData.nickname}</b>
            </p>
            <p className='content'>
              <b>{feedData.content}</b>
            </p>
            <div className='interactionContainer'>
              <div className='likeBox' onClick={handleLikeHeart}>
                {heart ? <BsHeartFill className='checked' /> : <BsHeart />}
                <span>
                  좋아요
                  <b>{feedData.count_likes || 0}</b>
                </span>
              </div>
              <div className='commentBox'>
                <BsChat />
                <span>
                  댓글
                  <b>{feedData.count_comments || 0}</b>
                </span>
              </div>
            </div>
            <p className='date'>{getDetailTime(feedData.created_at)}</p>
          </div>
        </div>
      )}
      <Dock />
    </Container>
  );
};

export default Detail;

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

      .date {
        font-size: 14px;
        color: ${({ theme }) => theme.subText};
      }

      .interactionContainer {
        display: flex;
        margin-bottom: 15px;

        .likeBox {
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

      .bookmark {
        text-align: right;
        cursor: pointer;
      }
    }
  }
`;

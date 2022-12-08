import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { AiFillPlusCircle } from 'react-icons/ai';
import Greeting from '../../components/Greeting';
import Dock from '../../components/Dock';
import Feed from '../../components/Feed';
import { MainFeedStateType } from '../../utils/interface';
import { getTime } from '../../utils/function';

const Main = () => {
  const [feeds, setFeeds] = useState<MainFeedStateType[] | undefined>();
  let limit = 12;
  let offset = 0;

  useEffect(() => {
    // axios.get('data/feeds.json').then((res) => {
    //   setFeeds(res.data.feeds);
    // });

    axios
      .get(`http://localhost:8000/posts?limit=${limit}&offset=${offset}`, {
        headers: { Authorization: localStorage.getItem('token') },
      })
      .then((res) => {
        const dataForState = res.data.map((feedInfo: MainFeedStateType) => {
          return { ...feedInfo, created_at: getTime(feedInfo.created_at) };
        });
        setFeeds(dataForState);
      });
  }, []);

  return (
    <Container>
      <Greeting text="Hi, Witty! What's going on today?" />
      <Link to='write'>
        <button className='writeBtn'>
          <AiFillPlusCircle />
        </button>
      </Link>
      <div className='feedBox'>
        {feeds?.map((el) => (
          <Feed
            key={el.id}
            id={el.id}
            user={el.nickname}
            category={el.category}
            content={el.content}
            time={el.created_at}
            like={el.count_likes}
            comment={el.count_comments}
            isLiked={el.is_liked}
            isSaved={el.is_marked}
            owner={el.is_owner}
          />
        ))}
      </div>
      <Dock />
    </Container>
  );
};

export default Main;

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

  .writeBtn {
    position: absolute;
    top: 3%;
    right: 5%;
    border: none;
    font-size: 3rem;
    color: ${({ theme }) => theme.mainColor};
    background-color: #fff;

    svg {
      &:hover {
        transform: scale(107%);
      }

      &:active {
        transform: scale(1);
        color: ${({ theme }) => theme.subColor};
      }
    }
  }

  .feedBox {
    width: 100%;
    height: 80%;
    overflow: scroll;
  }

  .dock {
    width: 100%;
  }
`;

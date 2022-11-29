import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Greeting from '../../components/Greeting';
import Dock from '../../components/Dock';
import Feed from '../../components/Feed';
import { FeedStateType } from '../../utils/interface';
import { AiFillPlusCircle } from 'react-icons/ai';

const Main = () => {
  const [feeds, setFeeds] = useState<FeedStateType[] | undefined>();
  useEffect(() => {
    axios.get('data/feeds.json').then((res) => {
      setFeeds(res.data.feeds);
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
            user={el.userId}
            content={el.content}
            time={el.time}
            like={el.like}
            comment={el.comment}
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

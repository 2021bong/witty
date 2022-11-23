import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Dock from '../../components/Dock';
import Feed from '../../components/Feed';
import { FeedStateType } from '../../utils/interface';

const Main = () => {
  const [feeds, setFeeds] = useState<FeedStateType[] | undefined>();
  useEffect(() => {
    axios.get('data/feeds.json').then((res) => {
      setFeeds(res.data.feeds);
    });
  }, []);

  return (
    <Container>
      <h5 className='greeting'>Hi, Witty! What's going on today?</h5>
      <div className='feedBox'>
        {feeds?.map((el) => (
          <Feed
            key={el.id}
            user={el.userId}
            content={el.content}
            time={el.time}
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

  .greeting {
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
    color: ${({ theme }) => theme.mainColor};
    font-weight: 700;
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

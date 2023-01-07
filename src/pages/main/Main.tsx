import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillPlusCircle } from 'react-icons/ai';
import Greeting from '../../components/Greeting';
import Feed from '../../components/Feed';
import { MainFeedStateType } from '../../utils/interface';
import { getAllPosts } from '../../api/communicate';

const Main = () => {
  const [feeds, setFeeds] = useState<MainFeedStateType[] | undefined>();
  let offset = 0;

  useEffect(() => {
    // axios.get('data/feeds.json').then((res) => {
    //   setFeeds(res.data.feeds);
    // });

    getAllPosts(setFeeds, offset);
  }, []);

  return (
    <Container>
      <Greeting text="Hi, Witty! What's going on today?" />
      <Link to='/create'>
        <button className='writeBtn'>
          <AiFillPlusCircle />
        </button>
      </Link>
      <div className='feedBox'>
        {feeds?.map((el) => (
          <Feed
            key={el.id}
            id={el.id}
            nickname={el.nickname}
            category={el.category}
            content={el.content}
            time={el.created_at}
            like={el.count_likes}
            comment={el.count_comments}
            isLiked={el.is_liked}
            isSaved={el.is_marked}
            owner={el.is_owner}
            images={el.images}
            setFeeds={setFeeds}
          />
        ))}
      </div>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  width: 100%;
  overflow: scroll;
  margin-bottom: 80px;

  .writeBtn {
    position: absolute;
    top: 3%;
    right: 5%;
    border: none;
    border-radius: 50%;
    font-size: 3rem;
    color: ${({ theme }) => theme.mainColor};
    background-color: #fff;
    z-index: 2;

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
  }
`;

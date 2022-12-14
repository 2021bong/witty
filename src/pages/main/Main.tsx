import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { AiFillPlusCircle } from 'react-icons/ai';
import Greeting from '../../components/Greeting';
import Feed from '../../components/Feed';
import { MainFeedStateType } from '../../utils/interface';
import { getTime } from '../../utils/function';

const Main = () => {
  const [feeds, setFeeds] = useState<MainFeedStateType[] | undefined>();
  let limit = 12;
  let offset = 0;

  const handleLikes = (
    id: number | string | undefined,
    newIsLike: number,
    newLikeCount: number
  ) => {
    const newFeeds =
      feeds &&
      [...feeds]?.map((feed) =>
        feed.id === id
          ? { ...feed, is_liked: newIsLike, count_likes: newLikeCount }
          : { ...feed }
      );
    setFeeds(newFeeds);
  };

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
            user={el.nickname}
            category={el.category}
            content={el.content}
            time={el.created_at}
            like={el.count_likes}
            comment={el.count_comments}
            isLiked={el.is_liked}
            isSaved={el.is_marked}
            owner={el.is_owner}
            images={el.images}
            handleLikes={handleLikes}
          />
        ))}
      </div>
    </Container>
  );
};

export default Main;

const Container = styled.div`
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

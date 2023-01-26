import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import Greeting from '../../components/common/Greeting';
import Feed from '../../components/common/Feed';
import { MainFeedStateType } from '../../utils/interface';
import { getAllPosts } from '../../api/communicate';

const Main = () => {
  const [feeds, setFeeds] = useState<MainFeedStateType[] | undefined>();
  const navigate = useNavigate();
  let offset = 0;

  useEffect(() => {
    getAllPosts(setFeeds, offset);
  }, []);

  const moveCreate = () => {
    navigate('/create');
  };

  return (
    <Container>
      <Greeting text="Hi, Witty! What's going on today?" />
      <button className='writeBtn' onClick={moveCreate}>
        <FiPlus />
      </button>
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
    top: 5%;
    right: 6%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    font-size: 2.2rem;
    color: #fff;
    background-color: ${({ theme }) => theme.mainColor};
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    z-index: 2;

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      background-color: ${({ theme }) => theme.subColor};
    }
  }

  .feedBox {
    width: 100%;
  }
`;

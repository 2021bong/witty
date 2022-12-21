import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { MainFeedStateType } from '../../../utils/interface';
import { URL_MYPAGE_POSTS } from '../../../api/url';

const MyFeeds = () => {
  const [myFeeds, setMyFeeds] = useState<MainFeedStateType[] | undefined>();

  useEffect(() => {
    // axios
    //   .get('../data/feeds.json')
    //   .then((res) => setMyFeeds(res.data.feeds))
    //   .catch((err) => console.log(err));

    axios
      .get(URL_MYPAGE_POSTS, {
        headers: { Authorization: localStorage.getItem('token') },
      })
      .then((res) => setMyFeeds(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <h4>내 게시글</h4>
      {myFeeds?.map((feed) => (
        <div className='listBox' key={feed.id}>
          <p>{feed.category}</p>
          <p>{feed.content}</p>
          <p>{feed.images ? '있음' : '없음'}</p>
          <p>{feed.count_likes}</p>
          <p>{feed.count_comments}</p>
          <p>{feed.created_at}</p>
        </div>
      ))}
    </Container>
  );
};

export default MyFeeds;

const Container = styled.div`
  margin-bottom: 100px;
  overflow: scroll;

  h4 {
    margin-bottom: 30px;
    color: ${({ theme }) => theme.mainColor2};
    font-size: 1.5rem;
    text-align: center;
  }

  .listBox {
    padding: 5px 0;
    border-bottom: 1px solid ${({ theme }) => theme.border};

    &:last-child {
      border-bottom: none;
    }
  }
`;

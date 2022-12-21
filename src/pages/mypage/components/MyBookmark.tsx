import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { BookmarkType } from '../../../utils/interface';
import { URL_MYPAGE_BOOKMARKS } from '../../../api/url';

const MyFeeds = () => {
  const [myBookmarks, setmyBookmarks] = useState<BookmarkType[] | undefined>();

  useEffect(() => {
    // axios
    //   .get('../data/feeds.json')
    //   .then((res) => setmyBookmarks(res.data.feeds))
    //   .catch((err) => console.log(err));

    axios
      .get(URL_MYPAGE_BOOKMARKS, {
        headers: { Authorization: localStorage.getItem('token') },
      })
      .then((res) => setmyBookmarks(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <h4>북마크</h4>
      {myBookmarks?.map((feed) => (
        <div className='listBox' key={feed.post_id}>
          {feed.category.map((cate) => (
            <p key={cate}>{cate}</p>
          ))}
          {/* <p>{feed.category}</p> */}
          <p>{feed.content}</p>
          <p>{feed.images ? '있음' : '없음'}</p>
          <p>{feed.count_likes}</p>
          <p>{feed.count_comments}</p>
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

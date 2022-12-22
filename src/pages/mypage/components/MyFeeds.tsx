import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdPhotos } from 'react-icons/io';
import { BsHeartFill, BsHeart, BsChat } from 'react-icons/bs';

import { MainFeedStateType } from '../../../utils/interface';
import { URL_MYPAGE_POSTS } from '../../../api/url';
import { getTime } from '../../../utils/function';

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
      {myFeeds && (
        <ul>
          {myFeeds.map((feed) => (
            <li className='listBox' key={feed.id}>
              <div>
                {feed.category?.map((cate) => (
                  <Link to='/search/category' key={cate}>
                    <span className='category'>{'#' + cate}</span>
                  </Link>
                ))}
              </div>
              <Link to={`/main/${feed.id}`}>
                <div className='contentBox'>
                  <p className='content'>{feed.content}</p>
                  {feed.images ? <IoMdPhotos className='photo icon' /> : null}
                </div>
                <div className='reactionBox'>
                  {!!feed.count_likes ? (
                    <p>
                      <BsHeartFill className='heart icon' />
                      {feed.count_likes
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </p>
                  ) : (
                    <p>
                      <BsHeart className='icon' />
                      {feed.count_likes}
                    </p>
                  )}
                  <p>
                    <BsChat className='icon' />
                    {!!feed.count_comments
                      ? feed.count_comments
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      : feed.count_comments}
                  </p>
                </div>
                <p className='date'>{getTime(feed.created_at)}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default MyFeeds;

const Container = styled.div`
  width: 100%;
  margin-bottom: 100px;
  overflow: scroll;

  h4 {
    margin-bottom: 30px;
    color: ${({ theme }) => theme.mainColor2};
    font-size: 1.5rem;
    text-align: center;
  }

  .listBox {
    padding: 20px 0;
    border-bottom: 1px solid ${({ theme }) => theme.border};

    &:last-child {
      border-bottom: none;
    }

    .category {
      display: inline-block;
      margin-right: 5px;
      padding: 5px;
      border-radius: 5px;
      background-color: ${({ theme }) => theme.mainColor2};
      color: #fff;
    }

    .contentBox {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin: 0 0 10px 0;
      padding-top: 20px;
      color: ${({ theme }) => theme.text};

      .content {
        width: 80%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .photo {
        margin: 0;
        color: ${({ theme }) => theme.mainColor2};
      }
    }

    .reactionBox {
      display: flex;
      margin-bottom: 10px;
      color: ${({ theme }) => theme.text};

      .heart {
        color: ${({ theme }) => theme.mainColor};
      }

      p:first-child {
        margin-right: 10px;
      }
    }

    .icon {
      margin-right: 5px;
      font-size: 1.2rem;
      transform: translateY(3px);
    }

    .date {
      font-size: 14px;
      color: ${({ theme }) => theme.subText};
    }
  }
`;

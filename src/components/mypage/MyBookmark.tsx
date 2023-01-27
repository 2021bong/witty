import { useEffect, useState, MouseEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdPhotos } from 'react-icons/io';
import {
  BsHeartFill,
  BsHeart,
  BsChat,
  BsFillBookmarkFill,
} from 'react-icons/bs';
import { BookmarkType } from '../../utils/types';
import { handleSaveBookmarks } from '../../api/communicate';
import { URL_MYPAGE_BOOKMARKS } from '../../api/url';

const MyFeeds = () => {
  const [myBookmarks, setmyBookmarks] = useState<BookmarkType[] | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(URL_MYPAGE_BOOKMARKS, {
        headers: { Authorization: sessionStorage.getItem('token') },
      })
      .then((res) => setmyBookmarks(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleMoveDetail = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!!target.closest('.bookmark')) {
      return;
    }
    navigate(`/main/${e.currentTarget.id}`);
  };

  const unsaveBookmark = (e: MouseEvent<HTMLElement | SVGElement>) => {
    const id = e.currentTarget.id;
    handleSaveBookmarks(setmyBookmarks, id);
  };

  return (
    <Container>
      <h4>북마크</h4>
      <div className='wrapContainer'>
        {myBookmarks && myBookmarks.length > 0 ? (
          <ul>
            {myBookmarks.map((feed) => (
              <li className='listBox' key={feed.post_id}>
                <div>
                  {feed.category?.map((cate) => (
                    <Link to='/search/category' key={cate}>
                      <span className='category' key={cate}>
                        {'#' + cate}
                      </span>
                    </Link>
                  ))}
                </div>
                <div
                  className='linkBox'
                  id={feed.post_id.toString()}
                  onClick={handleMoveDetail}
                >
                  <div className='contentBox'>
                    <p className='content'>{feed.content}</p>
                    {feed.images ? <IoMdPhotos className='photo icon' /> : null}
                  </div>
                  <div className='reactionBox'>
                    <div className='likesAndComments'>
                      {!!feed.count_likes ? (
                        <p>
                          <BsHeartFill className='heart icon' />
                          {feed.count_likes.toLocaleString()}
                        </p>
                      ) : (
                        <p>
                          <BsHeart className='icon' />
                          {feed.count_likes}
                        </p>
                      )}
                      <p>
                        <BsChat className='icon' />
                        {feed.count_comments.toLocaleString()}
                      </p>
                    </div>
                    <BsFillBookmarkFill
                      id={feed.post_id.toString()}
                      className='bookmark icon'
                      onClick={unsaveBookmark}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className='noData'>
            <p>저장한 북마크가 없습니다.</p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default MyFeeds;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 100px;
  padding: 0 20px;
  overflow: scroll;

  h4 {
    margin-bottom: 30px;
    color: ${({ theme }) => theme.mainColor2};
    font-size: 1.5rem;
    text-align: center;
  }

  .wrapContainer {
    width: 100%;
    height: 85%;

    .listBox {
      padding: 20px 0;
      border-bottom: 1px solid ${({ theme }) => theme.border};

      &:last-child {
        border-bottom: none;
      }

      .category {
        display: inline-block;
        margin-right: 5px;
        margin-bottom: 5px;
        padding: 5px;
        border-radius: 5px;
        background-color: ${({ theme }) => theme.mainColor2};
        color: #fff;
      }

      .linkBox {
        cursor: pointer;
      }

      .contentBox {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin: 0 0 10px 0;
        padding-top: 10px;

        .content {
          width: 80%;
          color: ${({ theme }) => theme.text};
          line-height: 1.2rem;
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
        justify-content: space-between;
        margin-bottom: 10px;

        .likesAndComments {
          display: flex;
        }

        .bookmark {
          transform: translate(4px, 3px);
          color: ${({ theme }) => theme.mainColor};
        }

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
    }

    .noData {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${({ theme }) => theme.subText};
      font-size: 1rem;
    }
  }
`;

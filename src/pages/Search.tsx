import axios from 'axios';
import { useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import styled from 'styled-components';
import Greeting from '../components/common/Greeting';
import {
  URL_SEARCH,
  URL_SEARCH_POST,
  URL_SEARCH_USER,
  URL_SEARCH_CATEGORY,
} from '../api/url';
import { useLocation, useNavigate } from 'react-router-dom';
import Feed from '../components/common/Feed';
import { MainFeedStateType, SearchUseType } from '../utils/types';
import { getTime } from '../utils/function';
import { CATEGORY, INITIAL_TABMENU } from '../utils/constant';
import NoResult from '../components/common/NoResult';

const Search = () => {
  const [searchFeeds, setSearchFeeds] = useState<
    MainFeedStateType[] | undefined
  >();
  const [searchUsers, setSearchUsers] = useState<SearchUseType[] | undefined>();
  const [textValue, setTextValue] = useState('');
  const [tabMenu, setTabMenu] = useState(INITIAL_TABMENU);
  const navigate = useNavigate();
  const location = useLocation();

  const [posts, cate, user] = tabMenu;

  useEffect(() => {
    if (location.pathname === '/search/category') {
      setTabMenu((prev) =>
        [...prev].map((menu) =>
          menu.name === '카테고리'
            ? { ...menu, selected: true }
            : { ...menu, selected: false }
        )
      );
      axios
        .get(URL_SEARCH_CATEGORY(textValue), {
          headers: { Authorization: sessionStorage.getItem('token') },
        })
        .then((res) => setSearchFeeds(res.data))
        .catch((err) => console.log(err));
      return;
    }

    if (!textValue) return;

    axios
      .get(URL_SEARCH, {
        headers: { Authorization: sessionStorage.getItem('token') },
      })
      .then((res) => setSearchFeeds(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!cate.selected) {
      navigate('/search');
    }
  }, [tabMenu]);

  const handleWriteText = (e: ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const handleSelectedMenu = (e: MouseEvent) => {
    const target = e.target as HTMLLIElement;
    setTabMenu((prev) =>
      [...prev].map((menu) =>
        menu.name === target.textContent
          ? { ...menu, selected: true }
          : { ...menu, selected: false }
      )
    );
    setTextValue('');
  };

  const handleSearch = () => {
    if (user.selected) {
      axios
        .get(URL_SEARCH_USER(textValue), {
          headers: { Authorization: sessionStorage.getItem('token') },
        })
        .then((res) => setSearchUsers(res.data))
        .catch((err) => console.log(err));
      return;
    }

    if (cate.selected) {
      axios
        .get(URL_SEARCH_CATEGORY(textValue), {
          headers: { Authorization: sessionStorage.getItem('token') },
        })
        .then((res) => setSearchFeeds(res.data))
        .catch((err) => console.log(err));
      return;
    }

    axios
      .get(URL_SEARCH_POST(textValue), {
        headers: { Authorization: sessionStorage.getItem('token') },
      })
      .then((res) => setSearchFeeds(res.data))
      .catch((err) => console.log(err));
  };

  const handleSearchCategory = (e: MouseEvent) => {
    const li = e.target as HTMLLIElement;
    setTextValue(li.textContent || '');

    axios
      .get(
        URL_SEARCH_CATEGORY(
          li.textContent?.slice(1, li.textContent.length) ?? ''
        ),
        {
          headers: { Authorization: sessionStorage.getItem('token') },
        }
      )
      .then((res) => setSearchFeeds(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Greeting text='There are various things happening.' />
      <form className='formContainer' onSubmit={(e) => e.preventDefault()}>
        <input
          type='text'
          value={textValue}
          onChange={handleWriteText}
          className='searchInput'
        />
        <button className='btn' onClick={handleSearch}>
          검색
        </button>
      </form>
      <ul className='tabContainer'>
        {tabMenu.map((menu) => (
          <li
            className={menu.selected ? 'tabMenu selected' : 'tabMenu'}
            key={menu.id}
            onClick={handleSelectedMenu}
          >
            {menu.name}
          </li>
        ))}
      </ul>
      {posts.selected && (
        <div className='feedBox'>
          {searchFeeds?.length ? (
            searchFeeds.map((data) => (
              <Feed
                key={data.id}
                id={data.id}
                nickname={data.nickname}
                category={data.category}
                content={data.content}
                time={getTime(data.created_at)}
                like={data.count_likes}
                comment={data.count_comments}
                isLiked={data.is_liked}
                isSaved={data.is_marked}
                owner={data.is_owner}
                images={data.images}
                setFeeds={setSearchFeeds}
              />
            ))
          ) : (
            <div className='noResult'>
              <NoResult type='search' />
            </div>
          )}
        </div>
      )}
      {cate.selected && (
        <div className='feedBox'>
          {searchFeeds?.map((data) => (
            <Feed
              key={data.id}
              id={data.id}
              nickname={data.nickname}
              category={data.category}
              content={data.content}
              time={getTime(data.created_at)}
              like={data.count_likes}
              comment={data.count_comments}
              isLiked={data.is_liked}
              isSaved={data.is_marked}
              owner={data.is_owner}
              images={data.images}
              setFeeds={setSearchFeeds}
            />
          ))}
          {!searchFeeds && (
            <ul className='categoryList'>
              {CATEGORY.map((cate) => (
                <li
                  key={cate.id}
                  className='category'
                  onClick={handleSearchCategory}
                >
                  {'#' + cate.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {user.selected &&
        searchUsers?.map((data) => (
          <div key={data.id}>
            <p>{data.nickname}</p>
            <p>{data.account}</p>
          </div>
        ))}
    </Container>
  );
};

export default Search;

const Container = styled.div`
  width: 100%;
  overflow: scroll;
  margin-bottom: 100px;

  .formContainer {
    width: 80%;
    margin: 10px auto;
    display: flex;
    justify-content: center;

    .searchInput {
      width: 80%;
      padding: 8px 15px;
      border-right: none;
      border-radius: 5px 0 0 5px;
      color: ${({ theme }) => theme.text};
    }

    .btn {
      width: 20%;
      border: none;
      border-radius: 5px;
      background-color: ${({ theme }) => theme.mainColor};
      color: #fff;

      &:hover {
        background-color: ${({ theme }) => theme.subColor};
      }

      &:active {
        background-color: ${({ theme }) => theme.mainColor2};
      }
    }
  }

  .tabContainer {
    width: 90%;
    display: flex;
    margin: 20px auto 0 auto;
    font-size: 0.8rem;

    .tabMenu {
      width: 33%;
      padding: 12px 0 8px 0;
      border: 1px solid ${({ theme }) => theme.border};
      border-radius: 10px 10px 0 0;
      text-align: center;
      cursor: pointer;
    }

    .selected {
      background-color: ${({ theme }) => theme.mainColor};
      border: none;
      color: #fff;
    }
  }

  .categoryList {
    display: flex;
    flex-direction: column;
    align-items: center;

    .category {
      width: 90%;
      padding: 40px 0;
      border-bottom: 1px solid ${({ theme }) => theme.border};
      color: ${({ theme }) => theme.mainColor2};
      font-weight: 700;
      cursor: pointer;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        color: ${({ theme }) => theme.mainColor};
      }

      &:active {
        color: ${({ theme }) => theme.subColor};
      }
    }
  }

  .feedBox {
    width: 100%;
  }

  .noResult {
    height: 70vh;
  }
`;

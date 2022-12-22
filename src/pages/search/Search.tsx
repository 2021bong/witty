import axios from 'axios';
import { useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import styled from 'styled-components';
import Greeting from '../../components/Greeting';
import {
  URL_SEARCH,
  URL_SEARCH_USER,
  URL_SEARCH_CATEGORY,
} from '../../api/url';
import { useLocation } from 'react-router-dom';
import LoadingLogin from '../signup/LoadingLogin';

const Search = () => {
  const [searchData, setSearchData] = useState();
  const [textValue, setTextValue] = useState('');
  const [tabMenu, setTabMenu] = useState([
    {
      id: 1,
      name: '게시글',
      selected: true,
    },
    {
      id: 2,
      name: '유저',
      selected: false,
    },
    {
      id: 3,
      name: '카테고리',
      selected: false,
    },
  ]);
  const location = useLocation();

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
        .get(URL_SEARCH_CATEGORY(textValue))
        .then((res) => setSearchData(res.data))
        .catch((err) => console.log(err));
      return;
    }

    axios
      .get(URL_SEARCH(textValue))
      .then((res) => setSearchData(res.data))
      .catch((err) => console.log(err));
  }, []);

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
  };

  useEffect(() => {}, [tabMenu]);

  const handleSearch = () => {
    axios
      .get(URL_SEARCH_USER(textValue))
      .then((res) => setSearchData(res.data))
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
      <ul></ul>
    </Container>
  );
};

export default Search;

const Container = styled.div`
  width: 100%;

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
    margin: 20px auto;
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
`;

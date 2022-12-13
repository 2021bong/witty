import { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaSearch, FaUser } from 'react-icons/fa';
import { BsBellFill } from 'react-icons/bs';
import styled from 'styled-components';

const Dock = () => {
  const [dockState, setDockState] = useState([
    { id: 'home', selected: true },
    { id: 'search', selected: false },
    { id: 'notification', selected: false },
    { id: 'mypage', selected: false },
  ]);
  const [home, search, notification, mypage] = dockState;

  const handleDockMenu = (e: MouseEvent) => {
    const newDockState = [...dockState].map((state) =>
      state.id === e.currentTarget.id
        ? { id: state.id, selected: true }
        : { id: state.id, selected: false }
    );
    setDockState(newDockState);
  };

  return (
    <Box>
      <Link to='/'>
        <button
          onClick={handleDockMenu}
          className={home.selected ? 'selected' : 'iconBtn'}
          id='home'
        >
          <AiFillHome />
        </button>
      </Link>
      <button
        onClick={handleDockMenu}
        className={search.selected ? 'selected' : 'iconBtn'}
        id='search'
      >
        <FaSearch />
      </button>
      <button
        onClick={handleDockMenu}
        className={notification.selected ? 'selected' : 'iconBtn'}
        id='notification'
      >
        <BsBellFill />
      </button>
      <Link to='/mypage'>
        <button
          onClick={handleDockMenu}
          className={mypage.selected ? 'selected' : 'iconBtn'}
          id='mypage'
        >
          <FaUser />
        </button>
      </Link>
    </Box>
  );
};

export default Dock;

const Box = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 0;
  background-color: #fff;
  z-index: 1;

  .iconBtn {
    border: none;
    background-color: #fff;
    font-size: 2.3rem;
    color: ${({ theme }) => theme.text};

    &:first-child {
      font-size: 2.6rem;
    }
  }

  .selected {
    border: none;
    background-color: #fff;
    color: ${({ theme }) => theme.mainColor};
    font-size: 2.3rem;

    &:first-child {
      font-size: 2.6rem;
    }
  }
`;

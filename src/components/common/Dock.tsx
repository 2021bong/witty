import { useState, MouseEvent, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaSearch, FaUser } from 'react-icons/fa';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import styled from 'styled-components';

interface DockState {
  id: string;
  selected: boolean;
}

const Dock = () => {
  const [dockState, setDockState] = useState<DockState[]>([
    { id: 'home', selected: true },
    { id: 'search', selected: false },
    { id: 'chatting', selected: false },
    { id: 'mypage', selected: false },
  ]);
  const [home, search, chatting, mypage] = dockState;
  const locate = useLocation();

  const handleDockMenu = (e: MouseEvent) => {
    const newDockState = [...dockState].map((state) =>
      state.id === e.currentTarget.id
        ? { id: state.id, selected: true }
        : { id: state.id, selected: false }
    );
    setDockState(newDockState);
  };

  useEffect(() => {
    if (locate.pathname === '/') {
      setDockState((prev: DockState[]) =>
        prev.map((dock) =>
          dock.id === 'home'
            ? { id: dock.id, selected: true }
            : { id: dock.id, selected: false }
        )
      );
    }
    if (locate.pathname === '/search/category') {
      setDockState((prev: DockState[]) =>
        prev.map((dock) =>
          dock.id === 'search'
            ? { id: dock.id, selected: true }
            : { id: dock.id, selected: false }
        )
      );
    }
    if (locate.pathname.includes('/mypage')) {
      setDockState((prev: DockState[]) =>
        prev.map((dock) =>
          dock.id === 'mypage'
            ? { id: dock.id, selected: true }
            : { id: dock.id, selected: false }
        )
      );
    }
  }, [locate]);

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
      <Link to='/search'>
        <button
          onClick={handleDockMenu}
          className={search.selected ? 'selected' : 'iconBtn'}
          id='search'
        >
          <FaSearch />
        </button>
      </Link>
      <Link to='/chat'>
        <button
          onClick={handleDockMenu}
          className={chatting.selected ? 'selected' : 'iconBtn'}
          id='chatting'
        >
          <HiChatBubbleLeftRight className='chat' />
        </button>
      </Link>
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

  .chat {
    transform: scale(118%);
  }
`;

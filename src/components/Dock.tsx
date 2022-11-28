import { useState, MouseEvent } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaSearch, FaUser } from 'react-icons/fa';
import { BsBellFill } from 'react-icons/bs';
import styled from 'styled-components';

const Dock = () => {
  const [dockState, setDockState] = useState([
    { id: 'home', selected: true },
    { id: 'search', selected: false },
    { id: 'notification', selected: false },
    { id: 'my', selected: false },
  ]);

  const handleDockMenu = (e: MouseEvent) => {
    const newDockState = [...dockState].map((state) =>
      state.id === e.currentTarget.id
        ? { id: state.id, selected: true }
        : { id: state.id, selected: false }
    );
    setDockState(newDockState);
  };

  return (
    <Box className='dock'>
      <button
        onClick={handleDockMenu}
        className={dockState[0].selected ? 'selected' : 'iconBtn'}
        id='home'
      >
        <AiFillHome />
      </button>
      <button
        onClick={handleDockMenu}
        className={dockState[1].selected ? 'selected' : 'iconBtn'}
        id='search'
      >
        <FaSearch />
      </button>
      <button
        onClick={handleDockMenu}
        className={dockState[2].selected ? 'selected' : 'iconBtn'}
        id='notification'
      >
        <BsBellFill />
      </button>
      <button
        onClick={handleDockMenu}
        className={dockState[3].selected ? 'selected' : 'iconBtn'}
        id='my'
      >
        <FaUser />
      </button>
    </Box>
  );
};

export default Dock;

const Box = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 20px;
  background-color: #fff;

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

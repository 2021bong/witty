import { AiFillHome, AiFillBell } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import styled from 'styled-components';

const Dock = () => {
  return (
    <Box className='dock'>
      <AiFillHome className='icon' />
      <FaSearch className='icon' />
      <AiFillBell className='icon' />
      <BsFillPersonFill className='icon' />
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

  .icon {
    font-size: 2.3rem;

    &:first-child {
      color: ${({ theme }) => theme.mainColor};
    }
  }
`;

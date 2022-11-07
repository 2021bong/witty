import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const WittyLogin = () => {
  const [idValue, setIdValue] = useState('');
  const [pwValue, setPwValue] = useState('');

  const handleIdValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue(e.target.value);
  };

  const handlePwValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwValue(e.target.value);
  };

  return (
    <Main>
      <h3 className='greeting'>
        Hello <span>Witty!</span> 🐹
      </h3>
      <form className='formContainer' onSubmit={(e) => e.preventDefault()}>
        <div className='inputContainer'>
          <input
            type='text'
            id='id'
            placeholder='아이디'
            onChange={handleIdValue}
            value={idValue}
          />
          <input
            type='password'
            id='pw'
            placeholder='비밀번호'
            onChange={handlePwValue}
            value={pwValue}
          />
        </div>
      </form>
      <div className='btnContainer'>
        <button className='btn'>로그인</button>
        <Link to='/signup'>
          <button className='btn'>회원가입</button>
        </Link>
      </div>
    </Main>
  );
};

export default WittyLogin;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  min-height: 600px;
  max-width: 500px;
  margin: 100px auto;
  padding: 3rem;
  border: 1px solid #ddd;
  border-radius: 1rem;
  color: ${({ theme }) => theme.text};

  .greeting {
    font-size: 2rem;
    margin-bottom: 60px;
    span {
      color: ${({ theme }) => theme.mainColor};
    }
  }

  .formContainer {
    width: 80%;
    min-width: 270px;

    .inputContainer {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;

      label {
        margin-right: 5px;
      }

      input {
        display: inline-block;
        width: 100%;
        padding: 8px;
        border-radius: 0.6rem;

        &:first-child {
          margin-bottom: 10px;
        }
      }
    }
  }

  .btnContainer {
    width: 80%;
    min-width: 270px;

    .btn {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 8px;
      color: #fff;
      background-color: ${({ theme }) => theme.mainColor};

      &:hover {
        background-color: ${({ theme }) => theme.subColor};
      }

      &:active {
        background-color: ${({ theme }) => theme.mainColor2};
      }

      &:first-of-type {
        margin-bottom: 5px;
      }
    }
  }
`;

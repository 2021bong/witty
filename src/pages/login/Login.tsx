import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import SignUpBtn from '../../components/SignUpBtn';
import { LoginProp } from '../../utils/interface';

const { Kakao } = window as any;

const Login = ({ getToken }: LoginProp) => {
  const [idValue, setIdValue] = useState('');
  const [pwValue, setPwValue] = useState('');

  const handleIdValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue(e.target.value);
  };

  const handlePwValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwValue(e.target.value);
  };

  const onLogin = () => {
    if (idValue.length !== 0 && pwValue.length !== 0) {
      axios
        .post('http://localhost:8000/users/signin', {
          account: idValue,
          password: pwValue,
        })
        .then((res) => {
          window.localStorage.setItem('token', res.data.result.token);
          getToken();
        })
        .catch((err) => console.log(err));
    } else {
      alert('아이디와 비밀번호를 입력해주세요.');
    }
  };

  const handleKaKaoLogin = () => {
    Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
    Kakao.Auth.authorize({
      redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URL,
      serviceTerms: 'account_email',
      prompts: 'none',
    });
  };

  return (
    <Main>
      <h3 className='greeting'>
        Hello, <span>Witty!</span> 🐹
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
        <button
          className={
            idValue.length >= 6 && pwValue.length >= 8 ? 'btn' : 'disbledBtn'
          }
          onClick={onLogin}
        >
          로그인
        </button>
        <Link to='/signup'>
          <SignUpBtn btnText='회원가입' />
        </Link>
        <KakaoBtn onClick={handleKaKaoLogin}>
          <p className='text'>카카오로 시작하기</p>
          <div className='imgBox'></div>
        </KakaoBtn>
      </div>
    </Main>
  );
};

export default Login;

const KakaoBtn = styled.button`
  position: relative;
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  border: none;
  border-radius: 12px;
  background-color: #fee501;
  overflow: hidden;

  &:hover {
    background-color: #f1da00;
  }

  &:active {
    background-color: #fee501;
  }

  .text {
    color: 191600;
    z-index: 1;
  }

  .imgBox {
    position: absolute;
    width: inherit;
    height: inherit;
    background: left/15% no-repeat url('kakao_login_logo.png');
    left: 0;
    top: 0;
  }
`;

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
      border-radius: 12px;
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

    .disbledBtn {
      width: 100%;
      height: 40px;
      margin-bottom: 5px;
      border: none;
      border-radius: 12px;
      border: 1px solid #ddd;
      background-color: #fff;
      cursor: default;

      &:active {
        background-color: #ddd;
      }
    }
  }
`;

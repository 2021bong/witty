import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import {
  checkEmail,
  checkName,
  checkId,
  checkPw,
} from '../../utils/validation';
import axios from 'axios';

const SignUp = () => {
  const [idValue, setIdValue] = useState('');
  const [pwValue, setPwValue] = useState('');
  const [pw2Value, setPw2Value] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const navigate = useNavigate();

  const handleIdValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue(e.target.value);
  };

  const handlePwValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwValue(e.target.value);
  };

  const handlePw2Value = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw2Value(e.target.value);
  };

  const handleNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  const handleEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const checkingEmail = () => {
    axios
      .get(`http://localhost:8000/validation?email=${emailValue}`)
      .then((msg) => console.log(msg));
  };

  const checkingId = () => {
    axios
      .get(`http://localhost:8000/validation?id=${idValue}`)
      .then((msg) => console.log(msg));
  };

  const checkSignUp = () => {
    if (
      checkEmail(emailValue) &&
      checkName(nameValue) &&
      checkId(idValue) &&
      checkPw(pwValue) &&
      pwValue === pw2Value
    ) {
      axios
        .post('http://localhost:8000/signup')
        .then((msg) => console.log(msg));
      navigate('/');
    } else {
      alert('가입 정보를 확인해주세요!✋');
    }
  };

  return (
    <Main>
      <h3 className='title'>🐹 회원가입</h3>
      <form className='formContainer' onSubmit={(e) => e.preventDefault()}>
        <div className='inputContainer'>
          <label htmlFor='email'>이메일</label>
          <div className='inputBtnContainer'>
            <input
              type='text'
              id='email'
              placeholder='@ 포함 이메일 형식'
              onChange={handleEmailValue}
              value={emailValue}
              className='inputWithBtn'
            />
            <button className='btn' onClick={checkingEmail}>
              중복 확인
            </button>
          </div>
          {checkEmail(emailValue) ? (
            <p className='true desc'>사용가능한 이메일입니다.😀</p>
          ) : (
            <p className='desc'>🚨 올바른 이메일 형식이 아닙니다.</p>
          )}
        </div>
        <div className='inputContainer'>
          <label htmlFor='name'>이름</label>
          <input
            type='text'
            id='name'
            placeholder='8자 이하'
            onChange={handleNameValue}
            value={nameValue}
          />
          {checkName(nameValue) ? (
            <p className='true desc'>사용가능한 이름입니다.😀</p>
          ) : (
            <p className='desc'>🚨 8자 이하의 이름만 설정가능합니다.</p>
          )}
        </div>
        <div className='inputContainer'>
          <label htmlFor='id'>아이디</label>
          <div className='inputBtnContainer'>
            <input
              type='text'
              id='id'
              placeholder='영문+숫자 12자 이하'
              onChange={handleIdValue}
              value={idValue}
              className='inputWithBtn'
            />
            <button className='btn' onClick={checkingId}>
              중복 확인
            </button>
          </div>
          {checkId(idValue) ? (
            <p className='true desc'>사용가능한 아이디입니다.😀</p>
          ) : (
            <p className='desc'>사용할 수 없는 아이디입니다.🥲</p>
          )}
        </div>
        <div className='inputContainer'>
          <label htmlFor='pw'>비밀번호</label>
          <input
            type='password'
            id='pw'
            placeholder='영문+숫자+특수문자 6자 이상 15자 이하'
            onChange={handlePwValue}
            value={pwValue}
          />
          {checkPw(pwValue) ? (
            <p className='true desc'>사용가능한 비밀번호입니다.😀</p>
          ) : (
            <p className='desc'>
              🚨 영문+숫자+특수문자 조합의 6자 - 15자만 가능합니다.
            </p>
          )}
        </div>
        <div className='inputContainer'>
          <label htmlFor='pw2'>비밀번호 확인</label>
          <input
            type='password'
            id='pw2'
            placeholder='비밀번호를 다시 입력해주세요.'
            onChange={handlePw2Value}
            value={pw2Value}
          />
          {pwValue !== '' && pw2Value === pwValue ? (
            <p className='true desc'>비밀번호가 일치합니다👏</p>
          ) : (
            <p className='desc'>🚨 비밀번호가 일치하지 않습니다.</p>
          )}
        </div>
      </form>
      <div className='btnContainer'>
        <button className='btn' onClick={checkSignUp}>
          회원가입 하기
        </button>
        <Link to='/'>
          <button className='cancelBtn'>취소</button>
        </Link>
      </div>
    </Main>
  );
};

export default SignUp;

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

  .title {
    font-size: 2rem;
    margin-bottom: 60px;
    color: ${({ theme }) => theme.mainColor};
  }

  .formContainer {
    width: 80%;
    min-width: 270px;

    .inputContainer {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 30px;

      .desc {
        font-weight: 400;
        margin-top: 8px;
        font-size: 0.9rem;
        color: ${({ theme }) => theme.subColor};
      }

      .true {
        color: ${({ theme }) => theme.mainColor2};
      }

      .inputBtnContainer {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;

        .inputWithBtn {
          margin-right: 5px;
          margin-bottom: 0;
        }

        .btn {
          height: 100%;
          min-width: 80px;
          padding: 8px;
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
        }
      }

      label {
        margin-bottom: 5px;
        font-weight: 700;
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

    .cancelBtn {
      width: 100%;
      height: 40px;
      border: 1px solid #ccc;
      border-radius: 8px;
      color: ${({ theme }) => theme.text};
      background-color: #fff;

      &:hover {
        color: #fff;
        background-color: ${({ theme }) => theme.mainColor};
      }

      &:active {
        color: #fff;
        background-color: ${({ theme }) => theme.mainColor2};
      }

      &:first-of-type {
        margin-bottom: 5px;
      }
    }
  }
`;

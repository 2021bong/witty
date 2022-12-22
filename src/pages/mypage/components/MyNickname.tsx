import axios from 'axios';
import { ChangeEvent, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { checkName } from '../../../utils/validation';
import { URL_MYPAGE_NAME, URL_MYPAGE } from '../../../api/url';

const Nickname = () => {
  const [nickname, setNickname] = useState('');
  const [textValue, setTextValue] = useState('');
  const navigate = useNavigate();
  const handleWriteText = (e: ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  useEffect(() => {
    // axios
    //   .get('../data/mypage.json')
    //   .then((res) => {
    //     setNickname(res.data.data.nickname);
    //   })
    //   .catch((err) => console.log(err));

    axios
      .get(URL_MYPAGE, {
        headers: { Authorization: localStorage.getItem('token') },
      })
      .then((res) => {
        setNickname(res.data.nickname);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = () => {
    if (!textValue.length) {
      alert('닉네임을 입력해주세요. 😢');
      return;
    }
    if (textValue.length > 8) {
      alert('닉네임은 8자까지 가능합니다. 🥺');
      return;
    }
    axios
      .patch(
        URL_MYPAGE_NAME,
        { nickname: textValue },
        { headers: { Authorization: localStorage.getItem('token') } }
      )
      .then((res) => {
        alert('변경되었습니다. 😀');
        navigate('/mypage');
      })
      .catch((err) => {
        alert(`변경에 실패했습니다. 잠시 후에 다시 시도해주세요. 😭 \n ${err}`);
        navigate('/mypage');
      });
  };

  return (
    <Container>
      <div className='titleContainer'>
        <h4>닉네임 수정</h4>
        <p className='nickname'>지금은</p>
        <p className='nickname'>{nickname && nickname}</p>
      </div>
      <form onClick={(e) => e.preventDefault()}>
        <input
          type='text'
          value={textValue}
          onChange={handleWriteText}
          placeholder='변경하실 닉네임을 적어주세요!'
          required
        />
        {checkName(textValue) ? (
          <p className='true desc'>사용가능한 이름입니다.😀</p>
        ) : (
          <p className='desc'>🚨 8자 이하의 이름만 설정가능합니다.</p>
        )}
      </form>
      <button onClick={handleSubmit}>변경하기</button>
      <Link to='/mypage'>
        <button className='cancel'>취소하기</button>
      </Link>
    </Container>
  );
};

export default Nickname;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 90%;
  text-align: center;

  .titleContainer {
    margin-bottom: 50px;

    h4 {
      margin-bottom: 30px;
      color: ${({ theme }) => theme.mainColor2};
      font-size: 1.5rem;
    }

    .nickname {
      &:first-of-type {
        margin-bottom: 10px;
      }

      &:last-of-type {
        color: ${({ theme }) => theme.mainColor};
        font-size: 1.3rem;
        font-weight: 700;
      }
    }
  }

  form {
    width: 80%;
    margin-bottom: 50px;

    input {
      width: 100%;
      margin-bottom: 5px;
      padding: 10px;
      border-radius: 10px;
    }

    .desc {
      margin-bottom: 50px;
      font-weight: 400;
      margin-top: 8px;
      font-size: 0.9rem;
      color: ${({ theme }) => theme.subColor};
    }

    .true {
      color: ${({ theme }) => theme.mainColor2};
    }
  }

  button {
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
      margin-bottom: 10px;
    }
  }

  a {
    display: inline-block;
    width: 100%;

    .cancel {
      border: 1px solid ${({ theme }) => theme.border};
      border-radius: 12px;
      background-color: #fff;
      color: ${({ theme }) => theme.text};

      &:hover {
        border: none;
        background-color: ${({ theme }) => theme.mainColor};
        color: #fff;
      }

      &:active {
        border: none;
        background-color: ${({ theme }) => theme.mainColor2};
        color: #fff;
      }
    }
  }
`;

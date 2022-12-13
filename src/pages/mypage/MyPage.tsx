import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiTwotoneSetting } from 'react-icons/ai';
import { BsCreditCard2FrontFill } from 'react-icons/bs';
import styled from 'styled-components';
import Greeting from '../../components/Greeting';
import Dock from '../../components/Dock';

const MyPage = () => {
  const [nickname, setNickname] = useState();
  const [userId, setUserId] = useState();
  useEffect(() => {
    axios
      .get('data/mypage.json')
      .then((res) => {
        setNickname(res.data.data.nickname);
        setUserId(res.data.data.user_id);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <Greeting text='Look at the information about you.' />
      <div className='wrap'>
        <div className='infoContainer'>
          <p className='hello'>Hello! 🐹</p>
          <p className='nicknameBox'>
            <span className='nickname'>{nickname && nickname}</span>
            <span>@{userId && userId}</span>
          </p>
        </div>
        <ul className='menuList'>
          <div className='listBox'>
            <BsCreditCard2FrontFill className='icon card' />
            <li>내 게시글</li>
            <li>북마크</li>
          </div>
          <div className='listBox'>
            <AiTwotoneSetting className='icon' />
            <li>닉네임 수정</li>
            <li>회원탈퇴</li>
          </div>
        </ul>
      </div>
      <Dock />
    </Container>
  );
};
export default MyPage;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 90vh;
  max-width: 500px;
  margin: 50px auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 1rem;
  color: ${({ theme }) => theme.text};

  .wrap {
    width: 100%;
  }

  .infoContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;

    .hello {
      margin-bottom: 10px;
      color: ${({ theme }) => theme.mainColor};
      text-align: center;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .nicknameBox {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 80%;
      padding: 30px;
      background-color: ${({ theme }) => theme.mainColor};
      border-radius: 20px;
      color: ${({ theme }) => theme.border};

      .nickname {
        margin-bottom: 5px;
        font-size: 1.5rem;
        font-weight: 600;
        color: #fff;
      }
    }
  }

  .menuList {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .listBox {
      width: 80%;
      padding: 30px;
      border-bottom: 1px solid ${({ theme }) => theme.border};

      &:last-child {
        border-bottom: none;
      }

      .icon {
        margin-bottom: 20px;
        color: ${({ theme }) => theme.mainColor2};
        font-size: 2.5rem;
      }

      .card {
        transform: rotate(-180deg) scaleX(-1);
        font-size: 2.2rem;
      }

      li {
        position: relative;
        width: 30%;
        margin-bottom: 20px;
        margin-left: 5px;
        cursor: pointer;

        &:before {
          content: '';
          position: absolute;
          left: -13px;
          top: 3px;
          width: 5px;
          height: 5px;
          border-radius: 1px;
          background-color: ${({ theme }) => theme.mainColor2};
        }

        &:hover {
          font-weight: 700;
          color: ${({ theme }) => theme.mainColor};
        }
        &:active {
          color: ${({ theme }) => theme.mainColor2};
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
`;

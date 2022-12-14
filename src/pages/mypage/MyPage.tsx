import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiTwotoneSetting } from 'react-icons/ai';
import { BsCreditCard2FrontFill } from 'react-icons/bs';
import styled from 'styled-components';
import { LoginoutProp } from '../../utils/interface';

const MyPage = ({ getToken }: LoginoutProp) => {
  const [nickname, setNickname] = useState();
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // axios
    //   .get('data/mypage.json')
    //   .then((res) => {
    //     setNickname(res.data.data.nickname);
    //     setUserId(res.data.data.user_id);
    //   })
    //   .catch((err) => console.log(err));

    axios
      .get('http://localhost:8000/users/my', {
        headers: { Authorization: localStorage.getItem('token') },
      })
      .then((res) => {
        setNickname(res.data.nickname);
        setUserId(res.data.account);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    getToken();
    navigate('/');
  };

  return (
    <Container>
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
          <li className='bulet'>내 게시글</li>
          <li className='bulet'>북마크</li>
        </div>
        <div className='listBox'>
          <AiTwotoneSetting className='icon' />
          <Link to='/mypage/nickname'>
            <li className='bulet'>닉네임 수정</li>
          </Link>
          <li className='bulet'>회원탈퇴</li>
        </div>
        <div className='listBox'>
          <li className='logout' onClick={handleLogout}>
            👉 로그아웃
          </li>
        </div>
      </ul>
    </Container>
  );
};
export default MyPage;

const Container = styled.div`
  width: 100%;
  margin-top: 50px;

  .infoContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 30px;

    .hello {
      margin-bottom: 20px;
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
      width: 100%;
      padding: 30px 40px;
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

      .bulet {
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

    .logout {
      margin-top: 15px;
      color: ${({ theme }) => theme.mainColor};
      font-weight: 700;
      cursor: pointer;

      &:hover {
        color: ${({ theme }) => theme.mainColor};
      }
      &:active {
        color: ${({ theme }) => theme.mainColor2};
      }
    }
  }
`;

import axios from 'axios';
import { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { URL_DELETE_USER } from '../../../api/url';
import { LoginoutProp } from '../../../utils/interface';

const MyWithdrawal = ({ getToken }: LoginoutProp) => {
  const navigate = useNavigate();

  const handleWithdrawal = (e: MouseEvent) => {
    axios
      .delete('URL_DELETE_USER', {
        headers: { Authorization: localStorage.getItem('token') },
      })
      .then((res) => {
        localStorage.removeItem('token');
        alert('탈퇴되었습니다.\n이용해주셔서 감사합니다.');
        getToken();
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <h4>회원 탈퇴</h4>
      <p>정말 탈퇴하시겠습니까?</p>
      <button className='yes' onClick={handleWithdrawal}>
        네
      </button>
      <Link to='/mypage'>
        <button className='no'>아니오</button>
      </Link>
    </Container>
  );
};

export default MyWithdrawal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 90%;
  text-align: center;

  h4 {
    margin-bottom: 30px;
    color: ${({ theme }) => theme.mainColor2};
    font-size: 1.5rem;
  }

  p {
    margin-bottom: 50px;
    color: ${({ theme }) => theme.text};
  }

  button,
  a {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 12px;

    &:first-of-type {
      margin-bottom: 10px;
    }
  }

  .yes {
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.border};
    background-color: #fff;

    &:hover {
      border: none;
      background-color: ${({ theme }) => theme.mainColor};
      color: #fff;
    }

    &:active {
      background-color: ${({ theme }) => theme.mainColor2};
    }
  }

  .no {
    color: #fff;
    background-color: ${({ theme }) => theme.mainColor};

    &:hover {
      background-color: ${({ theme }) => theme.subColor};
    }

    &:active {
      background-color: ${({ theme }) => theme.mainColor2};
    }
  }
`;

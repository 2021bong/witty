import { useState, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Dock from '../../../components/Dock';
import Greeting from '../../../components/Greeting';

const Write = () => {
  const [textValue, setTextValue] = useState('');
  const navigate = useNavigate();

  const handleWriteText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 140) {
      setTextValue((prev) => prev);
    } else {
      setTextValue(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (textValue.length) {
      axios
        .post('http://localhost:8000/post', {
          token: localStorage.getItem('token'),
          content: textValue,
        })
        .then((res) => navigate('/'))
        .catch((err) => {
          alert(
            '작성에 실패했습니다. 잠시 뒤 다시 시도해 주세요.🥲' + '\n' + err
          );
          navigate('/');
        });
    } else {
      alert('내용을 작성해 주세요!🥺');
    }
  };

  const setColor = () => {
    if (textValue.length < 100) {
      return '#00B388';
    } else if (textValue.length < 120) {
      return '#FAB922';
    } else {
      return '#FA3270';
    }
  };

  return (
    <Container>
      <Greeting text='What are you doing now?' />
      <main className='mainContainer'>
        <form onSubmit={(e) => e.preventDefault()}>
          <textarea
            className='writeBoard'
            name='content'
            id='writeContent'
            value={textValue}
            onChange={handleWriteText}
          />
        </form>
        <div className='propContainer'>
          <div className='lengthContainer'>
            <NoticeCurcle noticeColor={setColor()} /> {textValue.length} / 140
          </div>
          <div className='btnContainer'>
            <Link to='/'>
              <button className='cancleBtn'>취소</button>
            </Link>
            <button className='completeBtn' onClick={handleSubmit}>
              작성
            </button>
          </div>
        </div>
      </main>
      <Dock />
    </Container>
  );
};

export default Write;

const NoticeCurcle = styled.span`
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: ${({ noticeColor }: { noticeColor: string }) =>
    noticeColor};
  transform: translateY(-2px);
`;

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

  .mainContainer {
    width: 100%;
    height: 100%;

    form {
      height: 40%;

      .writeBoard {
        width: 100%;
        height: 100%;
        padding: 20px;
        border-radius: 10px;
        border: 1px solid ${({ theme }) => theme.border};
      }
    }

    .propContainer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;

      .lengthContainer {
        padding-left: 8px;
      }

      .btnContainer {
        display: flex;
        justify-content: flex-end;
        padding-right: 8px;

        button {
          padding: 10px;
          border: none;
          border-radius: 10px;
        }

        .cancleBtn {
          &:hover {
            background-color: ${({ theme }) => theme.mainColor};
            color: #fff;
          }
          &:active {
            background-color: ${({ theme }) => theme.mainColor2};
            color: #fff;
          }
        }

        .completeBtn {
          margin-left: 5px;
          background-color: ${({ theme }) => theme.mainColor};
          color: #fff;

          &:hover {
            background-color: ${({ theme }) => theme.subColor};
          }
          &:active {
            background-color: ${({ theme }) => theme.mainColor2};
          }
        }
      }
    }
  }
`;

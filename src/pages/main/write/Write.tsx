import { useState, MouseEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { IoMdPhotos } from 'react-icons/io';
import Dock from '../../../components/Dock';
import Greeting from '../../../components/Greeting';

const Write = () => {
  const [textValue, setTextValue] = useState('');
  const [categorys, setCategorys] = useState([
    { id: 1, name: '#오늘아무거나', selected: true },
    { id: 2, name: '#오늘기분', selected: false },
    { id: 3, name: '#오늘소비', selected: false },
    { id: 4, name: '#오늘잡담', selected: false },
    { id: 5, name: '#오늘먹은것', selected: false },
  ]);
  const [photos, setPhotos] = useState([
    { id: 1, file: null },
    { id: 2, file: null },
    { id: 3, file: null },
    { id: 4, file: null },
  ]);
  const navigate = useNavigate();

  const handleSelectedCategory = (e: MouseEvent<HTMLLIElement>) => {
    const selectedName = e.currentTarget.textContent;
    setCategorys((prev) =>
      prev.map((category) =>
        category.name === selectedName
          ? { ...category, selected: true }
          : { ...category, selected: false }
      )
    );
  };

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
        .post(
          'http://localhost:8000/posts',
          {
            content: textValue,
            category: categorys.filter(
              (category) => category.selected === true
            )[0].name,
          },
          { headers: { Authorization: localStorage.getItem('token') } }
        )
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
        <ul className='categoryContainer'>
          {categorys.map((category) =>
            category.selected ? (
              <li
                key={category.id}
                className='category selected'
                onClick={handleSelectedCategory}
              >
                {category.name}
              </li>
            ) : (
              <li
                key={category.id}
                className='category'
                onClick={handleSelectedCategory}
              >
                {category.name}
              </li>
            )
          )}
        </ul>
        <form onSubmit={(e) => e.preventDefault()}>
          <textarea
            className='writeBoard'
            name='content'
            id='writeContent'
            value={textValue}
            onChange={handleWriteText}
          />
        </form>
        <div className='photoContainer'>
          {photos[3].file ? (
            <IoMdPhotos className='photoIcon disabled' />
          ) : (
            <IoMdPhotos className='photoIcon' />
          )}
          {photos.map((photo) =>
            photo.file ? (
              <span key={photo.id} className='countPhotoBox fill'></span>
            ) : (
              <span key={photo.id} className='countPhotoBox'></span>
            )
          )}
        </div>
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

    .categoryContainer {
      display: flex;
      margin-bottom: 10px;

      .category {
        margin-right: 5px;
        padding: 5px;
        border: 1px solid ${({ theme }) => theme.mainColor};
        border-radius: 5px;
        font-size: 14px;
        color: ${({ theme }) => theme.mainColor};
        cursor: pointer;
      }

      .selected {
        background-color: ${({ theme }) => theme.mainColor};
        color: #fff;
      }
    }

    form {
      height: 40%;
      margin-bottom: 10px;

      .writeBoard {
        width: 100%;
        height: 100%;
        padding: 20px;
        border-radius: 10px;
        border: 1px solid ${({ theme }) => theme.border};
      }
    }

    .photoContainer {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .photoIcon {
        margin-right: 10px;
        color: ${({ theme }) => theme.mainColor};
        font-size: 1.5rem;
        cursor: pointer;
      }

      .disabled {
        color: ${({ theme }) => theme.text};
        cursor: not-allowed;
      }

      .countPhotoBox {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        margin-right: 5px;
        border: 1px solid ${({ theme }) => theme.mainColor};
        border-radius: 50%;
      }

      .fill {
        border: none;
        background-color: ${({ theme }) => theme.mainColor};
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

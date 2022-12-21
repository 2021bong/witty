import { useState, MouseEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiFillCloseCircle } from 'react-icons/ai';
import { IoMdPhotos } from 'react-icons/io';

import Dock from '../Dock';
import Greeting from '../Greeting';
import { NoticeCurcle, Preview, Container } from './Write.styled';

import { PhotosType, WriteProps, Category } from '../../utils/interface';
import { URL_CREATE_POST } from '../../utils/url';
import { PHOTO_INDEX, CATEGORY } from '../../utils/constant';
import { getCategory, getImage, setColor } from '../../utils/function';
import { useEffect } from 'react';

const Write = ({ type, id, category, content, images }: WriteProps) => {
  const [textValue, setTextValue] = useState<string>('');
  const [categorys, setCategorys] = useState(CATEGORY);
  const [unqPhotoIndex, setUnqPhotoIndex] = useState(1);
  const [photos, setPhotos] = useState<PhotosType>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTextValue(content || '');
    setCategorys(getCategory(category));
    setPhotos(getImage(images, unqPhotoIndex));
    setUnqPhotoIndex((prev) => prev + 1);
  }, [content]);

  const handleSelectedCategory = (e: MouseEvent<HTMLLIElement>) => {
    const selectedName = e.currentTarget.textContent;
    setCategorys((prev) =>
      prev.map((category) =>
        category.name === selectedName
          ? { ...category, selected: !category.selected }
          : { ...category, selected: category.selected }
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

  const handleGetPhotos = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = {
      id: unqPhotoIndex,
      file: e.target.files,
      previewUrl: e.target.files
        ? URL.createObjectURL(e.target.files[0])
        : null,
    };
    setPhotos((prev) => [...prev, newFiles]);
    setUnqPhotoIndex((prev) => prev + 1);
  };

  const removePhoto = (e: MouseEvent<SVGElement>) => {
    const deleteTarget = photos[+e.currentTarget.id];
    const newPhotos = [...photos].filter((photo) => photo !== deleteTarget);
    setPhotos(newPhotos);
  };

  const handleSubmit = () => {
    if (textValue.length) {
      axios
        .post(
          URL_CREATE_POST,
          {
            content: textValue,
            category: categorys
              .filter((category) => category.selected === true)
              .map((el) => el.name.split('#')[1]),
            images: photos.map((photo) => photo.previewUrl),
          },
          { headers: { Authorization: localStorage.getItem('token') } }
        )
        .then((res) => navigate('/'))
        .catch((err) => {
          alert(
            `${
              type === 'create' ? '작성' : '수정'
            }에 실패했습니다. 잠시 뒤 다시 시도해 주세요.🥲` +
              '\n' +
              err
          );
          navigate('/');
        });
    } else {
      alert('내용을 작성해 주세요!🥺');
    }
  };

  return (
    <Container>
      <Greeting text='What are you doing now?' />
      <main className='mainContainer'>
        <ul className='categoryContainer'>
          {categorys?.map((category) =>
            category.selected ? (
              <li
                key={category.id}
                className='category selected'
                onClick={handleSelectedCategory}
              >
                {'#' + category.name}
              </li>
            ) : (
              <li
                key={category.id}
                className='category'
                onClick={handleSelectedCategory}
              >
                {'#' + category.name}
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
          {photos[0]?.previewUrl && (
            <ul className='preveiwContainer'>
              {photos.map(
                (photo, i) =>
                  photo.previewUrl && (
                    <Preview key={photo.id} $imgUrl={photo.previewUrl}>
                      <AiFillCloseCircle
                        className='delete'
                        onClick={removePhoto}
                        id={i.toString()}
                      />
                    </Preview>
                  )
              )}
            </ul>
          )}
          {
            <div className='inputAndLabelContainer'>
              {photos[3]?.previewUrl ? (
                <>
                  <label htmlFor='upload'>
                    <IoMdPhotos className='photoIcon disabled' />
                  </label>
                  <input
                    className='hiddenFileInput'
                    type='file'
                    id='upload'
                    name='upload'
                    accept='image/png, image/jpeg'
                    disabled={true}
                  />
                </>
              ) : (
                <>
                  <label htmlFor='upload'>
                    <IoMdPhotos className='photoIcon' />
                  </label>
                  <input
                    className='hiddenFileInput'
                    type='file'
                    id='upload'
                    name='upload'
                    accept='image/png, image/jpeg'
                    onChange={handleGetPhotos}
                  />
                </>
              )}
              {PHOTO_INDEX.map((el) => (
                <span
                  key={el}
                  className={
                    photos[el]?.previewUrl
                      ? 'countPhotoBox fill'
                      : 'countPhotoBox'
                  }
                ></span>
              ))}
            </div>
          }
        </div>
        <div className='propContainer'>
          <div className='lengthContainer'>
            <NoticeCurcle noticeColor={setColor(textValue)} />
            {textValue.length} / 140
          </div>
          <div className='btnContainer'>
            <Link to='/'>
              <button className='cancleBtn'>취소</button>
            </Link>
            <button className='completeBtn' onClick={handleSubmit}>
              {type === 'create' ? '작성' : '수정'}
            </button>
          </div>
        </div>
      </main>
    </Container>
  );
};

export default Write;

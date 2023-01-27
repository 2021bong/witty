import { useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillCloseCircle } from 'react-icons/ai';
import { IoMdPhotos } from 'react-icons/io';

import Greeting from '../common/Greeting';
import Spinner from '../../components/write/Spinner';
import {
  NoticeCurcle,
  Preview,
  Container,
} from '../../styles/pages/Write.styled';

import { PhotosType, WriteProps } from '../../utils/types';
import { PHOTO_INDEX, CATEGORY } from '../../utils/constant';
import { getCategory, setColor } from '../../utils/function';
import createNewPost from '../../api/createPost';
import uploadPhotos from '../../api/uploadPhoto';
import modifyPost from '../../api/modifyPost';

const Write = ({ type, id, category, content, images }: WriteProps) => {
  const [textValue, setTextValue] = useState<string>('');
  const [categorys, setCategorys] = useState(CATEGORY);
  const [unqPhotoIndex, setUnqPhotoIndex] = useState(1);
  const [photos, setPhotos] = useState<PhotosType>([]);
  const [uploadImgUrls, setUploadImgUrls] = useState<string[] | []>([]);
  const [getUrlLoading, setGetUrlLoading] = useState(false);
  const navigate = useNavigate();

  if (type === 'edit') {
    useEffect(() => {
      setTextValue(content || '');
      setCategorys(getCategory(category));
      setUnqPhotoIndex((prev) => prev + 1);
      if (images) {
        const imagesObj = images.map((url, i) => {
          return { id: i + 1, previewUrl: url };
        });
        setPhotos(imagesObj);
        setUnqPhotoIndex(images.length + 1);
      }
    }, [content]);
  }

  const handleSelectedCategory = (e: MouseEvent<HTMLLIElement>) => {
    const selectedName = e.currentTarget.textContent;
    setCategorys((prev) =>
      prev.map((category) =>
        '#' + category.name === selectedName
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
    if (!e.target.files) return;
    const newFiles = {
      id: unqPhotoIndex,
      file: e.target.files[0],
      previewUrl: URL.createObjectURL(e.target.files[0]),
    };
    setPhotos((prev) => [...prev, newFiles]);
    setUnqPhotoIndex((prev) => prev + 1);
  };

  const handleResetValue = (e: MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = '';
  };

  const removePhoto = (e: MouseEvent<SVGElement>) => {
    const deleteTarget = photos[+e.currentTarget.id];
    const newPhotos = [...photos].filter((photo) => photo !== deleteTarget);
    setPhotos(newPhotos);
  };

  useEffect(() => {
    if (!!!uploadImgUrls.length) return;
    if (type === 'create' && photos.length === uploadImgUrls.length) {
      createNewPost(textValue, categorys, navigate, uploadImgUrls);
    }
    if (type === 'edit') {
      const prevPhoto = photos.filter((photoObj) => !!!photoObj.file);
      if (photos.length === prevPhoto.length + uploadImgUrls.length) {
        const prevPhotoUrls = prevPhoto.map((obj) => obj.previewUrl);
        const allPhotoUrls = [...prevPhotoUrls, uploadImgUrls].flat();
        modifyPost(textValue, categorys, navigate, id, allPhotoUrls);
      }
    }
  }, [uploadImgUrls]);

  const handleSubmit = () => {
    if (type === 'create') {
      if (textValue.length && !!photos.length) {
        uploadPhotos(photos, setUploadImgUrls);
        setGetUrlLoading(true);
      } else if (textValue.length) {
        createNewPost(textValue, categorys, navigate);
        setGetUrlLoading(true);
      } else {
        alert('내용을 작성해 주세요!🥺');
      }
    } else {
      if (!!photos.length) {
        setGetUrlLoading(true);
        if (photos[photos.length - 1].file) {
          const changedPhoto: PhotosType = photos.filter(
            (photo) => !!photo.file
          );
          uploadPhotos(changedPhoto, setUploadImgUrls);
          return;
        }
        if (
          photos[photos.length - 1].previewUrl?.includes('res.cloudinary.com')
        ) {
          modifyPost(
            textValue,
            categorys,
            navigate,
            id,
            photos.map((obj) => obj.previewUrl)
          );
          return;
        }
        modifyPost(textValue, categorys, navigate, id);
      } else if (!!textValue.length) {
        modifyPost(textValue, categorys, navigate, id, []);
        setGetUrlLoading(true);
      } else {
        alert('내용을 작성해 주세요!🥺');
      }
    }
  };

  return (
    <Container>
      {getUrlLoading && <Spinner />}
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
                    onClick={handleResetValue}
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

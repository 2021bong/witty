import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { Category, PhotosType } from '../utils/interface';
import { URL_CREATE_POST } from './url';

interface Data {
  content: string;
  category: string[];
  images?: string[];
}

export const createNewPost = async (
  text: string,
  categorys: Category[],
  navigate: NavigateFunction,
  type: string,
  images?: string[]
) => {
  const data: Data = {
    content: text,
    category: categorys
      .filter((category) => category.selected === true)
      .map((cate) => cate.name),
  };

  if (images?.length) {
    data.images = images;
  }

  await axios
    .post(URL_CREATE_POST, data, {
      headers: { Authorization: localStorage.getItem('token') },
    })
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
};

type setState = React.Dispatch<React.SetStateAction<string[] | []>>;

export const uploadPhotos = (
  photos: PhotosType,
  setUploadImgUrls: setState
) => {
  const formData = new FormData();
  for (let i = 0; i < photos.length; i += 1) {
    formData.append('file', photos[i].file);
    formData.append(
      'upload_preset',
      import.meta.env.VITE_CLOUDINARY_UNSIGINED_KEY
    );
    formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
    formData.append('timestamp', Date.now().toString());

    fetch(import.meta.env.VITE_CLOUDINARY_URL_UPLOAD, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => setUploadImgUrls((prev) => [...prev, res.url]));
  }
};

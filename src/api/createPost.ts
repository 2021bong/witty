import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { Category, PhotosType } from '../utils/interface';
import token from './token';
import { URL_CREATE_POST } from './url';

export interface Data {
  content: string;
  category: string[];
  images?: string[];
}

export const createNewPost = async (
  text: string,
  categorys: Category[],
  navigate: NavigateFunction,
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
      headers: token,
    })
    .then((res) => navigate('/'))
    .catch((err) => {
      alert('작성에 실패했습니다. 잠시 뒤 다시 시도해 주세요.🥲' + '\n' + err);
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
    formData.append('file', photos[i].file ?? '');
    formData.append(
      'upload_preset',
      import.meta.env.VITE_CLOUDINARY_PRESET_KEY
    );

    fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => setUploadImgUrls((prev) => [...prev, res.url]));
  }
};

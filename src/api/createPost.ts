import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { Category, Data } from '../utils/types';
import { URL_CREATE_POST } from './url';

const createNewPost = async (
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
      headers: { Authorization: sessionStorage.getItem('token') },
    })
    .then((res) => navigate('/'))
    .catch((err) => {
      alert('작성에 실패했습니다. 잠시 뒤 다시 시도해 주세요.🥲' + '\n' + err);
      navigate('/');
    });
};

export default createNewPost;

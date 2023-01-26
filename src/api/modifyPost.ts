import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { Category } from '../utils/interface';
import { Data } from './createPost';
import { URL_EDIT_POST } from './url';

export const modifyPost = async (
  text: string,
  categorys: Category[],
  navigate: NavigateFunction,
  postId: string | undefined,
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
    .patch(URL_EDIT_POST(postId), data, {
      headers: { Authorization: sessionStorage.getItem('token') },
    })
    .then((res) => navigate('/'))
    .catch((err) => {
      alert('수정에 실패했습니다. 잠시 뒤 다시 시도해 주세요.🥲' + '\n' + err);
      navigate('/');
    });
};

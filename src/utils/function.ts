import { ChangeEvent } from 'react';
import { NavigateFunction } from 'react-router-dom';
import axios from 'axios';
import { SetArrState } from './interface';
import { CATEGORY } from './constant';
import { URL_DELETE_POST, URL_PATCH_COMMENT_LIKE, URL_SAVE_POST } from './url';

export const getTime = (time: string) => {
  const createdAt = new Date(time);
  const year = createdAt.getFullYear();
  const month = createdAt.getMonth();
  const date = createdAt.getDate();
  return `${year}/${
    month.toString().length === 1 ? 0 + month.toString() : month
  }/${date.toString().length === 1 ? 0 + date.toString() : date}`;
};

export const getDetailTime = (time: string) => {
  const createdAt = new Date(time);
  const year = createdAt.getFullYear();
  const month = createdAt.getMonth();
  const date = createdAt.getDate();
  const hour = createdAt.getHours();
  const min = createdAt.getMinutes();
  return `${year}/${
    month.toString().length === 1 ? 0 + month.toString() : month
  }/${date.toString().length === 1 ? 0 + date.toString() : date} ${
    hour.toString().length === 1 ? 0 + hour.toString() : hour
  }:${min.toString().length === 1 ? 0 + min.toString() : min}`;
};

export const getCategory = (cateArr: string[] | undefined) => {
  if (!cateArr) return CATEGORY;
  return CATEGORY.map((cate) =>
    cateArr.includes(cate.name)
      ? { ...cate, selected: true }
      : { ...cate, selected: false }
  );
};

export const getImage = (img: string[] | null | undefined, index: number) => {
  if (!img || img.length === 0) return [];
  return img.map((url) => {
    return { id: index, previewUrl: url };
  });
};

export const setColor = (textValue: string) => {
  if (textValue.length < 100) {
    return '#00B388';
  } else if (textValue.length < 120) {
    return '#FAB922';
  } else {
    return '#FA3270';
  }
};

export const handleIconcolor = (
  e: ChangeEvent,
  setCmtIconColor: (boolean: boolean) => void
) => {
  e.type === 'focus' ? setCmtIconColor(true) : setCmtIconColor(false);
};

export const goEditMode = (
  id: number | string | undefined,
  navigate: NavigateFunction
) => {
  navigate(`/edit/${id}`);
};

export const removeFeed = (id: number | string | undefined) => {
  if (confirm('정말로 삭제하실 건가요?😭')) {
    axios
      .delete(URL_DELETE_POST(id), {
        headers: { Authorization: localStorage.getItem('token') },
      })
      .then((res) => alert('삭제되었습니다. ✨'))
      .catch((err) =>
        alert(`삭제에 실패했습니다. 잠시 뒤 다시 시도해주세요. 😭\n${err}`)
      );
  }
};

export const handleLikeComment = (
  setCommentData: SetArrState,
  commentId: string | number | undefined
) => {
  axios
    .patch(
      URL_PATCH_COMMENT_LIKE(commentId),
      {},
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    )
    .then((res) => {
      setCommentData((prev) => {
        const newComment = prev?.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                is_liked: res.data.is_liked,
                count_likes: res.data.count_likes,
              }
            : { ...comment }
        );
        return newComment;
      });
    })
    .catch((err) => console.log(err));
};

export const handleSaveFeed = (
  setSave: (setState: (prev: number | boolean) => boolean) => void,
  id: string | number | undefined
) => {
  setSave((prev) => !prev);
  axios
    .patch(
      URL_SAVE_POST(id),
      {},
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    )
    .then()
    .catch((err) => console.log(err));
};

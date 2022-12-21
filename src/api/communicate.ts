import axios from 'axios';
import { SetArrState } from '../utils/interface';
import { checkEmail, checkId } from '../utils/validation';
import {
  URL_CHECK_USER,
  URL_DELETE_POST,
  URL_PATCH_COMMENT_LIKE,
  URL_SAVE_POST,
} from './url';

type setIdValue = (value: React.SetStateAction<string>) => void;
type SetDuplicate = (value: React.SetStateAction<boolean>) => void;

export const checkUser = (
  type: string,
  value: string,
  setDuplicate: SetDuplicate,
  setValue: setIdValue
) => {
  if (type === 'email' ? checkEmail(value) : checkId(value)) {
    axios
      .post(
        URL_CHECK_USER,
        type === 'email'
          ? { email: value }
          : {
              account: value,
            }
      )
      .then((res) => {
        alert(`사용 가능한 ${type === 'email' ? '이메일' : '아이디'}입니다.😀`);
        setDuplicate(true);
      })
      .catch((err) => {
        alert(
          `이미 존재하는 ${type === 'email' ? '이메일' : '아이디'}입니다.😅`
        );
        setValue('');
      });
  } else {
    alert(
      `${type === 'email' ? '이메일을' : '아이디를'} 바르게 입력해주세요.🥺`
    );
  }
};

export const removePost = (id: number | string | undefined) => {
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

export const handleSavePost = (
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

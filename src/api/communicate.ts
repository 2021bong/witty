import axios from 'axios';
import {
  MainFeedStateType,
  BookmarkType,
  SetArrState,
} from '../utils/interface';
import { checkEmail, checkId } from '../utils/validation';
import {
  URL_CHECK_USER,
  URL_GET_MAIN_POSTS,
  URL_DELETE_POST,
  URL_PATCH_COMMENT_LIKE,
  URL_SAVE_POST,
  URL_MYPAGE_BOOKMARKS_PATCH,
} from './url';
import { getTime } from '../utils/function';
import token from './token';

type setIdValue = (value: React.SetStateAction<string>) => void;
type SetDuplicate = (value: React.SetStateAction<boolean>) => void;
type SetFeeds = (
  value: React.SetStateAction<MainFeedStateType[] | undefined>
) => void;
type SetBookmarks = (
  value: React.SetStateAction<BookmarkType[] | undefined>
) => void;

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

export const getAllPosts = async (setFeeds: SetFeeds, offset: number) => {
  await axios
    .get(URL_GET_MAIN_POSTS(offset), {
      headers: { Authorization: sessionStorage.getItem('token') },
    })
    .then((res) => {
      const dataForState = res.data.map((feedInfo: MainFeedStateType) => {
        return { ...feedInfo, created_at: getTime(feedInfo.created_at) };
      });
      setFeeds(dataForState);
    });
};

export const removePost = async (id: number | string | undefined) => {
  if (confirm('정말로 삭제하실 건가요?😭')) {
    await axios
      .delete(URL_DELETE_POST(id), {
        headers: token,
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
        headers: token,
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
        headers: token,
      }
    )
    .then()
    .catch((err) => console.log(err));
};

export const handleSaveBookmarks = (
  setmyBookmarks: SetBookmarks,
  id: string
) => {
  axios
    .patch(
      URL_MYPAGE_BOOKMARKS_PATCH(id),
      { post_id: id },
      {
        headers: token,
      }
    )
    .then((res) => setmyBookmarks(res.data))
    .catch((err) => console.log(err));
};

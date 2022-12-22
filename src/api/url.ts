// posts
export const URL_GET_MAIN_POSTS = (limit: number, offset: number) =>
  `http://localhost:8000/posts?limit=${limit}&offset=${offset}`;

export const URL_GET_DETAIL_POST = (postId: string | undefined) =>
  `http://localhost:8000/posts/${postId}`;

export const URL_CREATE_POST = 'http://localhost:8000/posts';

export const URL_PATCH_POST_LIKE = (postId: string | number | undefined) =>
  `http://localhost:8000/posts/${postId}/like`;

export const URL_DELETE_POST = (postId: string | number | undefined) =>
  `http://localhost:8000/posts/${postId}`;

export const URL_SAVE_POST = (postId: string | number | undefined) =>
  `http://localhost:8000/posts/${postId}/bookmark`;

// comments
export const URL_CREATE_COMMENT = (postId: string | undefined) =>
  `http://localhost:8000/posts/${postId}/comment`;

export const URL_PATCH_COMMENT_LIKE = (
  commentId: string | number | undefined
) => `http://localhost:8000/comments/${commentId}/like`;

export const URL_DELETE_COMMENT = (
  postId: string | undefined,
  commentId: string
) => `http://localhost:8000/posts/${postId}/${commentId}`;

// search
export const URL_SEARCH = (text: string) => {
  return `http://localhost:8000/search?q=${text}`;
};

export const URL_SEARCH_USER = (text: string) => {
  return `http://localhost:8000/search/user?q=${text}`;
};

export const URL_SEARCH_CATEGORY = (category: string) => {
  let text = 0;
  switch (category) {
    case '오늘먹은것':
      text = 1;
      break;
    case '오늘기분':
      text = 2;
      break;
    case '오늘소비':
      text = 3;
      break;
    case '오늘잡담':
      text = 4;
      break;
    case '오늘아무거나':
      text = 5;
      break;
    default:
      text = 0;
  }
  return `http://localhost:8000/search?category=${text}`;
};

// mypage
export const URL_MYPAGE = 'http://localhost:8000/users/my';
export const URL_MYPAGE_POSTS = 'http://localhost:8000/users/my/posts';
export const URL_MYPAGE_BOOKMARKS = 'http://localhost:8000/users/my/bookmarks';
export const URL_MYPAGE_NAME = 'http://localhost:8000/users/my/name';

// signup & login
export const URL_CHECK_USER = 'http://localhost:8000/users/duplication';
export const URL_SIGNUP = 'http://localhost:8000/users/signup';
export const URL_SIGNIN = 'http://localhost:8000/users/signin';
export const URL_KAKAO_LOGIN = 'http://localhost:8000/users/kakaoLogin';

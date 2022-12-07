export interface MainFeedStateType {
  id: number;
  nickname: string;
  user_id?: string;
  category?: string;
  category_id?: number;
  content: string;
  created_at: string;
  count_likes: number | null;
  count_comments: number | null;
  is_liked?: number | null;
  is_marked?: number | null;
}

export interface FeedProps {
  id: number;
  user: string;
  content: string;
  time: string;
  like: number | null;
  comment: number | null;
  isLiked?: number | null;
  isSaved?: number | null;
}

export interface DetailFeedDataType {
  id?: number;
  nickname: string;
  use_id?: number;
  category?: string;
  category_id?: number;
  content: string;
  created_at: string;
  count_likes: number | null;
  count_comments: number | null;
  is_liked?: number | null;
  is_bookmarked?: number | null;
}

export interface GreetingProps {
  text: string;
}

export interface SignUpBtnProps {
  btnText: string;
  checkSignUp?: () => void;
}

export interface KaKaoBtnProps {
  btnText: string;
  handleKaKaoLogin?: () => void;
}

export interface LoginProp {
  getToken: () => void;
}

export interface HamsterProps {
  hamsterAnimation: boolean;
}

export interface MainFeedStateType {
  id: number;
  nickname: string;
  user_id?: string;
  category: string;
  category_id?: number;
  content: string;
  created_at: string;
  count_likes: number | null;
  count_comments: number | null;
  is_liked?: number | null;
  is_marked?: number | null;
  images?: string[] | null;
  is_owner: boolean;
}

export interface FeedProps {
  id: number;
  user: string;
  category: string;
  content: string;
  time: string;
  like: number | null;
  comment: number | null;
  isLiked?: number | null;
  isSaved?: number | null;
  images?: string[] | null;
  owner: boolean;
}

export interface CreateProps {
  type: 'write' | 'edit';
  id?: string | undefined;
  category?: { id: number; name: string; selected: boolean }[];
  content?: string;
}

interface Comment {
  id: number;
  user_id?: number;
  nickname: string;
  comment: string;
  created_at: string;
  is_owner: boolean;
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
  comments?: Comment[] | null;
  is_liked?: number | null;
  is_bookmarked?: number | null;
  images?: string[] | null;
  is_owner: boolean;
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

interface HavePhoto {
  id: number;
  file: FileList | null;
  previewUrl: string | null;
}

export type PhotosType = HavePhoto[] | [];

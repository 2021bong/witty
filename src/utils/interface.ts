import { SetStateAction } from 'react';

export interface MainFeedStateType {
  id: number;
  nickname: string;
  user_id?: string | undefined;
  category: string[];
  category_id?: number | undefined;
  content: string;
  created_at: string;
  count_likes: number | null;
  count_comments: number | null;
  is_liked: number | null;
  is_marked: number | null;
  images: string[] | [] | null;
  is_owner: boolean;
}

export type SetArrState = (
  setState: SetStateAction<DetailCommentType[] | undefined>
) => void;

type SetFeedsType = (
  setState: SetStateAction<MainFeedStateType[] | undefined>
) => void;

export interface FeedProps {
  id: number;
  nickname: string;
  category: string[];
  content: string;
  time: string;
  like: number | null;
  comment: number | null;
  isLiked?: number | null;
  isSaved?: number | null;
  images?: string[] | null;
  owner: boolean;
  setFeeds: SetFeedsType;
}

export interface WriteProps {
  type: 'create' | 'edit';
  id?: string | undefined;
  category?: string[] | undefined;
  content?: string | null;
  images?: string[] | null | undefined;
}

export interface Category {
  id: number;
  name: string;
  selected: boolean;
}

interface Comment {
  id: number;
  user_id?: number;
  nickname: string;
  comment: string;
  created_at: string;
  is_owner: boolean;
  count_likes: number;
  is_liked?: boolean;
}

export interface DetailFeedDataType {
  id?: number;
  nickname: string;
  use_id?: number;
  category: string[];
  category_id?: number;
  content: string;
  created_at: string;
  count_likes: number | null;
  count_comments: number | null;
  comments?: Comment[] | null;
  is_liked?: number | null;
  is_marked?: number | null;
  images?: string[] | null;
  is_owner: boolean;
}

export interface DetailCommentType {
  comment: string;
  count_likes: number | null;
  created_at: string;
  id: number;
  is_liked: number | null;
  is_owner: boolean;
  nickname: string;
  user_id?: number | undefined;
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

export interface LoginoutProp {
  getToken: () => void;
}

export interface HavePhoto {
  id: number;
  file?: FileList | null;
  previewUrl: string | null;
}

export type PhotosType = HavePhoto[] | [];

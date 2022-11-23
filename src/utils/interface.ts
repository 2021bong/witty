export interface LoginData {
  account: string;
  password: string;
}

export interface LoginRes {
  data: {
    message: string;
    result: {
      nickname: string;
      token: string;
    };
  };
}

export interface EmailType {
  email: string;
}
export interface IdType {
  id: string;
}

export interface SignUpType {
  account: string;
  password: string;
  nickname: string;
  email: string;
}

export interface ValidationRes {
  message: string;
}

export interface SignUpRes extends ValidationRes {}

export interface FeedStateType {
  id: number;
  userId: string;
  content: string;
  time: string;
}

export interface FeedType {
  id?: number;
  user: string;
  content: string;
  time: string;
}

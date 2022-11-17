export interface LoginData {
  account: string;
  password: string;
}

export interface LoginRes {
  message: string;
  result: {
    nickname: string;
    token: string;
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

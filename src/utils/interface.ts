export interface FeedStateType {
  id: number;
  userId: string;
  content: string;
  time: string;
}

export interface FeedProps {
  user: string;
  content: string;
  time: string;
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

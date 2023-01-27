import styled from 'styled-components';
import { SignUpBtnProps } from '../../utils/types';

const SignUpBtn = ({ btnText, checkSignUp }: SignUpBtnProps) => (
  <Button onClick={checkSignUp}>{btnText}</Button>
);

export default SignUpBtn;

const Button = styled.button`
  width: 100%;
  height: 40px;
  margin-bottom: 5px;

  border: none;
  border-radius: 12px;
  color: #fff;
  background-color: ${({ theme }) => theme.mainColor};

  &:hover {
    background-color: ${({ theme }) => theme.subColor};
  }

  &:active {
    background-color: ${({ theme }) => theme.mainColor2};
  }

  &:first-of-type {
    margin-bottom: 5px;
  }
`;

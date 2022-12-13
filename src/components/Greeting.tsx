import styled from 'styled-components';
import { GreetingProps } from '../utils/interface';

const Greeting = ({ text }: GreetingProps) => <Container>{text}</Container>;

export default Greeting;

const Container = styled.h5`
  position: sticky;
  top: 0;
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
  background-color: #fff;
  color: ${({ theme }) => theme.mainColor};
  font-weight: 700;
  z-index: 1;
`;

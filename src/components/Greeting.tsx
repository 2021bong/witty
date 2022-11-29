import styled from 'styled-components';
import { GreetingProps } from '../utils/interface';

const Greeting = ({ text }: GreetingProps) => <Container>{text}</Container>;

export default Greeting;

const Container = styled.h5`
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
  color: ${({ theme }) => theme.mainColor};
  font-weight: 700;
`;

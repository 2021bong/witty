import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { HamsterProps } from '../../utils/interface';

const LoadingLogin = () => {
  const [hAnimation, setHAnimation] = useState(false);
  const [title, setTitle] = useState('Loading');
  const authCode = location.search.split('=')[1];
  const navigate = useNavigate();

  useEffect(() => {
    const hamsterTime = setInterval(() => {
      setHAnimation((prev) => !prev);
    }, 500);
    const titleTime = setInterval(() => {
      setTitle((prev) => (prev.length >= 13 ? 'Loading' : prev + ' .'));
    }, 1000);

    return () => {
      clearInterval(hamsterTime);
      clearInterval(titleTime);
    };
  }, []);

  useEffect(() => {
    axios
      .post('http://localhost:8000/users/kakaoLogin', {
        authorizationCode: authCode,
      })
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <Hamster
        hamsterAnimation={hAnimation}
        src='hamster.png'
        alt='hamster loading image'
      />
      <br />
      <br />
      <br />
      <h5>{title}</h5>
    </Container>
  );
};

export default LoadingLogin;

const Hamster = styled.img<HamsterProps>`
  transform: ${({ hamsterAnimation }) =>
    hamsterAnimation ? 'scale(95%)' : 'scale(105%)'};
  transition: 0.3s ease-in-out;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  min-height: 600px;
  max-width: 500px;
  margin: 100px auto;
  padding: 3rem;
  border: 1px solid #ddd;
  border-radius: 1rem;
  color: ${({ theme }) => theme.text};

  .img {
    width: 25%;
  }
`;

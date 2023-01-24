import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { LoginoutProp } from '../../utils/interface';
import { URL_KAKAO_LOGIN } from '../../api/url';

const LoadingLogin = ({ getToken }: LoginoutProp) => {
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
      .post(URL_KAKAO_LOGIN, {
        authorizationCode: authCode,
      })
      .then((res) => {
        sessionStorage.setItem('token', res.data.token);
        getToken();
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

const Hamster = styled.img`
  transform: ${({ hamsterAnimation }: { hamsterAnimation: boolean }) =>
    hamsterAnimation ? 'scale(95%)' : 'scale(105%)'};
  transition: 0.3s ease-in-out;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .img {
    width: 25%;
  }
`;

import styled, { keyframes } from 'styled-components';

const Spinner = () => (
  <Container>
    <div className='spinner'></div>
  </Container>
);

export default Spinner;

const spinnerAnimation = keyframes`
    0% {
      transform: rotate(0deg);
    } 
    100% {
      transform: rotate(360deg);
    }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;

  .spinner {
    width: 2.5rem;
    height: 2.5rem;
    border: 5px solid rgba(255, 255, 255, 0.1);
    border-right: 5px solid ${({ theme }) => theme.subColor};
    border-radius: 50%;
    animation: ${spinnerAnimation} 1s linear infinite;
  }
`;

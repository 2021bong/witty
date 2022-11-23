import styled from 'styled-components';
import { KaKaoBtnType } from '../utils/interface';

const KakaoBtn = ({ btnText }: KaKaoBtnType) => {
  return (
    <Button>
      <p className='text'>{btnText}</p>
      <div className='imgBox'></div>
    </Button>
  );
};

export default KakaoBtn;

const Button = styled.button`
  position: relative;
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  border: none;
  border-radius: 12px;
  background-color: #fee501;
  overflow: hidden;

  &:hover {
    background-color: #f1da00;
  }

  &:active {
    background-color: #fee501;
  }

  .text {
    color: 191600;
    z-index: 1;
  }

  .imgBox {
    position: absolute;
    width: inherit;
    height: inherit;
    background: left/15% no-repeat url('kakao_login_logo.png');
    left: 0;
    top: 0;
  }
`;

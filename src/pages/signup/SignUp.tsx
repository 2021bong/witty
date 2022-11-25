import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import KakaoBtn from '../../components/KakaoBtn';
import SignUpBtn from '../../components/SignUpBtn';
import {
  checkEmail,
  checkName,
  checkId,
  checkPw,
} from '../../utils/validation';
import { Main } from './SignUp.styled';

const { Kakao } = window as any;

const SignUp = () => {
  const [idValue, setIdValue] = useState('');
  const [pwValue, setPwValue] = useState('');
  const [pw2Value, setPw2Value] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [emailCheckDuplicate, setEmailCheckDuplicate] = useState(false);
  const [idCheckDuplicate, setIdCheckDuplicate] = useState(false);
  const navigate = useNavigate();

  const handleIdValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue(e.target.value);
  };

  const handlePwValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwValue(e.target.value);
  };

  const handlePw2Value = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw2Value(e.target.value);
  };

  const handleNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  const handleEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const checkingEmail = () => {
    if (checkEmail(emailValue)) {
      axios
        .post('http://localhost:8000/users/duplication', {
          email: emailValue,
        })
        .then((res) => {
          alert('사용 가능한 이메일입니다.😀');
          setEmailCheckDuplicate(true);
        })
        .catch((err) => {
          alert('이미 존재하는 이메일입니다.😅');
          setEmailValue('');
        });
    } else {
      alert('이메일을 바르게 입력해주세요.🥺');
    }
  };

  const checkingId = () => {
    if (checkId(idValue)) {
      axios
        .post('http://localhost:8000/users/duplication', {
          account: idValue,
        })
        .then((res) => {
          alert('사용 가능한 아이디입니다.😀');
          setIdCheckDuplicate(true);
        })
        .catch((err) => {
          alert('이미 존재하는 아이디입니다.😅');
          setIdValue('');
        });
    } else {
      alert('아이디를 바르게 입력해주세요.🥺');
    }
  };

  const checkSignUp = () => {
    if (
      checkEmail(emailValue) &&
      checkName(nameValue) &&
      checkId(idValue) &&
      checkPw(pwValue) &&
      pwValue === pw2Value &&
      emailCheckDuplicate &&
      idCheckDuplicate
    ) {
      axios
        .post('http://localhost:8000/users/signup', {
          account: idValue,
          password: pwValue,
          nickname: nameValue,
          email: emailValue,
        })
        .then((res) => {
          navigate('/');
        })
        .catch((err) => console.log(err));
    } else if (
      checkEmail(emailValue) &&
      checkName(nameValue) &&
      checkId(idValue) &&
      checkPw(pwValue) &&
      pwValue === pw2Value
    ) {
      alert('이메일과 아이디 모두 중복 확인을 해주세요!✋');
    } else {
      alert('가입 정보를 확인해주세요!✋');
    }
  };

  const handleKaKaoLogin = async () => {
    await Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
    await Kakao.Auth.authorize({
      redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URL,
      serviceTerms: 'account_email',
    });
  };

  return (
    <Main>
      <h3 className='title'>🐹 회원가입</h3>
      <form className='formContainer' onSubmit={(e) => e.preventDefault()}>
        <div className='inputContainer'>
          <label htmlFor='email'>이메일</label>
          <div className='inputBtnContainer'>
            <input
              type='text'
              id='email'
              placeholder='@ 포함 이메일 형식'
              onChange={handleEmailValue}
              value={emailValue}
              className='inputWithBtn'
            />
            <button className='btn' onClick={checkingEmail}>
              중복 확인
            </button>
          </div>
          {checkEmail(emailValue) ? (
            emailCheckDuplicate ? (
              <p className='true desc'>사용가능한 이메일입니다.😀</p>
            ) : (
              <p className='desc'>이메일 중복 확인을 해주세요.😀</p>
            )
          ) : (
            <p className='desc'>🚨 올바른 이메일 형식이 아닙니다.</p>
          )}
        </div>
        <div className='inputContainer'>
          <label htmlFor='name'>이름</label>
          <input
            type='text'
            id='name'
            placeholder='8자 이하'
            onChange={handleNameValue}
            value={nameValue}
          />
          {checkName(nameValue) ? (
            <p className='true desc'>사용가능한 이름입니다.😀</p>
          ) : (
            <p className='desc'>🚨 8자 이하의 이름만 설정가능합니다.</p>
          )}
        </div>
        <div className='inputContainer'>
          <label htmlFor='id'>아이디</label>
          <div className='inputBtnContainer'>
            <input
              type='text'
              id='id'
              placeholder='영문+숫자 12자 이하'
              onChange={handleIdValue}
              value={idValue}
              className='inputWithBtn'
            />
            <button className='btn' onClick={checkingId}>
              중복 확인
            </button>
          </div>
          {checkId(idValue) ? (
            idCheckDuplicate ? (
              <p className='true desc'>사용가능한 아이디입니다.😀</p>
            ) : (
              <p className='desc'>아이디 중복 확인을 해주세요.😀</p>
            )
          ) : (
            <p className='desc'>사용할 수 없는 아이디입니다.🥲</p>
          )}
        </div>
        <div className='inputContainer'>
          <label htmlFor='pw'>비밀번호</label>
          <input
            type='password'
            id='pw'
            placeholder='영문+숫자+@#*!^ 8자 이상 16자 이하'
            onChange={handlePwValue}
            value={pwValue}
          />
          {checkPw(pwValue) ? (
            <p className='true desc'>사용가능한 비밀번호입니다.😀</p>
          ) : (
            <p className='desc'>
              🚨 영문+숫자+@#*!^ 조합의 8자 - 16자만 가능합니다.
            </p>
          )}
        </div>
        <div className='inputContainer'>
          <label htmlFor='pw2'>비밀번호 확인</label>
          <input
            type='password'
            id='pw2'
            placeholder='비밀번호를 다시 입력해주세요.'
            onChange={handlePw2Value}
            value={pw2Value}
          />
          {pwValue !== '' && pw2Value === pwValue ? (
            <p className='true desc'>비밀번호가 일치합니다👏</p>
          ) : (
            <p className='desc'>🚨 비밀번호가 일치하지 않습니다.</p>
          )}
        </div>
      </form>
      <div className='btnContainer'>
        <SignUpBtn btnText='회원가입 하기' checkSignUp={checkSignUp} />
        <KakaoBtn
          btnText={'카카오로 시작하기'}
          handleKaKaoLogin={handleKaKaoLogin}
        />
        <Link to='/'>
          <button className='cancelBtn'>취소</button>
        </Link>
      </div>
    </Main>
  );
};

export default SignUp;

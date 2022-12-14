import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const EditNickname = () => {
  const [textValue, setTextValue] = useState('');
  const navigate = useNavigate();
  const handleWriteText = (e: ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const handleSubmit = () => {
    axios
      .patch(
        'http://localhost:8000/users/my/name',
        { nickname: textValue },
        { headers: { Authorization: localStorage.getItem('token') } }
      )
      .then((res) => {
        alert('변경되었습니다. 😀');
        navigate('/mypage');
      })
      .catch((err) => {
        alert(`변경에 실패했습니다. 잠시 후에 다시 시도해주세요. 😭 \n ${err}`);
        navigate('/mypage');
      });
  };

  return (
    <Container>
      <form onClick={(e) => e.preventDefault()}>
        <input
          type='text'
          value={textValue}
          onChange={handleWriteText}
          placeholder='변경하실 닉네임을 적어주세요!'
        />
        <button onClick={handleSubmit}>변경하기</button>
      </form>
    </Container>
  );
};

export default EditNickname;

const Container = styled.div``;

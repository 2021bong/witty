import axios from 'axios';
import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import Greeting from '../../components/Greeting';
import { URL_SEARCH_USER } from '../../api/url';

const Search = () => {
  const [textValue, setTextValue] = useState('');
  const handleWriteText = (e: ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };
  const handleSearch = () => {
    axios
      .get(URL_SEARCH_USER(textValue))
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Greeting text='There are various things happening.' />
      <form onSubmit={(e) => e.preventDefault()}>
        <input type='text' value={textValue} onChange={handleWriteText} />
        <button onClick={handleSearch}>검색</button>
      </form>
    </Container>
  );
};

export default Search;

const Container = styled.div``;

import styled from 'styled-components';
import Greeting from '../../components/Greeting';

const Search = () => {
  return (
    <Container>
      <Greeting text='There are various things happening.' />
    </Container>
  );
};

export default Search;

const Container = styled.div``;

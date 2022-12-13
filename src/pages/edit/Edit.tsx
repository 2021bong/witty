import { useParams } from 'react-router-dom';
import Create from '../../components/write/Write';

const Edit = () => {
  const param = useParams().id;
  return (
    <Create
      type='edit'
      id={param}
      category={[{ id: 1, name: '#오늘아무거나', selected: true }]}
      content={'hi'}
    />
  );
};

export default Edit;

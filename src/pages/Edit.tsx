import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Create from '../components/write/Write';
import { DetailFeedDataType } from '../utils/types';
import { URL_GET_DETAIL_POST } from '../api/url';

const Edit = () => {
  const [feedData, setFeedData] = useState<DetailFeedDataType>();
  const param = useParams().id;

  useEffect(() => {
    axios
      .get(URL_GET_DETAIL_POST(param), {
        headers: { Authorization: sessionStorage.getItem('token') },
      })
      .then((res) => {
        setFeedData(res.data.post);
      });
  }, []);

  return (
    <Create
      type='edit'
      id={param}
      category={feedData?.category}
      content={feedData?.content}
      images={feedData?.images}
    />
  );
};

export default Edit;

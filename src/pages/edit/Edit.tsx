import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Create from '../../components/write/Write';
import { DetailFeedDataType } from '../../utils/interface';
import { URL_GET_DETAIL_POST } from '../../api/url';
import token from '../../api/token';

const Edit = () => {
  const [feedData, setFeedData] = useState<DetailFeedDataType>();
  const param = useParams().id;

  useEffect(() => {
    // axios.get('../data/detail.json').then((res) => {
    //   setFeedData(res.data.feeds[Number(param) - 1]);
    // });

    axios
      .get(URL_GET_DETAIL_POST(param), {
        headers: token,
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

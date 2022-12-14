import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import {
  BsHeartFill,
  BsHeart,
  BsChat,
  BsBookmark,
  BsFillBookmarkFill,
} from 'react-icons/bs';

import Greeting from '../../components/Greeting';
import { DetailFeedDataType } from '../../utils/interface';
import {
  getDetailTime,
  handleIconcolor,
  handleLikeHeart,
  handleSaveFeed,
  handleLikeComment,
  goEditMode,
  removeFeed,
} from '../../utils/function';
import { CommentIcon, Container } from './Detail.styled';

const Detail = () => {
  const [feedData, setFeedData] = useState<DetailFeedDataType | undefined>();
  const [heart, setHeart] = useState(false);
  const [save, setSave] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [cmtIconColor, setCmtIconColor] = useState(false);
  const param = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('../data/detail.json').then((res) => {
      setFeedData(res.data.feeds[Number(param) - 1]);
      setHeart(res.data.feeds[Number(param) - 1].is_liked || false);
      setSave(res.data.feeds[Number(param) - 1].is_marked || false);
    });

    // axios
    //   .get(`http://localhost:8000/posts/${param}`, {
    //     headers: { Authorization: localStorage.getItem('token') },
    //   })
    //   .then((res) => {
    //     setFeedData(res.data[0]);
    //     setHeart(res.data[0].is_liked || false);
    //     setSave(res.data[0].is_marked || false);
    //   });
  }, []);

  const handleWriteComment = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value);
  };

  const handleRemoveComment = (e: MouseEvent<SVGElement>) => {
    if (confirm('정말로 삭제하실 건가요?😭')) {
      axios
        .delete(`http://localhost:8000/comments/${e.currentTarget.id}`, {
          headers: { Authorization: localStorage.getItem('token') },
        })
        .then((res) => alert('삭제되었습니다. ✨'))
        .catch((err) =>
          alert(`삭제에 실패했습니다. 잠시 뒤 다시 시도해주세요. 😭\n${err}`)
        );
    }
  };

  const handleSubmit = () => {
    if (!commentValue) {
      alert('댓글 내용을 작성해주세요! 🥲');
      return;
    }
    axios
      .post(
        `http://localhost:8000/${param}/comment`,
        {
          content: commentValue,
        },
        { headers: { Authorization: localStorage.getItem('token') } }
      )
      .then()
      .catch((err) => alert(`네트워크 통신이 원활하지 않습니다.🥲\n${err}`));
    setCommentValue('');

    // axios
    //   .get(`http://localhost:8000/posts/${param}`, {
    //     headers: { Authorization: localStorage.getItem('token') },
    //   })
    //   .then((res) => {
    //     setFeedData(res.data[0]);
    //     setHeart(res.data[0].is_liked || false);
    //     setSave(res.data[0].is_marked || false);
    //   });
  };

  return (
    <Container>
      <Greeting text="What's happening now" />
      {feedData && (
        <div className='contentContainer'>
          <main className='detailFeedContainer'>
            <div className='ctgrAndBmk'>
              <div>
                {feedData.category.map((cate) => (
                  <Link to='/category' className='goCategory' key={cate}>
                    <span className='category'>{'#' + cate}</span>
                  </Link>
                ))}
              </div>
              <div className='bookmark'>
                {save ? (
                  <BsFillBookmarkFill
                    className='checked'
                    onClick={() => handleSaveFeed(setSave, param)}
                  />
                ) : (
                  <BsBookmark onClick={() => handleSaveFeed(setSave, param)} />
                )}
              </div>
            </div>
            <p className='userName'>
              <b>{feedData.nickname}</b>
            </p>
            <p className='content'>
              <b>{feedData.content}</b>
            </p>
            {feedData.images && (
              <div className='photoContainer'>
                {feedData.images.map(
                  (photo, i) =>
                    !!photo && (
                      <img
                        alt={`photo${i + 1}`}
                        src={photo}
                        key={photo + i}
                        className='photo'
                      />
                    )
                )}
              </div>
            )}
            <div className='actionContainer'>
              <div className='interactionContainer'>
                <div
                  className='likeCountBox'
                  onClick={() => handleLikeHeart(setHeart, param)}
                >
                  {heart ? <BsHeartFill className='checked' /> : <BsHeart />}
                  <span>
                    좋아요
                    <b>{feedData.count_likes || 0}</b>
                  </span>
                </div>
                <div>
                  <BsChat />
                  <span>
                    댓글
                    <b>{feedData.count_comments || 0}</b>
                  </span>
                </div>
              </div>
              <div>
                {feedData.is_owner && (
                  <AiTwotoneEdit
                    className='edit'
                    onClick={() => goEditMode(feedData?.id, navigate)}
                  />
                )}
                {feedData.is_owner && (
                  <AiFillDelete
                    className='delete'
                    onClick={() => removeFeed(param)}
                  />
                )}
              </div>
            </div>
            <p className='date'>{getDetailTime(feedData.created_at)}</p>
          </main>
          <form className='formContainer' onSubmit={(e) => e.preventDefault()}>
            <CommentIcon $iconColor={cmtIconColor} />
            <input
              type='text'
              value={commentValue}
              onChange={handleWriteComment}
              onFocus={(e) => handleIconcolor(e, setCmtIconColor)}
              onBlur={(e) => handleIconcolor(e, setCmtIconColor)}
            />
            <button onClick={handleSubmit}>작성</button>
          </form>
          {
            <ul className='commentsContainer'>
              {feedData.comments?.map((el) => (
                <li className='commentBox' key={el.id}>
                  <div>
                    <p className='nameAndContentBox'>
                      <b className='nickname'>{el.nickname}</b>
                      <span>{el.comment}</span>
                    </p>
                    <p className='date'>{getDetailTime(feedData.created_at)}</p>
                  </div>
                  <div className='commentActionBox'>
                    {el.is_liked ? (
                      <BsHeartFill
                        className='checked heart'
                        onClick={() => handleLikeComment(setFeedData, el.id)}
                      />
                    ) : (
                      <BsHeart
                        className='heart'
                        onClick={() => handleLikeComment(setFeedData, el.id)}
                      />
                    )}
                    <span>{el.count_likes}</span>
                    {el.is_owner && (
                      <AiFillDelete
                        className='delete'
                        onClick={handleRemoveComment}
                        id={el.id.toString()}
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          }
        </div>
      )}
    </Container>
  );
};

export default Detail;

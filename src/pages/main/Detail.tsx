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

import Greeting from '../../components/common/Greeting';
import { DetailFeedDataType, DetailCommentType } from '../../utils/interface';
import {
  getDetailTime,
  handleIconcolor,
  goEditMode,
  AddComma,
} from '../../utils/function';
import {
  removePost,
  handleSavePost,
  handleLikeComment,
} from '../../api/communicate';
import {
  URL_GET_DETAIL_POST,
  URL_DELETE_COMMENT,
  URL_PATCH_POST_LIKE,
  URL_CREATE_COMMENT,
} from '../../api/url';
import { CommentIcon, Container } from './Detail.styled';
import token from '../../api/token';

const Detail = () => {
  const [feedData, setFeedData] = useState<DetailFeedDataType | undefined>();
  const [commentData, setCommentData] = useState<
    DetailCommentType[] | undefined
  >();
  const [countLikes, setCountLikes] = useState<number>();
  const [heart, setHeart] = useState(false);
  const [save, setSave] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [cmtIconColor, setCmtIconColor] = useState(false);
  const param = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    // axios.get('../data/detail.json').then((res) => {
    //   setFeedData(res.data.feeds[Number(param) - 1]);
    //   setHeart(res.data.feeds[Number(param) - 1].is_liked || false);
    //   setSave(res.data.feeds[Number(param) - 1].is_marked || false);
    // });

    axios
      .get(URL_GET_DETAIL_POST(param), {
        headers: token,
      })
      .then((res) => {
        setFeedData(res.data.post);
        setCommentData(res.data.comments);
        setCountLikes(res.data.post.count_likes);
        setSave(!!res.data.post.is_marked || false);
        setHeart(!!res.data.post.is_liked || false);
      });
  }, []);

  const handleWriteComment = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value);
  };

  const handleRemoveComment = (e: MouseEvent<SVGElement>) => {
    if (confirm('정말로 삭제하실 건가요?😭')) {
      axios
        .delete(URL_DELETE_COMMENT(param, e.currentTarget.id), {
          headers: token,
        })
        .then((res) => {
          alert('삭제되었습니다. ✨');
          setCommentData(res.data);
        })
        .catch((err) =>
          alert(`삭제에 실패했습니다. 잠시 뒤 다시 시도해주세요. 😭\n${err}`)
        );
    }
  };

  const handleLikeHeart = () => {
    heart
      ? setCountLikes((prev) => (prev || 1) - 1)
      : setCountLikes((prev) => (prev || 0) + 1);

    axios
      .patch(
        URL_PATCH_POST_LIKE(param),
        {},
        {
          headers: token,
        }
      )
      .then((res) => setHeart((prev) => !prev))
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    if (!commentValue) {
      alert('댓글 내용을 작성해주세요! 🥲');
      return;
    }
    axios
      .post(
        URL_CREATE_COMMENT(param),
        {
          comment: commentValue,
        },
        { headers: token }
      )
      .then()
      .catch((err) => alert(`네트워크 통신이 원활하지 않습니다.🥲\n${err}`));
    setCommentValue('');

    axios
      .get(URL_GET_DETAIL_POST(param), {
        headers: token,
      })
      .then((res) => {
        setFeedData(res.data.post);
        setCommentData(res.data.comments);
      });
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
                  <Link to='/search/category' className='goCategory' key={cate}>
                    <span className='category'>{'#' + cate}</span>
                  </Link>
                ))}
              </div>
              <div className='bookmark'>
                {save ? (
                  <BsFillBookmarkFill
                    className='checked'
                    onClick={() => handleSavePost(setSave, param)}
                  />
                ) : (
                  <BsBookmark onClick={() => handleSavePost(setSave, param)} />
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
                <div className='likeCountBox' onClick={handleLikeHeart}>
                  {heart ? <BsHeartFill className='checked' /> : <BsHeart />}
                  <span>
                    좋아요
                    <b>{countLikes || 0}</b>
                  </span>
                </div>
                <div>
                  <BsChat />
                  <span>
                    댓글
                    <b>{commentData?.length || 0}</b>
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
                    onClick={() => {
                      removePost(param);
                      navigate('/');
                    }}
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
          {commentData && (
            <ul className='commentsContainer'>
              {commentData.map((el) => (
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
                        onClick={() => handleLikeComment(setCommentData, el.id)}
                      />
                    ) : (
                      <BsHeart
                        className='heart'
                        onClick={() => handleLikeComment(setCommentData, el.id)}
                      />
                    )}
                    <span>{AddComma(el.count_likes)}</span>
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
          )}
        </div>
      )}
    </Container>
  );
};

export default Detail;

import React, { useState } from 'react';
import './UserComment.css';
import { useSelector } from 'react-redux';
import CommentProfile from './CommentProfile'
const UserComment = ({ onCommentAdd }) => {
  const [comments, setComments] = useState([]); //댓글 목록
  const [commentText, setCommentText] = useState(''); //댓글 입력값
  const [replyText, setReplyText] = useState(''); //답글 입력값
  const [replyingToIndex, setReplyingToIndex] = useState(null); //답글 추가할 대상 댓글 관리
  const { user } = useSelector((state) => state.user);
  
  //댓글 입력
  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  //답글 입력
  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  //댓글 추가
  //trim()으로 문자열의 앞뒤 공백 제거!!
  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = { text: commentText, replies: [] };

      setComments((prevComments) => [...prevComments, newComment]);
      onCommentAdd(commentText);
      setCommentText('');
    }
  };

  //답글 추가
  const handleAddReply = () => {
    if (replyText.trim() && replyingToIndex !== null) {
      // const updatedComments = [...comments];
      const newReply = replyText;

      setComments((prevComments) => {
        const updatedComments = [...prevComments];
        updatedComments[replyingToIndex].replies.push(newReply);
        return updatedComments;
      });

      onCommentAdd(newReply, true, replyingToIndex);

      setReplyText('');
      setReplyingToIndex(null);
    }
  };

  //답글을 달 댓글 선택
  const handleReplyToComment = (index) => {
    setReplyingToIndex(index);
  };

  return (
    <div>
      {/* 댓글 목록 출력 */}
      <div className="comment-container">
        <ul className="reply-comment">
          {comments.map((comment, index) => (
            <li key={index} className="comment-text">
              <CommentProfile
                    userName={user.name}
                    userID={user.email}
                    
                  />
              <p>{comment.text}</p>

              {/* 답글 입력창과 등록 버튼 */}
              {replyingToIndex === index ? (
                <div className="reply-content">
                  <textarea
                    value={replyText}
                    onChange={handleReplyChange}
                    placeholder="답글을 남겨보세요"
                    rows="3"
                    className="textarea-comment"
                  />
                  <button onClick={handleAddReply} className="reply-submit-btn">
                    등록
                  </button>
                </div>
              ) : (
                <button
                  className="reply-toggle-btn"
                  onClick={() => setReplyingToIndex(index)}
                >
                  답글 달기
                </button>
              )}

              {/* 기존 답글 목록 */}
              <div className="reply-box">
                {comment.replies.length > 0 && (
                  <ul>
                    {comment.replies.map((reply, replyIndex) => (
                      <li key={replyIndex}>
                        <CommentProfile
                    userName={user.name}
                    userID={user.email}
                    
                  />
                        
                        {reply}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 댓글 입력창 */}
      <div className="comment-input-container">
        <textarea
          value={commentText}
          onChange={handleCommentChange}
          placeholder="댓글을 남겨보세요"
          rows="4"
          className="textarea-comment"
        />
        <button onClick={handleAddComment} className="comment-apply-btn">
          등록
        </button>
      </div>
    </div>
  );
};

export default UserComment;

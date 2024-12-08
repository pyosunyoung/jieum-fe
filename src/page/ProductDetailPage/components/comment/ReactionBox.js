import React, { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import './ReactionBox.css';

const ReactionBox = ({ commentCount }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  //좋아요 기능
  const handleLikeClick = () => {
    if (liked) {
      setLikes(likes - 1); //좋아요 취소
    } else {
      setLikes(likes + 1); //좋아요 추가
    }
    setLiked(!liked); //좋아요 상태
  };

  return (
    <div className="reaction-box">
      <div className="reaction-item" onClick={handleLikeClick}>
        {liked ? (
          <FavoriteIcon className="liked-icon" />
        ) : (
          <FavoriteBorderIcon className="like-icon" />
        )}
        <span>{`관심 ${likes}`}</span>
      </div>
      <div className="reaction-item">
        <ModeCommentIcon className="comment-icon" />
        <span>{`댓글 ${commentCount}`}</span>
      </div>
    </div>
  );
};

export default ReactionBox;

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './CommentProfile.css';

const CommentProfile = ({ userName, userID, authorID }) => {
  // const isAuthor = userID === authorID;

  return (
    <div className="comment-profile">
      <AccountCircleIcon />
      <span className="comment-author">
        {userName} 
        {<span className="author-badge"></span>}
      </span>
    </div>
  );
};

export default CommentProfile;

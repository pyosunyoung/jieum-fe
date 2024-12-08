import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StudyList from '../components/StudyList';
import './LikedPostsPage.css';

const LikedPostsPage = () => {
  const { user } = useSelector((state) => state.user);
  const productList = useSelector((state) => state.product.productList);
  const [likedPosts, setLikedPosts] = useState([]);
  const [likeProductList, setLikeProductList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 좋아요한 게시글 목록 가져오기
    const postLikes = JSON.parse(localStorage.getItem('postLikes')) || {};
    const userId = user.name; // 현재 사용자 ID
    const likedPostIds = Object.keys(postLikes).filter((postId) =>
      postLikes[postId].users.includes(userId)
    );

    setLikedPosts(likedPostIds);

    // productList와 likedPostIds 비교하여 일치하는 항목 필터링
    const matchedProducts = productList.filter((product) =>
      likedPostIds.includes(product._id)
    );

    setLikeProductList(matchedProducts);
  }, [productList, user]);

  const handlePostClick = (postId) => {
    navigate(`/product/${postId}`);
  };

  return (
    <div className="liked-posts-page">
      <h1>관심 목록</h1>
      {likeProductList.length > 0 ? (
        likeProductList.map((item) => (
          <div key={item._id} onClick={() => handlePostClick(item._id)}>
            <StudyList item={item} />
          </div>
        ))
      ) : (
        <p>관심 게시글이 없습니다.</p>
      )}
    </div>
  );
};

export default LikedPostsPage;

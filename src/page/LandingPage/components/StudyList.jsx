import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import './StudyList.css';
import { useNavigate } from 'react-router-dom';
import { currencyFormat } from '../../../utils/number';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, toggleLike, toggleLikeOnPost } from '../../../features/product/productSlice';
import { toggleLikePost } from '../../../features/user/userSlice';

const StudyList = ({ selectedTab, item }) => {
  //초기 데이터 예시!!! 새로운 게시물 등록 시 이 배열에 추가될 수 있도록....
  const navigate = useNavigate();
  const showProduct = (id) => {
    navigate(`/product/${id}`);
  };
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.product);
  const likedPosts = user?.likedPosts || [];
  // 강제 리렌더링용 상태
  const [forceUpdate, setForceUpdate] = React.useState(false);
  console.log("item",item)
  // 로컬 스토리지에서 좋아요 상태 가져오기
  // const likes = useSelector((state) => state.products.likes);
  // const userId = user.name; // 실제 사용자 ID로 교체해야 함
  // const isLiked = likes[userId]?.[item._id] || false;
  // const isLiked = likedPosts.includes(item._id);
  const userId = user.name; // 현재 사용자 ID (실제 구현 시 로그인된 사용자 ID로 대체)
  const postId = item._id; // 게시글 ID
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  useEffect(() => {
    // 초기 좋아요 상태 가져오기
    const postLikes = JSON.parse(localStorage.getItem('postLikes')) || {};
    const currentPost = postLikes[postId] || { likes: 0, users: [] };

    setLikeCount(currentPost.likes);
    setIsLiked(currentPost.users.includes(userId));
  }, [postId, userId]);
  const handleLikeToggle = (e) => {
    e.stopPropagation(); // 이벤트 전파 방지
    // dispatch(toggleLikePost(item._id));
    // dispatch(toggleLikeOnPost({ postId: item._id, increment: !isLiked }));
    const postLikes = JSON.parse(localStorage.getItem('postLikes')) || {};
    const currentPost = postLikes[postId] || { likes: 0, users: [] };

    if (isLiked) {
      // 좋아요 취소
      currentPost.likes -= 1;
      currentPost.users = currentPost.users.filter((id) => id !== userId);
    } else {
      // 좋아요 추가
      currentPost.likes += 1;
      currentPost.users.push(userId);
    }

    // 업데이트된 데이터 로컬 스토리지에 저장
    postLikes[postId] = currentPost;
    localStorage.setItem('postLikes', JSON.stringify(postLikes));

    // 상태 업데이트
    setLikeCount(currentPost.likes);
    setIsLiked(!isLiked);
    
  };
  // useEffect(() => {
  //   dispatch(fetchPosts()); // 게시물 리스트 최신화
  // }, [dispatch]);
  // console.log("user", user);
  
  // const allItems = [
  //   {
  //     id: 1,
  //     subject: item?.name,
  //     interestBadgeArray: ['#전공','#컴퓨터공학부','#파이썬 프로그래밍'],
  //     blogPostContent:{
  //       blogTitle: '파이썬 스터디 할 분 모집'
  //     },
  //     category: '전공',
  //   },
  //   {
  //     id: 2,
  //     subject: "웹프로그래밍",
  //     interestBadgeArray: ['#자기개발','#개발','#웹프로그래밍'],
  //     blogPostContent:{
  //       blogTitle:'웹 개발 스터디 모집'
  //     },
  //     category: '전공' },
  //   {
  //     id: 3,
  //     subject: "인문학",
  //     interestBadgeArray: ['#자기개발','#어학','#인문학'],
  //     blogPostContent:{
  //       blogTitle:'인문학 독서 모임'
  //     },
  //     category: '교양' },
  //   {
  //     id: 4,
  //     subject: "기독교세계관",
  //     interestBadgeArray: ['#교양','#사랑의 실천','#기독교세계관'],
  //     blogPostContent:{
  //       blogTitle:'자기개발 스터디 모집'
  //     },
  //     category: '자기개발',
  //   },
  // ];

  // const filteredItems = allItems.filter(
  //   (item) => selectedTab === '전체' || item.category === selectedTab
  // );

  return (
    <div className="study-section1" onClick={() => showProduct(item._id)}>
      {/* <div className='study-list-title'>스터디 모집 글</div> */}
      <div className="study-items1">
        <div className="study-item1" key={item.id}>
          <div className="item-badge-section">
            <span className="list-badge-style recruit-badge">모집중</span>

            {item?.category.map((item) => (
              <span className="list-badge-style">{item}</span>
            ))}

            <span className="list-badge-style">{item?.sku}</span>
            {console.log('카테고리', item?.category, item?.sku)}
          </div>

          <div className="study-item-title-section">
            <div className="study-item-subtitle sub-text">#{item?.sku}</div>
            <div className="study-item-title">{item?.name}</div>
          </div>

          <div className="study-item-button-section">
            <FavoriteBorderIcon className={`study-item-icon ${isLiked ? "liked" : ""}`}
              onClick={handleLikeToggle} />
            <div className="icon-number">{likeCount}</div>
            <ArchiveOutlinedIcon className="study-item-icon" />
            <div className="icon-number">{item.favorites || 2}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyList;

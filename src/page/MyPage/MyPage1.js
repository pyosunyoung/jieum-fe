import React from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import OrderStatusCard from './component/OrderStatusCard';
import './style/orderStatus.style.css';
import { getOrder } from '../../features/order/orderSlice';
import { getTemperature, loginWithToken, updateTemperature } from '../../features/user/userSlice';
import { useNavigate } from 'react-router';
import MyInfoPage from './MyInfoPage';
import MyPageProfile from './user-profile/MyPageProfile';
import { useSearchParams } from 'react-router-dom';
import { getProductList } from '../../features/product/productSlice';

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigateToDetail = (item) => {
    // selectedOrder에서 status 값만 추출

    // statusList를 JSON으로 인코딩하여 URL에 포함
    navigate(`/product-detail/${item._id}`, { state: { selectedOrder } });
  };
  // 기존의 orderList 대신 selectedOrder를 사용하도록 수정
  const { selectedOrder } = useSelector((state) => state.order);
  const { user, loading } = useSelector((state) => state.user);
  console.log('selectedOrder', selectedOrder);

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loginWithToken());
  }, [dispatch]);
  useEffect(() => {
    const storedTemperature = localStorage.getItem("temperature");
    if (storedTemperature) {
      dispatch(updateTemperature(Number(storedTemperature))); // Redux 상태 업데이트
      console.log("storedTemperature ",storedTemperature )
    }
  }, [dispatch]); // dispatch가 변경될 때마다 실행
  
  useEffect(() => {
    if (!user.temperature) {
      dispatch(getTemperature());
    }
  }, [dispatch, user.temperature]);
  
  
  // selectedOrder가 비어 있는 경우 처리
  // if (!selectedOrder || selectedOrder.length === 0) {
  //   return (
  //     <Container className="no-order-box">
  //       <div>진행중인 주문이 없습니다.</div>
  //     </Container>
  //   );
  // }
  if (!user) {
    return <Container>유저 정보를 가져올 수 없습니다.</Container>;
  }
  // selectedOrder를 사용해 주문 목록을 렌더링
  return (
    // <Container className="status-card-container">

    //   <h1>마이페이지</h1>
    //   <div><strong>이름:</strong> {user.name}</div>
    //   <div><strong>학부:</strong> {user.department}</div>
    //   <div><strong>학번:</strong> {user.studentNumber}</div>
    //   <div><strong>다짐의 말:</strong> {user.DeterminationWord}</div>
    //   <div><strong>관심 키워드:</strong> {user.InterestTag}</div>
    //   <hr/>
    //   <h2>내 스터디</h2>
    //   {selectedOrder.map((item) => (
    //     <OrderStatusCard
    //       orderItem={item}
    //       className="status-card-container"
    //       key={item._id}
    //       onClick={() => handleNavigateToDetail(item._id)}
    //     />
    //   ))}

    // </Container>
    <div className='mypage1-margin1'>
      <MyInfoPage user={user} selectedOrder={selectedOrder}/>
      <Container>
      {/* <hr />
      <h2>내 스터디</h2>
      {selectedOrder.map((item) => (
        <OrderStatusCard
          orderItem={item}
          className="status-card-container"
          key={item._id}
          onClick={() => handleNavigateToDetail(item._id)}
        />
      ))} */}
      </Container>
      
    </div>
  );
};

export default MyPage;

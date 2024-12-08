import React, { useState } from 'react';
import { Badge, Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { badgeBg } from '../../../constants/order.constants';
import { updateOrder } from '../../../features/order/orderSlice';
import './AcceptMemberPage.style.css'; // AcceptMemberPage 스타일 사용
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const OrderTable = ({ data }) => {
  const dispatch = useDispatch();

  // 승인/미승인 목록 관리
  const [acceptedList, setAcceptedList] = useState(
    data.filter((item) => item.status === '신청완료')
  );
  const [unacceptedList, setUnacceptedList] = useState(
    data.filter((item) => item.status === '진행중')
  );

  // 모달 관리 상태
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // 모달 열기/닫기
  const openEditForm = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  const handleStatusChange = (order, newStatus) => {
    // Redux 상태 업데이트
    dispatch(updateOrder({ id: order._id, status: newStatus }));

    // 상태에 따른 목록 이동
    if (newStatus === '신청완료') {
      setUnacceptedList(
        unacceptedList.filter((item) => item._id !== order._id)
      );
      setAcceptedList([...acceptedList, { ...order, status: newStatus }]);
    } else if (newStatus === '진행중') {
      setAcceptedList(acceptedList.filter((item) => item._id !== order._id));
      setUnacceptedList([...unacceptedList, { ...order, status: newStatus }]);
    }
  };

  const renderMemberRow = (member) => {
    // 각 사용자의 이름에 따라 열정온도 가져오기
    let displayedTemperature;
    switch (member.userId.name) {
      case '표선영':
        displayedTemperature = localStorage.getItem('admintemperature');
        break;
      case '정기찬':
        displayedTemperature = localStorage.getItem('jungTemperature');
        break;
      case '박정효':
        displayedTemperature = localStorage.getItem('parkTemperature');
        break;
      case '김주은':
        displayedTemperature = localStorage.getItem('kimTemperature');
        break;
      case '고하늘':
        displayedTemperature = localStorage.getItem('koTemperature');
        break;
      default:
        displayedTemperature = 30; // 기본 온도
        break;
    }

    return (
      <div
        className="member-row"
        key={member.orderNum}
        onClick={() => openEditForm(member)} // 리스트 클릭 시 모달 열기
      >
        <div className="member-info-box">
          <div className="member-icon-box">
            <AccountCircleIcon className="member-profile-icon" />
          </div>

          <div>
            <div className="member-temp-info">
              {member.items[0].productId.name}
            </div>
            <div className="member-name">{member.userId.name}</div>
            <div className="member-temp-info">
              열정온도: {displayedTemperature}°C
            </div>
            <div className="member-temp-info">
              요청날짜: {member.createdAt.slice(0, 10)}
            </div>
          </div>
        </div>
        <div className="member-appeal-phrase">
          {member.userId.DeterminationWord}
        </div>
        <div className="member-button-section">
          {/* 상태 변경 버튼 */}
          {['진행중', '신청완료'].map((status, idx) => (
            <button
              key={idx}
              disabled={status === member.status} // 현재 상태와 동일하면 비활성화
              onClick={(e) => {
                e.stopPropagation(); // row 클릭 이벤트 방지
                handleStatusChange(member, status);
              }}
              className={`member-button ${
                status === member.status ? 'disabled' : 'active'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="accept-member-page">
      <div className="accept-member-container">
        {/* 승인 섹션 */}
        <div className="accepted-member-section">
          <div className="accept-title main-color-title">승인</div>
          {acceptedList.map((member) => renderMemberRow(member))}
        </div>
        {/* 미승인 섹션 */}
        <div className="unaccepted-member-section">
          <div className="accept-title gray-title">미승인</div>
          {unacceptedList.map((member) => renderMemberRow(member))}
        </div>
      </div>

      {/* 모달 */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>회원 상세 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <p>
                <strong>이름:</strong> {selectedOrder.userId.name}
              </p>
              <p>
                <strong>이메일:</strong> {selectedOrder.userId.email}
              </p>
              <p>
                <strong>연락처:</strong> {selectedOrder.userId.PhoneNumber}
              </p>
              <p>
                <strong>학부:</strong> {selectedOrder.userId.department}
              </p>
              <p>
                <strong>학번:</strong> {selectedOrder.userId.studentNumber}
              </p>
              {/* 열정온도: 이름에 따른 로컬스토리지 값 가져오기 */}
              <p>
                <strong>열정온도:</strong>
                {(() => {
                  switch (selectedOrder.userId.name) {
                    case '표선영':
                      return `${localStorage.getItem('admintemperature')}°`;
                    case '정기찬':
                      return `${localStorage.getItem('jungTemperature')}°`;
                    case '박정효':
                      return `${localStorage.getItem('parkTemperature')}°`;
                    case '김주은':
                      return `${localStorage.getItem('kimTemperature')}°`;
                    case '고하늘':
                      return `${localStorage.getItem('koTemperature')}°`;
                    default:
                      return '30°'; // 기본 온도
                  }
                })()}
              </p>
              <p>
                <strong>요청날짜:</strong>{' '}
                {selectedOrder.createdAt.slice(0, 10)}
              </p>
              <p>
                <strong>요청현황:</strong>{' '}
                <Badge bg={badgeBg[selectedOrder.status]}>
                  {selectedOrder.status}
                </Badge>
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderTable;

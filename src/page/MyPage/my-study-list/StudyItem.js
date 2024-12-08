import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './StudyItem.css';
import { getProductList } from '../../../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from 'react-bootstrap';
import { badgeBg } from '../../../constants/order.constants';
const StudyItem = ({ study, productName, createdAt, productId,orderStatus }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.product.productList);
  const [query] = useSearchParams();
  const name = query.get("name");
  console.log("productList ",productList )
  useEffect(() => {
    dispatch(
      getProductList({
        name,
      })
    );
  }, [query]);

  const handleClick = () => {
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  const { recruitSize, limitlessRecruit, currentRecruit } =
    study?.studyInfo || {};

  return (
    <div className="study-item" onClick={handleClick}>
      <div className="study-header">
        <strong>{productName}</strong>
        <div className="recruit-state-text-box">
          {study?.status === '모집 중' ? (
            <div>
              <span>
                모집 인원: {limitlessRecruit ? '제한 없음' : `${recruitSize}명`}
              </span>
              <span className="study-applicants">
                지원 인원: {currentRecruit}명
              </span>
            </div>
          ) : (
            <span className="current-recruit-text">
              <div className="text-align-center text-12">예약상태</div>
              <Badge bg={badgeBg[orderStatus]}>{orderStatus}</Badge>
            </span>
          )}
        </div>
      </div>
      <p className="study-data">생성 날짜: {createdAt}</p>
    </div>
  );
};

export default StudyItem;

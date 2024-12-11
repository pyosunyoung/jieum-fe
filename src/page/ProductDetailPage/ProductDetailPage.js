import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import { currencyFormat } from "../../utils/number";
import "./style/productDetail.style.css";
import { getProductDetail } from "../../features/product/productSlice";
import { addToCart, addToCartAndCreateOrder } from "../../features/cart/cartSlice";
import { createOrder } from "../../features/order/orderSlice";
import ToastMessage from '../../common/component/ToastMessage';
import Check from './components/Check'
const ProductDetail = () => {
  const dispatch = useDispatch();
  const { selectedProduct, loading } = useSelector((state) => state.product);
  const [size, setSize] = useState("");
  const { id } = useParams();
  const [sizeError, setSizeError] = useState(false);
  const user = useSelector((state) => state.user.user);
  const { totalPrice, cartList } = useSelector((state) => state.cart);
  const { orderList, selectedOrder } = useSelector((state) => state.order); // orderList 추가
  const navigate = useNavigate();
  const location = useLocation();
  console.log("statusList", selectedOrder);

  // const location = useLocation();
  // const { state } = location;

  // // 전달받은 selectedOrder 확인
  // console.log("selectedOrder:", state?.selectedOrder);
  const addItemToCart = async () => {
    if (!user) {
      navigate("/login");
    }
    const payload = {
      shipTo: null,
      contact: { firstName: user.name, lastName: "", contact: user.PhoneNumber || "" },
      orderList: [
        {
          productId: selectedProduct._id,
          price: selectedProduct.price,
          qty: 1,
          size,
        },
      ],
    };
    await Promise.all([dispatch(createOrder(payload))]);
    await dispatch(addToCart({ id, size }));
  };

  const selectSize = (value) => {
    if (sizeError) setSizeError(false);
    setSize(value);
  };

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [id, dispatch]);

  if (loading || !selectedProduct)
    return (
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    );

  // 상태에 따른 버튼 텍스트 및 URL 설정
  const adminButton = (
    <Button
      variant="secondary"
      onClick={() => navigate(`/product/${id}/manage-study`)} // 관리자 페이지 URL
      className='study-button-container-custom'
    
    >
      스터디 관리
    </Button>
  );
  console.log("orderList", orderList)
  const handleCustomerButtonClick = () => {
    // selectedOrder에서 조건에 맞는 항목 찾기
    const matchingOrder = selectedOrder?.find(
      (order) =>
        order.items.some((item) => item.productId._id === id) &&
        order.status === "신청완료"
    );
  
    if (matchingOrder) {
      // 조건이 충족되면 스터디 입장 페이지로 이동
      navigate(`/product/${id}/manage-study`);
    } else {
      // 조건이 충족되지 않으면 경고 메시지 출력
      alert("신청 승인을 확인하세요.");
    }
  };
  const customerButton = (
    <Button variant="secondary" onClick={handleCustomerButtonClick} className='study-button-container-custom'>
      스터디 입장
    </Button>
  );

  return (
    <div className="detailss-page">
    {/* <Container className="product-detail-card">  */}
    {/* 사용자 레벨 및 상태에 따른 추가 버튼 */}
    <div className="study-button-container">
    
          
          </div>
      <Row>
        
        {/* <Col sm={6}>
          <img src={selectedProduct.image} className="w-100" alt="image" />
        </Col> */}
        <Col className="product-info-area" sm={6}>
        {console.log("selectedProduct",selectedProduct)}
          {/* <div className="product-info">{selectedProduct.name}</div>
          <div className="product-info">
            기간 {currencyFormat(selectedProduct.price)}
          </div>
          <div className="product-info">{selectedProduct.description}</div>

          <Dropdown
            className="drop-down size-drop-down"
            title={size}
            align="start"
            onSelect={(value) => selectSize(value)}
          >
            <Dropdown.Toggle
              className="size-drop-down"
              variant={sizeError ? "outline-danger" : "outline-dark"}
              id="dropdown-basic"
              align="start"
            >
              {size === "" ? "각오의 한마디" : size.toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu className="size-drop-down">
              {Object.keys(selectedProduct.stock).length > 0 &&
                Object.keys(selectedProduct.stock).map((item, index) =>
                  selectedProduct.stock[item] > 0 ? (
                    <Dropdown.Item eventKey={item} key={index}>
                      {item.toUpperCase()}
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item eventKey={item} disabled={true} key={index}>
                      {item.toUpperCase()}
                    </Dropdown.Item>
                  )
                )}
            </Dropdown.Menu>
          </Dropdown>
          <div className="warning-message">
            {sizeError && "사이즈를 선택해주세요."}
          </div> */}
          
        </Col>
        
      </Row>
      <Check selectedProduct={selectedProduct} user={user} />
      {console.log("USER",user )}
      <div className="detailss-button-section">
        {user?.level === "admin" && adminButton}
        {user?.level === "customer" && customerButton}
        <Button variant="dark" className="add-button" onClick={addItemToCart}>
            스터디 신청
          </Button>
      </div>
      

        
    {/* </Container> */}
    </div>
  );
};

export default ProductDetail;

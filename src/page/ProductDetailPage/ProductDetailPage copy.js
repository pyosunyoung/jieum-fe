import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import { currencyFormat } from "../../utils/number";
import "./style/productDetail.style.css";
import { getProductDetail } from "../../features/product/productSlice";
import { addToCart, addToCartAndCreateOrder } from "../../features/cart/cartSlice";
import { createOrder } from '../../features/order/orderSlice';


const ProductDetail = () => {
  const dispatch = useDispatch();
  const { selectedProduct, loading } = useSelector((state) => state.product);
  const [size, setSize] = useState("");
  const { id } = useParams();
  const [sizeError, setSizeError] = useState(false);
  const user = useSelector((state) => state.user.user); // 유저정보 들고옴
  const {totalPrice, cartList} = useSelector(state=>state.cart)
  const navigate = useNavigate();
  console.log("cartList",cartList);
  console.log("user",user);
  const addItemToCart = async() => {
    //사이즈를 아직 선택안했다면 에러
    // if(size===""){
    //   setSizeError(true); // 에러메시지 밑에 설정해놈
    //   return;
    // }
    // 아직 로그인을 안한유저라면 로그인페이지로
    if(!user){
      navigate("/login");
      
    }
    // 카트에 아이템 추가하기
    //await dispatch(addToCart({id, size})) // item id size 정보 보냄 id는 userparams정보 보냄
    const payload = {
      
      shipTo: null, // 스터디에는 배송 정보 필요 없음
      contact: { firstName: user.name, lastName: "", contact: user.PhoneNumber || "" },
      orderList: [
        {
          productId: selectedProduct._id,
          price: selectedProduct.price,
          qty: 1, // 기본적으로 수량은 1로 설정
          size,
        },
      ],
    };
    
    await Promise.all([
      dispatch(createOrder(payload)),
    ]);
    await dispatch(addToCart({ id, size }))
  };
  const selectSize = (value) => {
    // 사이즈 추가하기
    console.log(value); // 사이즈값 출력 s, l 이런식
    if(sizeError) setSizeError(false); // error가 즉 트루 메시지가 나오면 setSizeError는 false로 메시지 안나오게 변경
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
  return (
    <Container className="product-detail-card">
      <Row>
        <Col sm={6}>
          <img src={selectedProduct.image} className="w-100" alt="image" />
        </Col>
        <Col className="product-info-area" sm={6}>
          <div className="product-info">{selectedProduct.name}</div>
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
          </div>
          <Button variant="dark" className="add-button" onClick={addItemToCart}>
            스터디 신청
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;

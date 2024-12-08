import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../../../utils/number";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className="card" onClick={() => showProduct(item._id)}>
      {/* <img src={item?.image} alt={item?.image} /> */}
      <div>{item?.name}</div>
      {console.log(item.category)}
      {console.log(item?.stock)}
      <div>{item?.category}, {item?.sku}</div>
      {console.log(item?.stock)}
      <div>기간 {currencyFormat(item?.price)}주</div>
    </div>
  );
};

export default ProductCard;

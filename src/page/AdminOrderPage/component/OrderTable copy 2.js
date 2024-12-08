import React from "react";
import { Table, Badge, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { badgeBg } from "../../../constants/order.constants";
import { currencyFormat } from "../../../utils/number";
import { updateOrder } from "../../../features/order/orderSlice";

const OrderTable = ({ header, data, openEditForm }) => {
  const dispatch = useDispatch();

  const handleStatusChange = (order, newStatus) => {
    dispatch(updateOrder({ id: order._id, status: newStatus }));
  };

  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
            <th>Actions</th> {/* 추가된 열 */}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.orderNum} onClick={() => openEditForm(item)}>
                <th>{index}</th>
                <th>{item.orderNum}</th>
                <th>{item.createdAt.slice(0, 10)}</th>
                <th>{item.userId.email}</th>
                {item.items.length > 0 ? (
                  <th>
                    {item.items[0].productId.name}
                    {item.items.length > 1 && ` 외 ${item.items.length - 1}개`}
                  </th>
                ) : (
                  <th></th>
                )}
                <th>{currencyFormat(item.totalPrice)}</th>
                <th>
                  <Badge bg={badgeBg[item.status]}>{item.status}</Badge>
                </th>
                <th>
                  {/* 상태 변경 버튼 */}
                  {["진행중", "신청완료", "불가"].map((status, idx) => (
                    <Button
                      key={idx}
                      variant={status === item.status ? "secondary" : "primary"}
                      size="sm"
                      disabled={status === item.status} // 현재 상태와 동일하면 비활성화
                      onClick={(e) => {
                        e.stopPropagation(); // row 클릭 이벤트 방지
                        handleStatusChange(item, status);
                      }}
                      className="me-1"
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </th>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={header.length + 1}>No Data to show</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderTable;

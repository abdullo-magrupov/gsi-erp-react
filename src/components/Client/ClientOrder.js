import React from "react";
import axios from "../../axios-init";

const clientOrder = props => {
  const onEditOrder = order => {
    props.history.push("/order/edit/" + order.orderId);
  };

  const onViewOrder = order => {
    props.history.push("/order/view/" + order.orderId);
  };

  const onDeleteOrder = order => {
    let confirmed = window.confirm("Хотите удалить заказ?");

    if (confirmed) {
      axios
        .delete("/order/delete/" + order.orderId)
        .then(response => {
          window.location.reload();
        })
        .catch(error => {
          window.alert(error);
        });
    }
  };

  return (
    <tr>
      <td>{props.orderData.orderDate}</td>
      <td>{props.orderData.totalAmount}</td>
      <td>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onViewOrder(props.orderData)}
        >
          Просмотр
        </button>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => onEditOrder(props.orderData)}
        >
          Редактировать
        </button>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDeleteOrder(props.orderData)}
        >
          Удалит
        </button>
      </td>
    </tr>
  );
};

export default clientOrder;

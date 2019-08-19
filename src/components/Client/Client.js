import React from "react";
import axios from "../../axios-init";

const client = props => {
  const onTwiceClicked = client => {
    props.history.push(
      "/client/actions/" + client.clientId + "/" + client.name
    );
  };

  /*const onClickNewOrder = client => {
    props.history.push("/client/order/add/" + client.clientId);
  };

  const onClickClientOrders = client => {
    props.history.push("/client/orders/" + client.clientId);
  };*/

  const onClickEdit = client => {
    props.history.push("/client/edit/" + client.clientId);
  };

  const onClickDelete = client => {
    let confirmed = window.confirm("Хотите удалить " + client.name + "?");

    if (confirmed) {
      axios
        .delete("/client/delete/" + client.clientId)
        .then(response => {
          window.location.reload();
        })
        .catch(error => {
          window.alert(error);
        });
    }
  };

  return (
    <tr onDoubleClick={() => onTwiceClicked(props.clientData)}>
      <th scope="row">{props.clientData.name}</th>
      <td>{props.clientData.phoneNumber}</td>
      <td>{props.clientData.address}</td>
      <td>
        <button
          style={{ margin: "10px 10px" }}
          type="button"
          className="btn btn-warning"
          onClick={() => onClickEdit(props.clientData)}
        >
          Редактировать
        </button>
        <button
          style={{ margin: "10px 10px" }}
          type="button"
          className="btn btn-danger"
          onClick={() => onClickDelete(props.clientData)}
        >
          Удалит
        </button>
      </td>
    </tr>
  );
};

export default client;

import React, { Component } from "react";
import { connect } from "react-redux";

import * as clientActions from "../../store/actions/ClientActions/clientActions";
import ClientOrder from "../../components/Client/ClientOrder";

class ClientOrders extends Component {
  componentDidMount() {
    let clientId = parseInt(this.props.match.params.clientId);
    this.props.onInitClientOrders(clientId);
  }

  onClickNewOrder = () => {
    this.props.history.push(
      "/client/order/add/" + this.props.match.params.clientId
    );
  };

  onClickBack = () => {
    this.props.history.goBack();
  };

  render() {
    let orders = this.props.clientOrders.map((x, ind) => (
      <ClientOrder
        key={"orderId" + x.orderId}
        orderData={x}
        history={this.props.history}
      />
    ));

    let ordersTable = (
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Дата заказа</th>
            <th scope="col">Сумма</th>
            <th scope="col" />
            <th scope="col" />
          </tr>
        </thead>
        <tbody>{orders}</tbody>
      </table>
    );

    return (
      <div>
        <div style={{ width: "100%" }}>
          <div style={{ margin: "20px 10px", float: "left" }}>
            <button
              type="button"
              className="btn btn-warning"
              onClick={this.onClickBack}
            >
              Назад
            </button>
          </div>
          <div style={{ margin: "20px 10px", float: "left" }}>
            <button
              type="button"
              className="btn btn-success"
              onClick={this.onClickNewOrder}
            >
              Добавит
            </button>
          </div>
        </div>
        {ordersTable}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clientOrders: state.client.clientOrders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitClientOrders: clientId =>
      dispatch(clientActions.getClientOrders(clientId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientOrders);

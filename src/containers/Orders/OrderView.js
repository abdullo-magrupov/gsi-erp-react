import React, { Component } from "react";
import axios from "../../axios-init";

class OrderView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderDate: undefined,
      totalAmount: undefined,
      products: []
    };

    this.onClickBack = this.onClickBack.bind(this);
  }

  componentDidMount() {
    axios
      .get("/order/" + this.props.match.params.orderId)
      .then(response => {
        let order = response.data;
        let orderDate = order.orderDate.substring(0, 10);

        let products = order.orderProducts.map(x => {
          return {
            productId: x.product.productId,
            name: x.product.name,
            boxQuant: x.boxQuant,
            soldQuant: x.soldQuant,
            soldPrice: x.soldPrice,
            soldAmount: x.soldAmount
          };
        });

        this.setState({
          orderDate: orderDate,
          totalAmount: order.totalAmount,
          products: products
        });
      })
      .catch(error => {
        window.alert(error);
      });
  }

  onClickBack = () => {
    this.props.history.goBack();
  };

  render() {
    let productRows = this.state.products.map(x => (
      <tr key={"orderProductId" + x.productId}>
        <td>{x.name}</td>
        <td>{x.boxQuant}</td>
        <td>{x.soldPrice}</td>
        <td>{x.soldQuant}</td>
        <td>{x.soldAmount}</td>
      </tr>
    ));

    let orderSummary = (
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Название</th>
            <th scope="col">Количество в упаковке</th>
            <th scope="col">Цена</th>
            <th scope="col">Количество</th>
            <th scope="col">Сумма</th>
          </tr>
        </thead>
        <tbody>
          {productRows}
          <tr>
            <th colspan="4">Общая сумма</th>
            <th>{this.state.totalAmount}</th>
          </tr>
        </tbody>
      </table>
    );

    return (
      <div style={{ margin: "25px 20px" }}>
        <div className="col-sm-2" style={{ margin: "20px 10px" }}>
          <button
            type="button"
            className="btn btn-warning"
            onClick={this.onClickBack}
          >
            Назад
          </button>
        </div>
        {orderSummary}
      </div>
    );
  }
}

export default OrderView;

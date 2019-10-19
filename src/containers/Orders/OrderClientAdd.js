import React, { Component } from "react";
import axios from "../../axios-init";

class OrderClientAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientId: undefined,
      clientName: "",
      orderDate: undefined,
      orderAmount: 0,
      discountAmount: 0,
      totalAmount: 0,
      note: "",
      products: []
    };

    this.onChangeProp = this.onChangeProp.bind(this);
  }

  componentDidMount = () => {
    axios
      .get("/product/all")
      .then(response => {
        axios
          .get("/client/productprices/" + this.props.match.params.clientId)
          .then(result => {
            let productPrices = result.data;

            let products = response.data.map(x => {
              let index = productPrices.findIndex(
                z => z.product.productId === x.productId
              );

              if (index > -1) {
                x.soldPrice = productPrices[index].price;
              } else {
                x.soldPrice = undefined;
              }

              x.soldQuant = undefined;
              x.soldAmount = undefined;
              x.boxPrice = x.soldPrice ? x.soldPrice * x.boxQuant : undefined;
              return x;
            });

            this.setState({
              clientId: this.props.match.params.clientId,
              clientName: this.props.match.params.clientName,
              products: products
            });
          })
          .catch(error => {
            window.alert(error);
          });
      })
      .catch(error => {
        window.alert(error);
      });
  };

  onClickBack = () => {
    this.props.history.goBack();
  };

  onChangeProp = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeValue = (ind, event) => {
    let products = [...this.state.products];
    products[ind][event.target.name] = event.target.value;

    if (products[ind].soldQuant > 0 && products[ind].soldPrice > 0) {
      products[ind].soldAmount =
        products[ind].soldQuant *
        products[ind].soldPrice *
        products[ind].boxQuant;
    } else {
      products[ind].soldAmount = undefined;
    }

    if (products[ind].soldPrice > 0) {
      products[ind].boxPrice = products[ind].soldPrice * products[ind].boxQuant;
    } else {
      products[ind].boxPrice = undefined;
    }

    let totalAmount = products.reduce((sum, x) => {
      if (x.soldPrice > 0 && x.soldQuant > 0) {
        return sum + x.soldQuant * x.boxQuant * x.soldPrice;
      } else {
        return sum + 0;
      }
    }, 0);

    this.setState({
      products: products,
      totalAmount: totalAmount,
      orderAmount: totalAmount
    });
  };

  isNull = item => {
    return item === undefined || item === null || item === "";
  };

  onSaveOrder = event => {
    let orderProducts = this.state.products
      .filter(x => x.soldPrice > 0 && x.soldQuant > 0)
      .map(x => {
        return {
          product: { productId: x.productId },
          boxQuant: x.boxQuant,
          soldQuant: x.soldQuant,
          soldPrice: x.soldPrice,
          soldAmount: x.soldAmount
        };
      });

    let productPrices = this.state.products
      .filter(x => x.soldPrice > 0)
      .map(x => {
        return {
          client: { clientId: this.state.clientId },
          product: { productId: x.productId },
          price: x.soldPrice
        };
      });

    let orderData = {
      clientId: this.state.clientId,
      orderDate: this.state.orderDate,
      orderAmount: this.state.orderAmount,
      discountAmount: 0,
      totalAmount: this.state.totalAmount,
      note: this.state.note,
      orderProducts: orderProducts,
      productPrices: productPrices
    };

    if (this.isNull(orderData.orderDate)) {
      window.alert("Выберите дату заказа!");
      return;
    } else if (orderData.orderProducts.length < 1) {
      window.alert("Выберите продукт!");
      return;
    }

    axios
      .post("/order/add", orderData)
      .then(response => {
        this.props.history.push(
          "/client/actions/" + this.state.clientId + "/" + this.state.clientName
        );
      })
      .catch(error => {
        window.alert(error);
      });
  };

  render() {
    let productRows = this.state.products.map((x, ind) => (
      <tr key={"productKey" + x.productId}>
        <td>
          <label>{x.name}</label>
        </td>
        <td>
          <label>{x.boxQuant}</label>
        </td>
        <td>
          <label>{x.boxPrice}</label>
        </td>
        <td>
          <input
            type="number"
            name="soldPrice"
            value={x.soldPrice}
            onChange={this.onChangeValue.bind(this, ind)}
          />
        </td>
        <td>
          <input
            type="number"
            name="soldQuant"
            value={x.soldQuant}
            onChange={this.onChangeValue.bind(this, ind)}
          />
        </td>
      </tr>
    ));

    let productsTable = (
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Название</th>
            <th scope="col">Количество в упаковке</th>
            <th scope="col">Цена одной упаковке</th>
            <th scope="col">Цена</th>
            <th scope="col">Количество</th>
          </tr>
        </thead>
        <tbody>{productRows}</tbody>
      </table>
    );

    let orderItems = this.state.products.filter(
      x => x.soldPrice > 0 && x.soldQuant > 0
    );

    let orderItemRows = orderItems.map(x => (
      <tr key={"orderItemId" + x.productId}>
        <td>{x.name}</td>
        <td>{x.boxPrice}</td>
        <td>{x.soldQuant}</td>
        <td>{x.soldPrice * x.soldQuant * x.boxQuant}</td>
      </tr>
    ));

    let orderSummaryTable = (
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Название</th>
            <th scope="col">Цена одной упаковке</th>
            <th scope="col">Количество</th>
            <th scope="col">Сумма</th>
          </tr>
        </thead>
        <tbody>
          {orderItemRows}
          <tr>
            <th colSpan="3">Обшая сумма</th>
            <th>{this.state.totalAmount}</th>
          </tr>
        </tbody>
      </table>
    );

    return (
      <div style={{ width: "100%" }}>
        <div style={{ width: "100%", margin: "25px 15px" }}>
          <button
            style={{ margin: "10px 10px" }}
            type="button"
            className="btn btn-warning"
            onClick={this.onClickBack}
          >
            Назад
          </button>
          <button
            style={{ margin: "10px 10px" }}
            type="button"
            className="btn btn-primary"
            onClick={this.onSaveOrder}
          >
            Сохранить
          </button>
        </div>
        <div style={{ width: "100%", margin: "25px 15px" }}>
          <label style={{ margin: "0 15px", fontWeight: "bold" }}>
            Дата заказа
          </label>
          <input
            type="date"
            name="orderDate"
            value={this.state.orderDate}
            onChange={this.onChangeProp}
          />
        </div>
        <div style={{ width: "100%", margin: "25px 15px" }}>
          <label style={{ margin: "0 15px", fontWeight: "bold" }}>
            Заметка
          </label>
          <input
            type="text"
            name="note"
            value={this.state.note}
            onChange={this.onChangeProp}
          />
        </div>
        <div style={{ width: "45%", float: "left", margin: "25px 15px" }}>
          {productsTable}
        </div>

        {orderItems.length > 0 ? (
          <div
            style={{ width: "40%", float: "right", margin: "25px 20px 25px 0" }}
          >
            {orderSummaryTable}
          </div>
        ) : null}
      </div>
    );
  }
}

export default OrderClientAdd;

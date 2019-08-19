import React, { Component } from "react";
import axios from "../../axios-init";

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };

    this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  componentDidMount() {
    axios
      .get("/product/all")
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch(error => {
        window.alert(error);
      });
  }

  onClickAdd = () => {
    this.props.history.push("/product/add");
  };

  onClickEdit = product => {
    this.props.history.push("/product/edit/" + product.productId);
  };

  onClickDelete = product => {
    let confirm = window.confirm("Хотите удалить " + product.name + "?");

    if (confirm) {
      axios
        .delete("/product/delete/" + product.productId)
        .then(response => {
          window.location.reload();
        })
        .catch(error => {
          window.alert(error);
        });
    }
  };

  render() {
    let products = this.state.products.map(x => (
      <tr key={"productId" + x.productId}>
        <td>{x.name}</td>
        <td>{x.boxQuant}</td>
        <td>{x.measure.shortName}</td>
        <td>
          <button
            style={{ margin: "10px 10px" }}
            type="button"
            className="btn btn-warning"
            onClick={this.onClickEdit.bind(this, x)}
          >
            Редактировать
          </button>
          <button
            style={{ margin: "10px 10px" }}
            type="button"
            className="btn btn-danger"
            onClick={this.onClickDelete.bind(this, x)}
          >
            Удалить
          </button>
        </td>
      </tr>
    ));

    let productTable = (
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Название</th>
            <th scope="col">Количество в упаковке</th>
            <th scope="col">Измерения</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>{products}</tbody>
      </table>
    );

    return (
      <div>
        <div className="col-sm-2" style={{ margin: "20px 10px" }}>
          <button
            type="button"
            className="btn btn-success"
            onClick={this.onClickAdd}
          >
            Добавит
          </button>
        </div>
        <div style={{ width: "100%", float: "left", margin: "15px 20px" }}>
          {productTable}
        </div>
      </div>
    );
  }
}

export default Products;

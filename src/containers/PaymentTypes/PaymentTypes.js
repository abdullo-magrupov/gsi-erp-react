import React, { Component } from "react";
import axios from "../../axios-init";

class PaymentTypes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  componentDidMount() {
    axios
      .get("/paymenttype/all")
      .then(response => {
        this.setState({ items: response.data });
      })
      .catch(error => {
        if (error.message) {
          window.alert(error.message);
        } else {
          window.alert(error);
        }
      });
  }

  onClickAdd = () => {
    this.props.history.push("/paymenttype/add");
  };

  onClickEdit = (item, event) => {
    this.props.history.push("/paymenttype/edit/" + item.paymentTypeId);
  };

  onClickDelete = (item, event) => {
    let confirmed = window.confirm("Хотите удалить " + item.name + "?");

    if (confirmed) {
      axios
        .delete("/paymenttype/delete/" + item.paymentTypeId)
        .then(response => {
          window.location.reload();
        })
        .catch(error => {
          window.alert(error);
        });
    }
  };

  render() {
    let paymentTypes = this.state.items.map(x => (
      <tr key={"paymentTypeId" + x.paymentTypeId}>
        <td>{x.name}</td>
        <td>
          <button
            style={{ margin: "0 10px" }}
            type="button"
            className="btn btn-warning"
            onClick={this.onClickEdit.bind(this, x)}
          >
            Редактировать
          </button>
          <button
            style={{ margin: "0 10px" }}
            type="button"
            className="btn btn-danger"
            onClick={this.onClickDelete.bind(this, x)}
          >
            Удалить
          </button>
        </td>
      </tr>
    ));

    let paymentTypeTable = (
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Название</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>{paymentTypes}</tbody>
      </table>
    );

    return (
      <div style={{ width: "100%" }}>
        <div style={{ width: "90%", margin: "20px 15px" }}>
          <button
            style={{ margin: "10px 10px" }}
            type="button"
            className="btn btn-success"
            onClick={this.onClickAdd}
          >
            Добавит
          </button>
        </div>
        <div style={{ width: "100%", float: "left", margin: "15px 20px" }}>
          {paymentTypeTable}
        </div>
      </div>
    );
  }
}

export default PaymentTypes;

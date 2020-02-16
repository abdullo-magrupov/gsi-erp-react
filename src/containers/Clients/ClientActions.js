import React, { Component } from "react";
import axios from "../../axios-init";

class ClientActions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      actions: [],
      balance: undefined
    };
  }

  componentDidMount() {
    axios
      .get("/client/actions/" + this.props.match.params.clientId)
      .then(response => {
        axios
          .get("/client/balance/" + this.props.match.params.clientId)
          .then(result => {
            this.setState({
              name: this.props.match.params.clientName,
              balance: result.data
            });
          })
          .catch(error => {
            window.alert(error);
          });

        response.data.forEach((x, ind, arr) => {
          if (ind === 0) {
            x.balance = 0;
          } else {
            if (arr[ind - 1].actionName === 'client_order') {
              x.balance = arr[ind - 1].balance + arr[ind - 1].sourceAmount;
            } else {
              x.balance = arr[ind - 1].balance - arr[ind - 1].sourceAmount;
            }
          }
        });
        
        this.setState({ actions: response.data });
      })
      .catch(error => {
        window.alert(error);
      });
  }

  onClickEdit = action => {
    let path = "";

    if (action.actionName === "client_order") {
      path = "/order/edit/" + action.sourceId + "/" + this.state.name;
    } else {
      path = "/clientpayment/edit/" + action.sourceId;
    }

    this.props.history.push(path);
  };

  onClickDelete = action => {
    let confirmed = window.confirm("Хотите удалит?");

    if (confirmed) {
      let path = "";

      if (action.actionName === "client_order") {
        path = "/order/delete/" + action.sourceId;
      } else {
        path = "/clientpayment/delete/" + action.sourceId;
      }

      axios
        .delete(path)
        .then(response => {
          window.location.reload();
        })
        .catch(error => {
          window.alert(error);
        });
    } else {
      return;
    }
  };

  onClickAddOrder = () => {
    this.props.history.push(
      "/client/order/add/" +
        this.props.match.params.clientId +
        "/" +
        this.props.match.params.clientName
    );
  };

  onClickAddPayment = () => {
    this.props.history.push(
      "/clientpayment/add/" +
        this.props.match.params.clientId +
        "/" +
        this.props.match.params.clientName
    );
  };

  render() {
    let clientActions = this.state.actions.map(x => {
      let actionStyle = {};
      if (x.actionName === "client_payment") {
        actionStyle = { backgroundColor: "#a4ff9c" };
      }
      return (
        <tr
          key={"actionId" + x.actionId}
          style={actionStyle}
          onDoubleClick={this.onClickEdit.bind(this, x)}
        >
          <td>{x.sourceDate}</td>
          <td>{x.sourceAmount}</td>
          <td>{x.balance}</td>
          <td>{x.sourceNote}</td>
          <td>
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
      );
    });

    let actionsTable = (
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Дата</th>
            <th scope="col">Сумма</th>
            <th scope="col">Остатка</th>
            <th scope="col">Заметка</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {clientActions}
          <tr style={{ fontWeight: "bold" }}>
            <td colSpan="2">Остатка</td>
            <td>{this.state.balance}</td>
            <td colSpan="2"/>
          </tr>
        </tbody>
      </table>
    );

    return (
      <div style={{ width: "100%" }}>
        <div style={{ width: "100%" }}>
          <label
            style={{
              margin: "15px 25px",
              fontSize: "1.2rem",
              fontWeight: "bold"
            }}
          >
            {"Остаток клиента " +
              '"' +
              this.state.name +
              '" = ' +
              this.state.balance}
          </label>
        </div>
        <div style={{ width: "90%", margin: "20px 15px" }}>
          <button
            style={{ margin: "10px 10px" }}
            type="button"
            className="btn btn-success"
            onClick={this.onClickAddOrder}
          >
            Новый заказ
          </button>
          <button
            style={{ margin: "10px 10px" }}
            type="button"
            className="btn btn-success"
            onClick={this.onClickAddPayment}
          >
            Новая оплата
          </button>
          <a id="up" style={{border: "2px solid green", padding: "5px 10px"}}  href="#low">v</a>
        </div>
        <div style={{ width: "100%", float: "left", margin: "15px 20px" }}>
          {actionsTable}
          <a id="low" style={{border: "2px solid green", padding: "5px 10px"}} href="#up">^</a>
        </div>
      </div>
    );
  }
}

export default ClientActions;

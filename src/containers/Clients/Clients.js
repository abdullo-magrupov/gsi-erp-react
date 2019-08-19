import React, { Component } from "react";
import { connect } from "react-redux";

import * as clientActions from "../../store/actions/ClientActions/clientActions";

import Client from "../../components/Client/Client";

class Clients extends Component {
  componentDidMount() {
    this.props.onInitClients();
  }

  onClickAdd = () => {
    this.props.history.push("/client/add");
  };

  render() {
    let clients = this.props.clients.map((x, ind) => (
      <Client
        key={"clientId" + x.clientId}
        clientData={x}
        history={this.props.history}
      />
    ));

    let clientsTable = (
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Название</th>
            <th scope="col">Телефон</th>
            <th scope="col">Адрес</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>{clients}</tbody>
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
          {clientsTable}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clients: state.client.clients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitClients: () => dispatch(clientActions.getAllClients())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clients);

import React, { Component } from "react";
import axios from "../../axios-init";

class ClientAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phoneNumber: "",
      address: "",
      orderNo: undefined
    };

    this.onChangeProp = this.onChangeProp.bind(this);
    this.onSaveClient = this.onSaveClient.bind(this);
  }

  onChangeProp = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSaveClient = event => {
    event.preventDefault();

    let data = {
      name: this.state.name,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      orderNo: this.state.orderNo
    };

    if (data.name === undefined || data.name === null || data.name === "") {
      window.alert("Заполните поле название!");
      return;
    }

    axios
      .post("/client/add", data)
      .then(response => {
        this.props.history.push("/client/all");
      })
      .catch(error => {
        window.alert(error);
      });
  };

  render() {
    let clientForm = (
      <form style={{ margin: "20px 20px" }} onSubmit={this.onSaveClient}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Название</label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              name="name"
              value={this.state.name}
              onChange={this.onChangeProp}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Телефон</label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              value={this.state.phoneNumber}
              onChange={this.onChangeProp}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Адрес</label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              name="address"
              value={this.state.address}
              onChange={this.onChangeProp}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Порядковый №</label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              name="orderNo"
              value={this.state.orderNo}
              onChange={this.onChangeProp}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button
              type="submit"
              className="btn btn-primary"
              onSubmit={this.onSaveClient}
            >
              Сохранить
            </button>
          </div>
        </div>
      </form>
    );

    return <div>{clientForm}</div>;
  }
}

export default ClientAdd;

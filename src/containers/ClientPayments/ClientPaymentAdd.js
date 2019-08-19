import React, { Component } from "react";
import axios from "../../axios-init";

class ClientPaymentAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientId: undefined,
      clientName: "",
      paymentDate: undefined,
      paymentAmount: undefined,
      paymentTypeId: undefined,
      note: "",
      paymentTypes: []
    };

    this.onChangeProp = this.onChangeProp.bind(this);
    this.onSavePayment = this.onSavePayment.bind(this);
  }

  componentDidMount() {
    axios
      .get("/paymenttype/all")
      .then(response => {
        this.setState({
          clientId: this.props.match.params.clientId,
          clientName: this.props.match.params.clientName,
          paymentTypes: response.data,
          paymentTypeId: response.data[0].paymentTypeId
        });
      })
      .catch(error => {
        window.alert(error);
      });
  }

  onChangeProp = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSavePayment = event => {
    event.preventDefault();

    let data = {
      client: { clientId: this.state.clientId },
      paymentType: { paymentTypeId: this.state.paymentTypeId },
      paymentDate: this.state.paymentDate,
      paymentAmount: this.state.paymentAmount,
      note: this.state.note
    };

    if (
      data.paymentDate === null ||
      data.paymentDate === undefined ||
      data.paymentDate === ""
    ) {
      window.alert("Выберите дата оплаты!");
      return;
    } else if (
      data.paymentAmount === null ||
      data.paymentAmount === undefined ||
      data.paymentAmount < 0
    ) {
      window.alert("Введите правильную сумма оплаты!");
      return;
    } else if (
      this.state.paymentTypeId === null ||
      this.state.paymentTypeId === undefined
    ) {
      window.alert("Выберите тип оплаты!");
      return;
    }

    axios
      .post("/clientpayment/add", data)
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
    let selectOptions = this.state.paymentTypes.map((x, ind) => (
      <option key={"paymentTypeId" + x.paymentTypeId} value={x.paymentTypeId}>
        {x.name}
      </option>
    ));

    let dropDown = (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Тип оплата</label>
        <div className="col-sm-4">
          <select
            className="form-control"
            name="paymentTypeId"
            onChange={this.onChangeProp}
            value={this.state.paymentTypeId}
          >
            {selectOptions}
          </select>
        </div>
      </div>
    );

    let submitForm = (
      <form style={{ margin: "20px 20px" }} onSubmit={this.onSavePayment}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Дата оплаты</label>
          <div className="col-sm-4">
            <input
              type="date"
              className="form-control"
              name="paymentDate"
              value={this.state.paymentDate}
              onChange={this.onChangeProp}
            />
          </div>
        </div>
        {dropDown}
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Сумма оплаты</label>
          <div className="col-sm-4">
            <input
              type="number"
              className="form-control"
              name="paymentAmount"
              value={this.state.paymentAmount}
              onChange={this.onChangeProp}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Заметка</label>
          <div className="col-sm-4">
            <input
              type="text-area"
              className="form-control"
              name="note"
              value={this.state.note}
              onChange={this.onChangeProp}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10">
            <button
              type="submit"
              className="btn btn-primary"
              onSubmit={this.onSavePayment}
            >
              Сохранить
            </button>
          </div>
        </div>
      </form>
    );

    return <div>{submitForm}</div>;
  }
}

export default ClientPaymentAdd;

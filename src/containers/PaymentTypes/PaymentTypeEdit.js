import React, { Component } from "react";
import axios from "../../axios-init";

class PaymentTypeEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paymentTypeId: undefined,
      name: ""
    };

    this.onChangeProp = this.onChangeProp.bind(this);
  }

  componentDidMount() {
    axios
      .get("/paymenttype/" + this.props.match.params.paymentTypeId)
      .then(response => {
        this.setState({
          paymentTypeId: response.data.paymentTypeId,
          name: response.data.name
        });
      })
      .catch(error => {
        window.alert(error);
      });
  }

  onChangeProp = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onClickSave = event => {
    event.preventDefault();

    let data = {
      paymentTypeId: this.state.paymentTypeId,
      name: this.state.name
    };

    if (data.name === null || data.name === undefined || data.name === "") {
      window.alert("Заполните поле название");
      return;
    }

    axios
      .post("/paymenttype/add", data)
      .then(response => {
        this.props.history.push("/paymenttype/all");
      })
      .catch(error => {
        window.alert(error);
      });
  };

  render() {
    let paymentForm = (
      <form style={{ margin: "20px 20px" }} onSubmit={this.onClickSave}>
        <div className="form-group row">
          <label className="col-sm-1 col-form-label">Название</label>
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
          <div className="col-sm-10">
            <button
              type="submit"
              className="btn btn-primary"
              onSubmit={this.onClickSave}
            >
              Сохранить
            </button>
          </div>
        </div>
      </form>
    );

    return <div>{paymentForm}</div>;
  }
}

export default PaymentTypeEdit;

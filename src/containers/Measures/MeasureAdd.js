import React, { Component } from "react";
import axios from "../../axios-init";

class MeasureAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      shortName: "",
      orderNo: ""
    };

    this.onChangeProp = this.onChangeProp.bind(this);
    this.onSaveMeasure = this.onSaveMeasure.bind(this);
  }

  onChangeProp = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSaveMeasure = event => {
    event.preventDefault();

    let data = {
      name: this.state.name,
      shortName: this.state.shortName,
      orderNo: this.state.orderNo
    };

    if (data.name === null || data.name === undefined || data.name === "") {
      window.alert("Заполните название!");
      return;
    } else if (
      data.shortName === null ||
      data.shortName === undefined ||
      data.shortName === ""
    ) {
      window.alert("Заполните короткое название!");
      return;
    }

    axios
      .post("/measure/add", data)
      .then(response => {
        this.props.history.push("/measure/all");
      })
      .catch(error => alert(error));
  };

  render() {
    let measureForm = (
      <form style={{ margin: "20px 20px" }} onSubmit={this.onSaveMeasure}>
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
          <label className="col-sm-2 col-form-label">Короткое название</label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              name="shortName"
              value={this.state.shortName}
              onChange={this.onChangeProp}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button
              type="submit"
              className="btn btn-primary"
              onSubmit={this.onSaveMeasure}
            >
              Сохранить
            </button>
          </div>
        </div>
      </form>
    );

    return <div>{measureForm}</div>;
  }
}

export default MeasureAdd;

import React, { Component } from "react";
import axios from "../../axios-init";

class ProductEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: undefined,
      name: "",
      boxQuant: undefined,
      orderNo: undefined,
      measureId: undefined,
      measures: []
    };

    this.onChangeProp = this.onChangeProp.bind(this);
    this.onSaveProduct = this.onSaveProduct.bind(this);
  }

  componentDidMount = () => {
    axios
      .get("/measure/all")
      .then(response => {
        this.setState({
          measures: response.data
        });
      })
      .catch(error => {
        window.alert(error);
      });

    axios
      .get("/product/" + this.props.match.params.productId)
      .then(response => {
        this.setState({
          productId: response.data.productId,
          name: response.data.name,
          boxQuant: response.data.boxQuant,
          orderNo: response.data.orderNo,
          measureId: response.data.measure.measureId
        });
      })
      .catch(error => {
        window.alert(error);
      });
  };

  onChangeProp = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSaveProduct = event => {
    event.preventDefault();

    let data = {
      productId: this.state.productId,
      name: this.state.name,
      boxQuant: this.state.boxQuant,
      orderNo: this.state.orderNo,
      measure: { measureId: this.state.measureId }
    };

    if (data.name === null || data.name === undefined || data.name === "") {
      window.alert("Заполните название!");
      return;
    } else if (
      data.boxQuant === null ||
      data.boxQuant === undefined ||
      data.boxQuant < 1
    ) {
      window.alert("Введите правилную количество в упаковке!");
      return;
    } else if (
      data.measure.measureId === null ||
      data.measure.measureId === undefined ||
      data.measure.measureId < 1
    ) {
      window.alert("Выберите измерения!");
      return;
    }

    axios
      .post("/product/add", data)
      .then(response => {
        this.props.history.push("/product/all");
      })
      .catch(error => {
        window.alert(error);
      });
  };

  render() {
    let selectOptions = this.state.measures.map((x, ind) => (
      <option key={"measureId" + x.measureId} value={x.measureId}>
        {x.name}
      </option>
    ));

    let dropDown = (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Измерения</label>
        <div className="col-sm-4">
          <select
            className="form-control"
            name="measureId"
            onChange={this.onChangeProp}
            value={this.state.measureId}
          >
            {selectOptions}
          </select>
        </div>
      </div>
    );

    let submitForm = (
      <form style={{ margin: "20px 20px" }} onSubmit={this.onSaveProduct}>
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
          <label className="col-sm-2 col-form-label">
            Количество в упаковке
          </label>
          <div className="col-sm-4">
            <input
              type="number"
              className="form-control"
              name="boxQuant"
              value={this.state.boxQuant}
              onChange={this.onChangeProp}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Порядковый №</label>
          <div className="col-sm-4">
            <input
              type="number"
              className="form-control"
              name="orderNo"
              value={this.state.orderNo}
              onChange={this.onChangeProp}
            />
          </div>
        </div>
        {dropDown}
        <div className="form-group row">
          <div className="col-sm-10">
            <button
              type="submit"
              className="btn btn-primary"
              onSubmit={this.onSaveProduct}
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

export default ProductEdit;

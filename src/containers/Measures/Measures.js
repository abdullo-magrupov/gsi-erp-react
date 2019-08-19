import React, { Component } from "react";
import { connect } from "react-redux";
import * as measureActions from "../../store/actions/MeasureActions/measureActions";
import axios from "../../axios-init";

class Measures extends Component {
  componentDidMount() {
    this.props.onInitMeasures();
  }

  onClickNewMeasure = () => {
    this.props.history.push("/measure/add");
  };

  onClickEditMeasure = measure => {
    this.props.history.push("/measure/edit/" + measure.measureId);
  };

  onClickDeleteMeasure = measure => {
    let confirmed = window.confirm("Хотите удалит + " + measure.name + "?");

    if (confirmed) {
      axios
        .delete("/measure/delete/" + measure.measureId)
        .then(response => {
          window.location.reload();
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  render() {
    let measures = this.props.measures.map(x => (
      <tr key={"measureId" + x.measureId}>
        <td>{x.name}</td>
        <td>{x.shortName}</td>
        <td>
          <button
            style={{ margin: "10px 10px" }}
            type="button"
            className="btn btn-warning"
            onClick={this.onClickEditMeasure.bind(this, x)}
          >
            Редактировать
          </button>
          <button
            style={{ margin: "10px 10px" }}
            type="button"
            className="btn btn-danger"
            onClick={this.onClickDeleteMeasure.bind(this, x)}
          >
            Удалить
          </button>
        </td>
      </tr>
    ));

    let measureTable = (
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Название</th>
            <th scope="col">Короткое название</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>{measures}</tbody>
      </table>
    );

    return (
      <div>
        <div className="col-sm-2" style={{ margin: "20px 10px" }}>
          <button
            type="button"
            className="btn btn-success"
            onClick={this.onClickNewMeasure}
          >
            Добавит
          </button>
        </div>
        <div style={{ width: "100%", float: "left", margin: "15px 20px" }}>
          {measureTable}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    measures: state.measure.measures
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitMeasures: () => dispatch(measureActions.getAllMeasures())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Measures);

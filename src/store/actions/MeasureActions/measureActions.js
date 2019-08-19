import * as measureActionTypes from "./actionTypes";
import axios from "../../../axios-init";

const setAllMeasures = measures => {
  return {
    measures: measures,
    type: measureActionTypes.GET_ALL_MEASURES
  };
};

export const getAllMeasures = dispatch => {
  return dispatch => {
    axios
      .get("/measure/all")
      .then(response => {
        dispatch(setAllMeasures(response.data));
      })
      .catch(error => {
        alert(error);
      });
  };
};

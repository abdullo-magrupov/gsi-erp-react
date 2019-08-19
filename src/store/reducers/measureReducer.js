import * as measureActionTypes from "../actions/MeasureActions/actionTypes";

const initialState = {
  measures: []
};

const measureReducer = (state = initialState, action) => {
  switch (action.type) {
    case measureActionTypes.GET_ALL_MEASURES:
      return {
        ...state,
        measures: action.measures
      };
    default:
      return state;
  }
};

export default measureReducer;

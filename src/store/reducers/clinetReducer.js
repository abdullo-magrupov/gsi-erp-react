import * as clientActionTypes from "../actions/ClientActions/actionTypes";

const initialState = {
  clients: [],
  clientOrders: []
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case clientActionTypes.GET_ALL_CLIENTS:
      return {
        ...state,
        clients: action.clients
      };
    case clientActionTypes.GET_CLIENT_ORDERS:
      return { ...state, clientOrders: action.orders };
    default:
      return state;
  }
};

export default clientReducer;

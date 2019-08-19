import * as clientActionTypes from "./actionTypes";
import axios from "../../../axios-init";

const setAllClients = clients => {
  return {
    type: clientActionTypes.GET_ALL_CLIENTS,
    clients: clients
  };
};

const setClientOrders = orders => {
  return {
    type: clientActionTypes.GET_CLIENT_ORDERS,
    orders: orders
  };
};

export const getAllClients = () => {
  return dispatch => {
    axios
      .get("/client/all")
      .then(response => {
        dispatch(setAllClients(response.data));
      })
      .catch(error => {
        alert(error);
      });
  };
};

export const getClientOrders = clientId => {
  return dispatch => {
    axios
      .get("/order/client/" + clientId)
      .then(response => {
        dispatch(setClientOrders(response.data));
      })
      .catch(error => {
        alert(error);
      });
  };
};

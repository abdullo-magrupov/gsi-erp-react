import React, { Component } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Clients from "./containers/Clients/Clients";
import ClientOrders from "./containers/Clients/ClientOrders";
import Measures from "./containers/Measures/Measures";
import MeasureAdd from "./containers/Measures/MeasureAdd";
import MeasureEdit from "./containers/Measures/MeasureEdit";
import Products from "./containers/Products/Products";
import ProductAdd from "./containers/Products/ProductAdd";
import ProductEdit from "./containers/Products/ProductEdit";
import ClientAdd from "./containers/Clients/ClientAdd";
import ClientEdit from "./containers/Clients/ClientEdit";
import OrderClientAdd from "./containers/Orders/OrderClientAdd";
import OrderEdit from "./containers/Orders/OrderEdit";
import OrderView from "./containers/Orders/OrderView";
import PaymentTypes from "./containers/PaymentTypes/PaymentTypes";
import PaymentTypeAdd from "./containers/PaymentTypes/PaymentTypeAdd";
import PaymentTypeEdit from "./containers/PaymentTypes/PaymentTypeEdit";
import ClientActions from "./containers/Clients/ClientActions";
import ClientPaymentAdd from "./containers/ClientPayments/ClientPaymentAdd";
import ClientPaymentEdit from "./containers/ClientPayments/ClientPaymentEdit";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route exact path="/client/all" component={Clients} />
            <Route exact path="/client/add" component={ClientAdd} />
            <Route exact path="/client/edit/:clientId" component={ClientEdit} />
            <Route
              exact
              path="/client/orders/:clientId"
              component={ClientOrders}
            />
            <Route
              exact
              path="/client/actions/:clientId/:clientName"
              component={ClientActions}
            />
            <Route
              exact
              path="/client/order/add/:clientId/:clientName"
              component={OrderClientAdd}
            />
            <Route
              exact
              path="/order/edit/:orderId/:clientName"
              component={OrderEdit}
            />
            <Route exact path="/order/view/:orderId" component={OrderView} />
            <Route exact path="/measure/all" component={Measures} />
            <Route exact path="/measure/add" component={MeasureAdd} />
            <Route
              exact
              path="/measure/edit/:measureId"
              component={MeasureEdit}
            />
            <Route exact path="/product/all" component={Products} />
            <Route exact path="/product/add" component={ProductAdd} />
            <Route
              exact
              path="/product/edit/:productId"
              component={ProductEdit}
            />
            <Route exact path="/paymenttype/all" component={PaymentTypes} />
            <Route exact path="/paymenttype/add" component={PaymentTypeAdd} />
            <Route
              exact
              path="/paymenttype/edit/:paymentTypeId"
              component={PaymentTypeEdit}
            />
            <Route
              exact
              path="/clientpayment/add/:clientId/:clientName"
              component={ClientPaymentAdd}
            />
            <Route
              exact
              path="/clientpayment/edit/:clientPaymentId"
              component={ClientPaymentEdit}
            />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;

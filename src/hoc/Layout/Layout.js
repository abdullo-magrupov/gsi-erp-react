import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Layout extends Component {
  render() {
    return (
      <>
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/client/all" exact>
                    Клиенты
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/product/all" exact>
                    Продукты
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/measure/all" exact>
                    Измерения
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/paymenttype/all" exact>
                    Типы оплаты
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <main>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;

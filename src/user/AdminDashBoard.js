import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const {
    result: { name, email, lastname, purchases }
  } = isAutheticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div class="row">
        <div class="col">
          <div className="card">
            <h4 className="card-header bg-dark text-white">Admin Information</h4>
            <ul className="list-group">
              <li className="list-group-item d-flex align-items-center">
                Name
                <span className="badge badge-primary badge-pill ml-2">{name} {lastname}</span>
              </li>
              <li className="list-group-item d-flex align-items-center">
                Email
                <span className="badge badge-primary badge-pill ml-2">{email}</span>
              </li>
              <li className="list-group-item d-flex align-items-center">
                No. of items purchased
                <span className="badge badge-primary badge-pill ml-2">{purchases.length}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to admin area"
      description="Manage all of your products here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;

import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import {
  isAutheticated,
} from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory, getCategories } from './helper/adminapicall';

const AddCategory = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { result, token } = isAutheticated();

  useEffect(() => {
    getCategories({ result, token })
      .then((response) => {
        setData(response.categories);
      })
      .catch(error => {
        console.error(`some error occurred ${error}`);
      });
  }, [success]);

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = name => event => {
    setName(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    createCategory({ token, result, name })
      .then(response => {
        if (response.message) {
          setError(true);
          setSuccess(false);
        } else {
          setError(false);
          setSuccess(true);
          setName('');
        }
      })
      .catch(error => {
        console.error(`some error occurred ${error}`);
      });
  };
  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          onChange={handleChange("name")}
          value={name}
          type="text"
          className="form-control my-3"
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        {error && (
          <div className="alert alert-danger" role="alert">
            Something went wrong.
          </div>
        )}
        <button onClick={handleSubmit} className="btn btn-outline-info">Create Category</button>
      </div>
    </form>
  );

  const categories = () => (
    <>
      <h3 className="mb-4"> Categories </h3>
      <ul className="list-group">
        {
          data.map(item => {
            return <li key={item._id} className="list-group-item">{item.name}</li>
          })
        }
      </ul>
    </>
  );

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new tshirts"
      className="container bg-info p-4"
    >
      <div className="bg-white rounded p-3">
        <div className="row">
          <div className="col">
            {myCategoryForm()}
          </div>
          <div className="col">
            {categories()}
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            {goBack()}
          </div>

        </div>
      </div>


    </Base>
  );
};

export default AddCategory;

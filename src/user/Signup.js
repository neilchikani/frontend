import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from '../auth/helper/index';

const FormSuccess = () => {
  return (
    <div className="alert alert-success">
      A new account has been created successfully.
      <Link to="/signin"> Sign in </Link>
    </div>
  )
};

const SignUpForm = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
  });

  const handleChange = name => event => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value
    });
  };

  const handleSubmit = event => {
    const { name, email, password } = values;
    event.preventDefault();
    setValues({
      ...values,
      error: false,
    });
    signup({ name, email, password })
      .then(response => {
        if (response.message) {
          setValues({
            error: true,
            success: false
          });
        } else {
          setValues({
            name: "",
            email: "",
            password: "",
            error: false,
            success: true,
          });
        }
      })
      .catch(error => {
        console.error(`some error occurred ${error}`);
      });
  };
  const { name, email, password, success } = values;

  if (success) {
    return <FormSuccess />;
  };
  return (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <form>
          <div className="form-group">
            <label className="text-light">Name</label>
            <input value={name} onChange={handleChange("name")} className="form-control" type="text" />
          </div>
          <div className="form-group">
            <label className="text-light">Email</label>
            <input value={email} onChange={handleChange("email")} className="form-control" type="email" />
          </div>
          <div className="form-group">
            <label className="text-light">Password</label>
            <input value={password} onChange={handleChange("password")} className="form-control" type="password" />
          </div>
          {values.error && (
            <div className="alert alert-danger" role="alert">
              Something went wrong.
            </div>
          )}

          <button onClick={handleSubmit} className="btn btn-success btn-block">Submit</button>
        </form>
      </div>
    </div>
  );

}
const Signup = () => {

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      <SignUpForm />
    </Base>
  );
};

export default Signup;

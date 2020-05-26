import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAutheticated } from "../auth/helper";

const Signin = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
    error: false,
    success: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;


  const { result } = isAutheticated();

  const handleChange = name => event => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value
    });
  };

  const handleSubmit = event => {
    const { email, password } = values;
    event.preventDefault();
    setValues({
      ...values,
      error: false,
      success: false,
      loading: true,
    });
    signin({ email, password })
      .then(response => {
        if (response.message) {
          setValues({
            ...values,
            error: true,
            success: false,
            loading: false,
          });
        } else {
          authenticate(response, () => {
            setValues({
              email: "",
              password: "",
              error: false,
              success: true,
              loading: false,
              didRedirect: true,
            });
          });
        }
      })
      .catch(error => {
        console.error(`some error occurred ${error}`);
      });
  };

  const RedirectUser = () => {
    if (didRedirect) {
      if (result && result.role === 1) {
        return (
          <Redirect to="/admin/dashboard" />
        )
      } else {
        return (
          <Redirect to="/user/dashboard" />
        )
      }
    }
    if (isAutheticated()) {
      return (
        <Redirect to="/" />
      )
    }
    return null;
  };


  const SignInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input value={email} onChange={handleChange("email")} className="form-control" type="email" />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input value={password} onChange={handleChange("password")} className="form-control" type="password" />
            </div>
            <button onClick={handleSubmit} className="btn btn-primary" type="button" disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> + 'Loading...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="Sign In page" description="A page for user to sign in!">
      {SignInForm()}
      <RedirectUser />
    </Base>
  );
}

export default Signin;

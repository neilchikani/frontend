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
    <div className="container">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          {/* Nested Row within Card Body */}
          <div className="row">
            <div className="col-lg-5 d-none d-lg-block bg-register-image" />
            <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                </div>
                <form className="user">
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input type="text" className="form-control form-control-user" id="exampleFirstName" placeholder="First Name" />
                    </div>
                    <div className="col-sm-6">
                      <input type="text" className="form-control form-control-user" id="exampleLastName" placeholder="Last Name" />
                    </div>
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address" />
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                    </div>
                    <div className="col-sm-6">
                      <input type="password" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Repeat Password" />
                    </div>
                  </div>
                  <a href="login.html" className="btn btn-primary btn-user btn-block">
                    Register Account
                    </a>
                </form>
                <hr />
                {/* <div className="text-center">
                  <a className="small" href="forgot-password.html">Forgot Password?</a>
                </div> */}
                <div className="text-center">
                  <a className="small" href="login.html">Already have an account? Login!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="row">
    //   <div className="col-md-6 offset-sm-3 text-left">
    //     <form>
    //       <div className="form-group">
    //         <label className="text-light">Name</label>
    //         <input value={name} onChange={handleChange("name")} className="form-control" type="text" />
    //       </div>
    //       <div className="form-group">
    //         <label className="text-light">Email</label>
    //         <input value={email} onChange={handleChange("email")} className="form-control" type="email" />
    //       </div>
    //       <div className="form-group">
    //         <label className="text-light">Password</label>
    //         <input value={password} onChange={handleChange("password")} className="form-control" type="password" />
    //       </div>
    //       {values.error && (
    //         <div className="alert alert-danger" role="alert">
    //           Something went wrong.
    //         </div>
    //       )}

    //       <button onClick={handleSubmit} className="btn btn-success btn-block">Submit</button>
    //     </form>
    //   </div>
    // </div>
  );

}
const Signup = () => {

  return (
    // <Base title="Sign up page" description="A page for user to sign up!">
    <SignUpForm />
    // </Base>
  );
};

export default Signup;

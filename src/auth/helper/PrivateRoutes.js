import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";
import { isAutheticated } from './index';


export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAutheticated() ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}
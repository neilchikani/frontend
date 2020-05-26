import React, { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { createOrder, makeStripePayment } from "./helper/orderHelper";

const API = 'http://localhost:3000/api';

const StripeCheckout = ({
  products,
  setReload = f => f,
  reload = undefined
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: ""
  });

  const authToken = isAutheticated() && isAutheticated().token;
  const userId = isAutheticated() && isAutheticated().result._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = token => {
    const body = {
      token,
      products
    };
    makeStripePayment(body)
      .then(response => {
        console.log("response", response);
        const orderData = {
          products: products,
          transaction_id: response.id,
          amount: response.amount
        };
        createOrder(userId, authToken, orderData);
        cartEmpty(() => {
          console.log("Did we got a crash?");
        });
        setReload(!reload);
      })
      .catch(error => console.log(error));
  };

  const showStripeButton = () => {
    return (isAutheticated() && products.length > 0) ? (
      <StripeCheckoutButton
        stripeKey="pk_test_sGdWKMqTrFPrkqNyn2BSN8t800b40cXh36"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with stripe</button>
      </StripeCheckoutButton>
    ) : (
        <Link to="/signin">
          <button className="btn btn-warning">Please login or add something to cart</button>
        </Link>
      );
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;

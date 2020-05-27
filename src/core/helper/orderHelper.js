import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ order: orderData })
  })
    .then(reponse => {
      return reponse.json();
    })
    .catch(err => console.log(err));
};

export const makeStripePayment = (data) => {
  return fetch(`${API}/stripepayment`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
    .then(reponse => {
      return reponse.json();
    })
    .catch(err => console.log(err));
};

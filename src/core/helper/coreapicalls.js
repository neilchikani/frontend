// import { API } from "../../backend";
const API = 'http://localhost:3000/api';


export const getProducts = () => {
  return fetch(`${API}/products`, { method: "GET" })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

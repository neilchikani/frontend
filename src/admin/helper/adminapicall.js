const API = 'http://localhost:3000/api';

export const createCategory = data => {
  return fetch(`${API}/category/create/${data.result._id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${data.token}`,
    },
    body: JSON.stringify({ name: data.name })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const createProduct = (id, token, product) => {
  console.log(product.entries());
  return fetch(`${API}/product/create/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      'Authorization': `Bearer ${token}`,
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getAllProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getProduct = productID => {
  return fetch(`${API}/product/${productID}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const deleteProduct = data => {
  return fetch(`${API}/product/${data.productID}/${data.result._id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      'Authorization': `Bearer ${data.token}`,
    },
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateProduct = (data, product) => {
  return fetch(`${API}/product/${data.productID}/${data.result._id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      'Authorization': `Bearer ${data.token}`,
    },
    body: JSON.stringify(product)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './core/Home';
import SignUp from './user/Signup';
import SignIn from './user/Signin';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import PrivateRoute from './auth/helper/PrivateRoutes';
import AdminRoute from './auth/helper/AdminRoutes';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import ManageCategories from './admin/ManageCategories';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Cart from './core/Cart';
import App from './App';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard">
          <UserDashBoard />
        </PrivateRoute>
        <AdminRoute path="/admin/dashboard">
          <AdminDashBoard />
        </AdminRoute>
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute
          path="/admin/categories"
          exact
          component={ManageCategories}
        />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />

        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <Route path="/signin" component={SignIn} />
        <Route path="/test" component={App} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

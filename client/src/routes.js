import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import Layout from "./hoc/layout";
import RegisterLogin from "./components/Auth/login";
import Register from "./components/Auth/register";
import UserDashboard from "./components/User";
import Product from "./components/Product";
import SearchResults from "./components/Product/search";
import Auth from "./hoc/auth";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/User/cart";
import cartDetail from "./components/User/cartDetail";
import ResetPass from "./components/Reset_client/reset_pass";
import ResetUser from "./components/Reset_client";
import ContactUs from "./components/ContactUs/contact";
import UpdateInfo from "./components/User/updateInfo";
import Not_found from "./components/PageNot/not_found";
import updatePassword from "./components/User/updatePassword"

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route
                    path="/user/dashboard"
                    exact
                    component={Auth(UserDashboard, true)}
                />
                <Route
                    path="/register_login"
                    exact
                    component={Auth(RegisterLogin, false)}
                />
                <Route
                    path="/product_detail/:id"
                    exact
                    component={Auth(ProductDetail, null)}
                />
                <Route
                    path="/user/updateProfile"
                    exact
                    component={Auth(UpdateInfo, true)}
                />
                <Route
                    path="/user/updatePassword"
                    exact
                    component={Auth(updatePassword, true)}
                />
                <Route path="/orderDetail" exact component={Auth(cartDetail, true)}/>
                <Route path="/cart" exact component={Auth(Cart, true)}/>
                <Route path="/register" exact component={Auth(Register, false)}/>
                <Route path="/shop" exact component={Auth(Product, null)}/>
                <Route path="/search" exact component={Auth(SearchResults, null)}/>
                <Route
                    path="/reset_password/:token"
                    exact
                    component={Auth(ResetPass, false)}
                />
                <Route path="/reset_user" exact component={Auth(ResetUser, false)}/>
                <Route path="/" exact component={Auth(Home, null)}/>
                <Route path="/contact" exact component={Auth(ContactUs, null)}/>
                <Route component={Auth(Not_found)}/>
            </Switch>
        </Layout>
    );
};

export default Routes;

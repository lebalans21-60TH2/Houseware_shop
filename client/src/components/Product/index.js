import React, { Component } from "react";
import { connect } from "react-redux";
import { newProduct } from "../../actions/products";
import { addToCart, getCart } from "../../actions/user_actions";
import Container from "./container";
import { message } from "antd";

class Product extends Component {
  componentDidMount() {
    let cartItems = [];
    let user = this.props.user;
    this.props.dispatch(newProduct());
    if (user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        });
        this.props.dispatch(getCart(cartItems, user.userData.cart));
      }
    }
  }
  addToCart0 = id => {
    const { user } = this.props;
    if (user.userData.isAuth) {
      this.props.dispatch(addToCart(id));
      message.success("The Item Added To Cart!");
    } else {
      message.error("You Must Be Login");
    }
  };
  addToCart = id => {
    const { user } = this.props;
    if (user.cartDetail) {
      user.cartDetail.forEach(item => {
        if (item._id === id) {
          if (item.quantityCart < item.quantity) {
            this.addToCart0(id);
          } else {
            message.success("Quantity isn't enough!");
          }
        }
      });
      if (
        user.cartDetail
          .map(item => {
            return item._id;
          })
          .indexOf(id) === -1
      ) {
        this.addToCart0(id);
      }
    } else {
      this.addToCart0(id);
    }
  };
  render() {
    return (
      <div>
        <div className="breadcrumbs">
          <div className="container">
            <ol
              className="breadcrumb breadcrumb1 animated wow slideInLeft"
              data-wow-delay=".5s"
            >
              <li>
                <a href="index.html">
                  <span
                    className="glyphicon glyphicon-home"
                    aria-hidden="true"
                  />
                  Trang chủ
                </a>
              </li>
              <li className="active">Sản phẩm</li>
            </ol>
          </div>
        </div>
        <div className="products">
          <Container addToCart={this.addToCart} addToCart0={this.addToCart0} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    products: state.products
  };
};
export default connect(mapStateToProps)(Product);

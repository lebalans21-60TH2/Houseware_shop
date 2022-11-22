import React, { Component } from "react";
import NumberFormat from "react-number-format";
import ProdImg from "./prodImg";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTruck from "@fortawesome/fontawesome-free-solid/faTruck";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";
import { connect } from "react-redux";
import { addToCart } from "../../actions/user_actions";
import { getProductDetail, clearProductDetail } from "../../actions/products";
import RelatedProducts from "./relatedProducts";
import { message, Spin } from "antd";
import { FacebookProvider, Comments, Like } from "react-facebook";
import "../../newCss/css/styles1.css";
class ProductPage extends Component {
  state = {
    quantity: 1
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.dispatch(getProductDetail(id)).then(() => {
      if (!this.props.products.productDetail) {
        this.props.history.push("/");
      }
    });
  }
  //componentWillUnmount call when a component remove out a DOM
  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }
  onChange = e => {
    this.setState({ quantity: parseInt(e.target.value, 10) });
  };
  addToCart0 = id => {
    const { user } = this.props;
    if (user.userData.isAuth) {
      this.props.dispatch(addToCart(id, this.state));
      message.success("The Item Added To Cart!");
    } else {
      message.error("You Must Be Login");
    }
  };
  addToCartHandler = id => {
    const { user } = this.props;
    const { quantity } = this.state;

    if (user.cartDetail) {
      user.cartDetail.forEach(item => {
        if (item._id === id) {
          if (
            item.quantityCart < item.quantity &&
            quantity + item.quantityCart <= item.quantity
          ) {
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
    const { productDetail } = this.props.products;
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
                  Home
                </a>
              </li>
              <li className="active">Product Detail</li>
            </ol>
          </div>
        </div>
        <div className="container">
          {productDetail ? (
            <div className="col-md-12 single-right">
              <div
                className="col-md-5 single-right-left animated wow slideInUp"
                data-wow-delay=".5s"
              >
                <div className="product_detail_wrapper">
                  <div>
                    <ProdImg detail={productDetail} />
                  </div>
                </div>
              </div>
              <div
                className="col-md-7 single-right-left simpleCart_shelfItem animated wow slideInRight"
                data-wow-delay=".5s"
              >
                <h3>{productDetail ? productDetail.name : ""}</h3>
                <h4>
                  <span className="item_price">
                    {productDetail ? (
                      <NumberFormat
                        value={productDetail.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    ) : (
                      ""
                    )}
                  </span>
                </h4>
                <div className="rating2">
                  <span className="starRating">
                    <label>1</label>
                    <label>1</label>
                    <label>1</label>
                    <label>1</label>
                    <label>1</label>
                  </span>
                </div>
                <div className="description">
                  <h5>
                    <i>Description</i>
                  </h5>
                  <p>{productDetail ? productDetail.description : ""}</p>
                </div>
                <div className="color-quality">
                  <div className="color-quality-left">
                    <h5>Quality :</h5>
                    <select
                      id="country1"
                      onChange={this.onChange}
                      className="frm-field required sect"
                    >
                      <option value={1}>1 </option>
                      <option value={2}>2 </option>
                      <option value={3}>3 </option>
                      <option value={4}>4 </option>
                    </select>
                  </div>
                  <div className="clearfix"> </div>
                </div>
                <div className="occasional">
                  <div className="product_tags">
                    {productDetail.shipping ? (
                      <div className="tag">
                        <div>
                          <FontAwesomeIcon icon={faTruck} />
                        </div>
                        <div className="tag_text">
                          <div>Free shipping</div>
                          <div>And return</div>
                        </div>
                      </div>
                    ) : null}
                    {productDetail.available ? (
                      <div className="tag">
                        <div>
                          <FontAwesomeIcon icon={faCheck} />
                        </div>

                        <div className="tag_text">
                          <div>Available</div>
                          <div>in store</div>
                        </div>
                      </div>
                    ) : (
                      <div className="tag">
                        <div>
                          <FontAwesomeIcon icon={faTimes} />
                        </div>
                        <div className="tag_text">
                          <div>Not Available</div>
                          <div>Preorder only</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="clearfix"> </div>
                </div>
                <div className="occasion-cart">
                  <a
                    className="item_add"
                    onClick={() => {
                      this.addToCartHandler(
                        productDetail ? productDetail._id : ""
                      );
                    }}
                  >
                    add to cart{" "}
                  </a>
                </div>
                <div className="social">
                  <div className="social-left">
                    <p>Share On :</p>
                  </div>
                  <div className="social-right">
                    <ul className="social-icons">
                      <li>
                        <a className="facebook" />
                      </li>
                      <li>
                        <a className="twitter" />
                      </li>
                      <li>
                        <a className="g" />
                      </li>
                      <li>
                        <a className="instagram" />
                      </li>
                    </ul>
                  </div>
                  <div className="clearfix"> </div>
                </div>
              </div>
              <div className="clearfix"> </div>
              <div
                className="bootstrap-tab animated wow slideInUp"
                data-wow-delay=".5s"
              >
                <div
                  className="bs-example bs-example-tabs"
                  role="tabpanel"
                  data-example-id="togglable-tabs"
                >
                  <ul id="myTab" className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="active">
                      <a
                        href="#home"
                        id="home-tab"
                        role="tab"
                        data-toggle="tab"
                        aria-controls="home"
                        aria-expanded="true"
                      >
                        Description
                      </a>
                    </li>
                    <li role="presentation">
                      <a
                        href="#profile"
                        role="tab"
                        id="profile-tab"
                        data-toggle="tab"
                        aria-controls="profile"
                      >
                        Reviews(2)
                      </a>
                    </li>
                  </ul>
                  <div id="myTabContent" className="tab-content">
                    <div
                      role="tabpanel"
                      className="tab-pane fade in active bootstrap-tab-text"
                      id="home"
                      aria-labelledby="home-tab"
                    >
                      <h5>Product Brief Description</h5>
                      <p>{productDetail ? productDetail.description : ""}</p>
                    </div>
                    <div
                      role="tabpanel"
                      className="tab-pane fade bootstrap-tab-text"
                      id="profile"
                      aria-labelledby="profile-tab"
                    >
                      <FacebookProvider appId="338076013441810">
                        <Like
                          href="http://www.facebook.com"
                          colorScheme="dark"
                          showFaces
                          share
                        />
                      </FacebookProvider>
                      <FacebookProvider appId="338076013441810">
                        <Comments href="http://www.facebook.com" />
                      </FacebookProvider>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clearfix"> </div>
              {/* <RelatedProducts /> */}
            </div>
          ) : (
            <center>
              <Spin />
            </center>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user
  };
};

export default connect(mapStateToProps)(ProductPage);

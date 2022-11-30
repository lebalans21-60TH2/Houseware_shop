import React, { Component } from "react";
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
import currency from "currency-formatter";
import "../../newCss/css/styles1.css";
class ProductPage extends Component {
  state = {
    quantity: 1,
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
  onChange = (e) => {
    this.setState({ quantity: parseInt(e.target.value, 10) });
  };

  addToCart0 = (id) => {
    const { user } = this.props;
    if (user.userData.isAuth) {
      this.props.dispatch(addToCart(id, this.state));
      message.success("Sản phẩm đã thêm vào giỏ hàng!");
    } else {
      message.error("Bạn phải đăng nhập trước!");
    }
  };
  addToCartHandler = (id) => {
    const { user } = this.props;
    const { quantity } = this.state;
    console.log(this.state.quantity);

    if (user.cartDetail) {
      user.cartDetail.forEach((item) => {
        if (item._id === id) {
          if (
            item.quantityCart < item.quantity &&
            quantity + item.quantityCart <= item.quantity
          ) {
            this.addToCart0(id);
          } else {
            message.success("Số lượng sản phẩm không đủ!");
          }
        }
      });
      if (
        user.cartDetail
          .map((item) => {
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
                  Trang chủ
                </a>
              </li>
              <li className="active">Chi tiết sản phẩm</li>
            </ol>
          </div>
        </div>
        <div className="container" style={{ marginTop: "1.5vmax" }}>
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
                <h3 style={{ fontWeight: "bold" }}>
                  {productDetail ? productDetail.name : ""}
                </h3>
                <h4>
                  <span className="item_price">
                    {productDetail ? (
                      <span
                        style={{ fontWeight: "550", fontSize: "1.3em" }}
                      >{`${currency.format(productDetail.price, {
                        code: "VND",
                      })}`}</span>
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
                {/* <div className="description">
                  <h5>
                    <i>Mô tả:</i>
                  </h5>
                  <p>{productDetail ? productDetail.description : ""}</p>
                </div> */}
                <div className="color-quality">
                  <div className="color-quality-left">
                    <h5 style={{ fontWeight: "bold" }}>Số lượng :</h5>
                    {/* <select
                      id="country1"
                      onChange={this.onChange}
                      className="frm-field required sect"
                    >
                      <option value={1}>1 </option>
                      <option value={2}>2 </option>
                      <option value={3}>3 </option>
                      <option value={4}>4 </option>
                      <option value={5}>5 </option>
                    </select> */}

                    <div className="quantity">
                      <div className="quantity-select">
                        <div
                          className="entry value-minus"
                          style={
                            this.state.quantity === 1
                              ? { pointerEvents: "none", opacity: 0.4 }
                              : null
                          }
                          onClick={() =>
                            this.setState({ quantity: this.state.quantity - 1 })
                          }
                        >
                          &nbsp;
                        </div>
                        <div className="entry value">
                          <span>{this.state.quantity}</span>
                        </div>
                        <div
                          className="entry value-plus active"
                          style={
                            this.state.quantity >= this.state.quantity
                              ? { opacity: 0.4 }
                              : null
                          }
                          onClick={() =>
                            this.setState({ quantity: this.state.quantity + 1 })
                          }
                        >
                          &nbsp;
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix"> </div>
                </div>
               <div className="occasional">
               <div>
                    <h5 style={{ fontWeight: "bold" }}>Số lượng còn: {productDetail ? productDetail.quantity : ""} </h5>

                    </div>
                  <div className="product_tags">
                    <h5 style={{ fontWeight: "bold" }}>Giao hàng:</h5>
                    {productDetail.shipping ? (
                      <div className="tag">
                        <div>
                          <FontAwesomeIcon icon={faTruck} />
                        </div>
                        <div className="tag_text">
                          <div>Miễn phí giao hàng</div>
                          {/* <div>And return</div> */}
                        </div>
                      </div>
                    ) : null}{" "}
                    <h5 style={{ fontWeight: "bold", marginTop: "9px" }}>
                      Trạng thái:
                    </h5>
                    {productDetail.available ? (
                      <div className="tag">
                        <div>
                          <FontAwesomeIcon icon={faCheck} />
                        </div>

                        <div className="tag_text">
                          <div>Còn hàng</div>
                          {/* <div>in store</div> */}
                        </div>
                      </div>
                    ) : (
                      <div className="tag">
                        <div>
                          <FontAwesomeIcon icon={faTimes} />
                        </div>
                        <div className="tag_text">
                          <div>Hết hàng</div>
                          {/* <div>Preorder only</div> */}
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
                    Thêm vào giỏ{" "}
                  </a>
                </div>
                <div className="social">
                  <div className="social-left">
                    <p>Chia sẻ:</p>
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
                        Mô tả
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
                        Đánh giá
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
                      <h5>Mô tả tóm tắt:</h5>
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

const mapStateToProps = (state) => {
  return {
    products: state.products,
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProductPage);

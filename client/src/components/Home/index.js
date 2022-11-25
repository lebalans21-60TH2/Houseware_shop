import React, { Component } from "react";
import Slider from "./slider";
import Promotion from "./promotion";
import BestSelling from "./bestSelling";
import { productsByArrival, productsBySell } from "../../actions/products";
import { addToCart, getCart } from "../../actions/user_actions";
import { connect } from "react-redux";
import { message } from "antd";
import ByArrival from "./byArrival";
const promotion = {
  img: "/images/cac-loai-do-gia.jpg",
  lineOne: "Khuyến mãi khủng lên tới 45%",
  lineTwo: "Cho các bộ sưu tập",
  linkTo: "/shop",
  title: "Shop Now"
};
class Home extends Component {
  componentDidMount() {
    let cartItems = [];
    let user = this.props.user;

    this.props.productsBySell();
    this.props.productsByArrival();
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
      message.success("Mặt hàng được thêm vào giỏ hàng!");
    } else {
      message.error("Bạn cần phải đăng nhập trước!");
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
            message.success("Số lượng không đủ!");
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
  renderPromotion = () =>
    promotion ? (
      <div
        className="home_promotion_img"
        style={{
          background: `url(${promotion.img})`
        }}
      >
        <div className="tag title">{promotion.lineOne}</div>
        <div className="tag low_title">{promotion.lineTwo}</div>
      </div>
    ) : null;

  render() {
    const { productsBySell, productsByArrival } = this.props.products;
    return (
      <div>
        <Slider />
        {/* <div className="banner-bottom">
          <div className="container">
            <div className="banner-bottom-grids">
              <div
                className="banner-bottom-grid-left animated wow slideInLeft"
                data-wow-delay=".5s"
              >
                <div className="grid">
                  <figure className="effect-julia">
                    <img
                      src="images/giadungsato(2).jpg"
                      alt=" "
                      className="img-responsive"
                    />
                    <figcaption>
                      <h3>
                        Best <span>Store</span>
                      
                      </h3>
                      <div>
                        <p>Đồ gia dụng chất lượng cao,</p>
                        <p>Chính sách khuyến mãi lớn</p>
                        <p>Bảo hành trọn đời</p>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div
                className="banner-bottom-grid-left1 animated wow slideInUp"
                data-wow-delay=".5s"
              >
                <div className="banner-bottom-grid-left-grid left1-grid grid-left-grid1">
                  <div className="banner-bottom-grid-left-grid1">
                    <img
                      src="images/cac-loai-do-gia.jpg"
                      alt=" "
                      className="img-responsive"
                    />
                  </div>
                  <div className="banner-bottom-grid-left1-pos">
                  <div className="banner-bottom-grid-left1-pos1">
                      <p>Khuyến mãi lên tới 45%</p>
                    </div>
                  </div>
                </div>
                <div className="banner-bottom-grid-left-grid left1-grid grid-left-grid1">
                  <div className="banner-bottom-grid-left-grid1">
                    <img
                      src="images/4-mon-do-gia-dung-matika.jpg"
                      alt=" "
                      className="img-responsive"
                    />
                  </div>
                  <div className="banner-bottom-grid-left1-position">
                    <div className="banner-bottom-grid-left1-pos1">
                      <p>Bộ sưu tập mới nhất</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="banner-bottom-grid-right animated wow slideInRight"
                data-wow-delay=".5s"
              >
                <div className="banner-bottom-grid-left-grid grid-left-grid1">
                  <div className="banner-bottom-grid-left-grid1">
                    <img
                      src="images/kinh-doanh-hang-gia-dung.webp"
                      alt=" "
                      className="img-responsive"
                    />
                  </div>
                  <div className="grid-left-grid1-pos">
                  <div className="banner-bottom-grid-left1-pos1">
                      <p>Top sản phẩm bán chạy năm 2022</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clearfix"> </div>
            </div>
          </div>
        </div> */}
        <BestSelling
          bySell={productsBySell}
          addToCart0={this.addToCart0}
          addToCart={this.addToCart}
        />
        <div className="home_promotion">{this.renderPromotion()}</div>
        <ByArrival
          byArrival={productsByArrival}
          addToCart0={this.addToCart0}
          addToCart={this.addToCart}
        />
        {/* <Promotion /> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    products: state.products
  };
};
export default connect(
  mapStateToProps,
  { productsBySell, productsByArrival}
)(Home);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { Link } from "react-router-dom";
import currency from "currency-formatter";
class Content extends Component {
  showContent = () =>
    this.props.products.allProducts
      ? this.props.products.allProducts.map((item, i) => (
          <div className="col-md-4 products-right-grids-bottom-grid"  style={{border:"1px solid #535", borderRadius:"10px", padding:"3px"}} key={i}>
            <div
              className="new-collections-grid1 products-right-grid1 animated wow slideInUp"
              data-wow-delay=".5s"
              
            >
              <div className="new-collections-grid1-image">
                <a href="single.html" className="product-image">
                  <img
                    src={
                      item.images.length > 0
                        ? item.images[0].url
                        : "images/change7.jpg"
                    }
                    alt=" "
                    width={180}
                    height={180}
                  />
                </a>
                <div className="new-collections-grid1-image-pos products-right-grids-pos">
                  <Link to={`/product_detail/${item._id}`}>Xem chi tiết</Link>
                </div>
                <div className="new-collections-grid1-right products-right-grids-pos-right">
                  <div className="rating">
                    <div className="rating-left">
                      <img
                        src="images/2.png"
                        alt=" "
                        className="img-responsive"
                      />
                    </div>
                    <div className="rating-left">
                      <img
                        src="images/2.png"
                        alt=" "
                        className="img-responsive"
                      />
                    </div>
                    <div className="rating-left">
                      <img
                        src="images/2.png"
                        alt=" "
                        className="img-responsive"
                      />
                    </div>
                    <div className="rating-left">
                      <img
                        src="images/2.png"
                        alt=" "
                        className="img-responsive"
                      />
                    </div>
                    <div className="rating-left">
                      <img
                        src="images/1.png"
                        alt=" "
                        className="img-responsive"
                      />
                    </div>
                    <div className="clearfix"> </div>
                  </div>
                </div>
              </div>
              <h4>
                <a href="single.html">
                  {" "}
                  {item.name.length >= 20
                    ? `${item.name.slice(0, 20)}...`
                    : item.name}
                </a>
              </h4>
              {/* <p>{item.description.slice(0, 75)}...</p> */}
              <div className="simpleCart_shelfItem products-right-grid1-add-cart">
                <p>
                  <span className="item_price" style={{color:"red"}}>{`${currency.format(item.price, {code:"VND"})}`}</span>
                  <a
                    className="item_add"
                    onClick={() => this.props.addToCart(item._id)}
                  >
                    Thêm vào giỏ{" "}
                  </a>
                </p>
              </div>
            </div>
          </div>
        ))
      : null;
  loadMoreProducts = () => {
    this.props.loadMoreProducts();
  };
  render() {
    const { products, limit } = this.props;

    return (
      <div>
        <div className="products-right-grids-bottom">
          {products.allProducts ? (
            products.allProducts.length === 0 ? (
              <h1 style={{ textAlign: "center", color: "#ffc229" }}>
                Không tìm thấy sản phẩm
              </h1>
            ) : null
          ) : null}
          {this.showContent()}

          <div className="clearfix" />
        </div>
        {products.size > 0 && products.size >= limit ? (
          <nav
            className="numbering animated wow slideInRight"
            data-wow-delay=".5s"
          >
            <Button type="primary" onClick={this.props.loadMoreProducts}>
              Load More
            </Button>
          </nav>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    products: state.products
  };
};
export default connect(mapStateToProps)(Content);

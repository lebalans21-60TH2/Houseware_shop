import React, { Component } from "react";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import currency from "currency-formatter";
class BestSelling extends Component {
  render() {
    const { bySell } = this.props;
    const productsBySell = bySell
      ? bySell.map((item, i) => (
          <div className="col-md-3 new-collections-grid" style={{border:"1px solid #535", borderRadius:"10px", padding:"2px"}} key={i}>
            <div
              className="new-collections-grid1 animated wow slideInUp"
              
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
                    width={250}
                    height={180}
                    // className="img-responsive"
                  />
                </a>
                <div className="new-collections-grid1-image-pos">
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
                    style={{textAlign:"center"}}
                  >
                    Thêm vào giỏ{" "}
                  </a>
                </p>
              </div>
            </div>
          </div>
        ))
      : null;
    return (
      <div className="new-collections">
        <div className="container">
          <h3 className="animated wow zoomIn">Sản phẩm nổi bật</h3>
          <div className="new-collections-grids">
            {productsBySell ? (
                productsBySell
            ) : (
              <center>
                <Spin size="large" />
              </center>
            )}
            <div className="clearfix"> </div>
          </div>
        </div>
      </div>
    );
  }
}
export default BestSelling;

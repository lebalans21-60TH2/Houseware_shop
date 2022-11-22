import React, { Component } from "react";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
class BestSelling extends Component {
  render() {
    const { bySell } = this.props;
    const productsBySell = bySell
      ? bySell.map((item, i) => (
          <div className="col-md-3 new-collections-grid" key={i}>
            <div
              className="new-collections-grid1 animated wow slideInUp"
              style={{ marginTop: "20px" }}
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
                  <Link to={`/product_detail/${item._id}`}>Quick View</Link>
                </div>
                <div className="new-collections-grid1-right">
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
                  <p>
                    {item.name.length >= 30
                      ? `${item.name.slice(0, 28)}...`
                      : item.name}
                  </p>
                </a>
              </h4>
              <p>{item.description.slice(0, 100)}...</p>
              <div className="new-collections-grid1-left simpleCart_shelfItem">
                <p>
                  <span className="item_price">
                    {" "}
                    <NumberFormat
                      value={item.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </span>
                  <a
                    className="item_add"
                    onClick={() => this.props.addToCart(item._id)}
                  >
                    Add To Cart{" "}
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
          <h3 className="animated wow zoomIn">Best Selling Motor</h3>
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

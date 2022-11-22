import React, { Component } from "react";
import { Link } from "react-router-dom";
class NewProducts extends Component {
  render() {
    const { products } = this.props;
    const newProducts = products.newProducts
      ? products.newProducts.map((item, i) => (
          <div className="new-products-grid" key={i}>
            <div className="new-products-grid-left">
              <Link to={`/product_detail/${item._id}`}>
                <img
                  src={
                    item.images.length > 0
                      ? item.images[0].url
                      : "images/change7.jpg"
                  }
                  alt=" "
                  width={120}
                  height={140}
                />
              </Link>
            </div>
            <div className="new-products-grid-right">
              <h4>
                <a href="single.html">{item.name}</a>
              </h4>
              <div className="rating">
                <div className="rating-left">
                  <img src="images/2.png" alt=" " className="img-responsive" />
                </div>
                <div className="rating-left">
                  <img src="images/2.png" alt=" " className="img-responsive" />
                </div>
                <div className="rating-left">
                  <img src="images/2.png" alt=" " className="img-responsive" />
                </div>
                <div className="rating-left">
                  <img src="images/2.png" alt=" " className="img-responsive" />
                </div>
                <div className="rating-left">
                  <img src="images/2.png" alt=" " className="img-responsive" />
                </div>
                <div className="clearfix"> </div>
              </div>
              <div className="simpleCart_shelfItem new-products-grid-right-add-cart">
                <p>
                  {" "}
                  <span className="item_price">${item.price}</span>
                  <a
                    className="item_add"
                    onClick={() => this.props.addToCart(item._id)}
                  >
                    Add To Cart{" "}
                  </a>
                </p>
              </div>
            </div>
            <div className="clearfix"> </div>
          </div>
        ))
      : null;
    return <div>{newProducts}</div>;
  }
}

export default NewProducts;

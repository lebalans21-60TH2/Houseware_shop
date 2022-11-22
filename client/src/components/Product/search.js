import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { addToCart } from "../../actions/user_actions";
import { message } from "antd";
class SearchResults extends Component {
  addToCart = id => {
    if (this.props.user.userData.isAuth) {
      this.props.dispatch(addToCart(id));
      message.success("The Item Added To Cart!");
    } else {
      message.error("You Must Be Login");
    }
  };
  showProducts = () => {
    const { products } = this.props;
    if (products.resultsProduct) {
      if (products.resultsProduct.success) {
        let resultProduct = products.resultsProduct.product.map((item, i) => (
          <div className="col-md-3 new-collections-grid" key={i}>
            <div className="new-collections-grid1 animated wow slideInUp">
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
                <div className="new-collections-grid1-image-pos">
                  <Link to={`/product_detail/$${item._id}`}>Quick View</Link>
                </div>
                <div class="new-collections-grid1-right">
                  <div class="rating">
                    <div class="rating-left">
                      <img src="images/2.png" alt=" " class="img-responsive" />
                    </div>
                    <div class="rating-left">
                      <img src="images/2.png" alt=" " class="img-responsive" />
                    </div>
                    <div class="rating-left">
                      <img src="images/2.png" alt=" " class="img-responsive" />
                    </div>
                    <div class="rating-left">
                      <img src="images/2.png" alt=" " class="img-responsive" />
                    </div>
                    <div class="rating-left">
                      <img src="images/1.png" alt=" " class="img-responsive" />
                    </div>
                    <div class="clearfix"> </div>
                  </div>
                </div>
              </div>
              <a href="single.html">
                {" "}
                {item.name.length >= 20
                  ? `${item.name.slice(0, 20)}...`
                  : item.name}
              </a>
              <p>{item.description.slice(0, 85)}...</p>
              <div className="new-collections-grid1-left simpleCart_shelfItem">
                <p>
                  <span className="item_price">${item.price}</span>
                  <a
                    className="item_add"
                    onClick={() => this.addToCart(item._id)}
                  >
                    Add To Cart{" "}
                  </a>
                </p>
              </div>
            </div>
          </div>
        ));
        return resultProduct;
      } else {
        return <div>No Product To Found</div>;
      }
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
                <Link to="">
                  <span
                    className="glyphicon glyphicon-home"
                    aria-hidden="true"
                  />
                  Home
                </Link>
              </li>
              <li className="active">Search</li>
            </ol>
          </div>
        </div>
        <div className="new-collections">
          <div className="container">
            <h3 className="animated wow zoomIn">Search Results</h3>
            <div className="new-collections-grids">
              {this.showProducts() ? (
                this.showProducts()
              ) : (
                <center>
                  <Spin size="large" />
                </center>
              )}
              <div className="clearfix"> </div>
            </div>
          </div>
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
export default connect(mapStateToProps)(SearchResults);

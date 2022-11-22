import React, { Component } from "react";
import moment from "moment";
import NumberFormat from "react-number-format";
import { Link, withRouter } from "react-router-dom";
import { message, Icon } from "antd";
import { connect } from "react-redux";
import { deleteOrder } from "../../actions/user_actions";
export class cartDetail extends Component {
  state = {
    user: {},
    cartDetail: [],
    amount: 0,
    method: "",
    username: "",
    id: ""
  };
  componentDidMount() {
    if (localStorage && localStorage.getItem("orderDetail")) {
      var orderDetail = JSON.parse(localStorage.getItem("orderDetail"));
      this.setState({
        user: orderDetail.user,
        cartDetail: orderDetail.cartDetail,
        amount: orderDetail.total,
        method: orderDetail.method,
        username: orderDetail.username,
        id: orderDetail.id
      });
    }
  }
  deletePayment = () => {
    this.props.dispatch(deleteOrder(this.state.id)).then(res => {
      if (res.payload.success) {
        setTimeout(() => {
          message.success("Order has been canceled!");
          this.props.history.push("");
        }, 300);
      }
    });
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
                  Home
                </a>
              </li>
              <li className="active">Order Detail</li>
            </ol>
          </div>
        </div>
        <br />

        <div className="row">
          <div className="well col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6">
                <address>
                  <strong style={{ fontWeight: "bold" }}>Customer Name:</strong>{" "}
                  {this.state.username}
                  <br />
                  {this.state.method === "Payment By Paypal" ? (
                    <>
                      {" "}
                      <strong style={{ fontWeight: "bold" }}>
                        Address:
                      </strong>{" "}
                      {this.state.user
                        ? `${this.state.user.address.line1} ${
                            this.state.user.address.city
                          } ${this.state.user.address.country_code}`
                        : ""}
                      <br />
                    </>
                  ) : (
                    <>
                      {" "}
                      <strong style={{ fontWeight: "bold" }}>
                        Address:
                      </strong>{" "}
                      {this.state.user ? this.state.user.Address : ""}
                      <br />
                    </>
                  )}
                  <abbr title="Phone" style={{ fontWeight: "bold" }}>
                    Phone:
                  </abbr>{" "}
                  {this.state.user ? this.state.user.Phone : ""}
                  <br />
                  <abbr title="Phone" style={{ fontWeight: "bold" }}>
                    Payment Method:
                  </abbr>{" "}
                  {this.state.method}
                </address>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 text-right">
                <p>
                  <em style={{ fontWeight: "bold" }}>Date: </em>
                  {moment(new Date(Date.now())).format("LL")}
                </p>
                <p>
                  <em style={{ fontWeight: "bold" }}>Receipt #: </em>
                  {this.state.user ? this.state.user.paymentID : ""}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="text-center">
                <h1>Receipt</h1>
              </div>

              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>
                      <strong>Product</strong>
                    </th>
                    <th>
                      <strong>Quantity</strong>
                    </th>
                    <th className="text-center">
                      <strong>Price</strong>
                    </th>
                    <th className="text-center">
                      <strong>Total</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.cartDetail
                    ? this.state.cartDetail.map((item, i) => (
                        <tr key={i}>
                          <td className="col-md-9">
                            <em>{item.name}</em>
                          </td>
                          <td
                            className="col-md-1"
                            style={{ textAlign: "center" }}
                          >
                            {" "}
                            {item.quantityCart}{" "}
                          </td>
                          <td className="col-md-1 text-center">
                            <NumberFormat
                              value={item.price}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          </td>
                          <td className="col-md-1 text-center">
                            {" "}
                            <NumberFormat
                              value={parseInt(item.price * item.quantityCart, 10)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          </td>
                        </tr>
                      ))
                    : ""}
                  <tr>
                    <td>   </td>
                    <td>   </td>
                    <td className="text-right">
                      <h4>
                        <strong>Total: </strong>
                      </h4>
                    </td>
                    <td className="text-center text-danger">
                      <h4>
                        <strong>
                          <NumberFormat
                            value={this.state.amount}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </strong>
                      </h4>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Link to="" style={{ width: "50%" }}>
                <button
                  type="button"
                  className="btn btn-success btn-lg btn-block"
                  style={{ background: "#ffc229", width: "100%" }}
                >
                  <Icon type="left" /> Continue Shopping
                </button>
              </Link>
              {/* <div style={{ display: "flex" }}>
                <button
                  type="button"
                  className="btn btn-success btn-lg btn-block"
                  style={{ background: "#ff3333", width: "50%" }}
                  onClick={this.deletePayment}
                >
                  Cancel
                </button>
               
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(withRouter(cartDetail));

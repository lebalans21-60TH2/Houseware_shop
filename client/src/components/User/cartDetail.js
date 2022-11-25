import React, { Component } from "react";
import moment from "moment";
import NumberFormat from "react-number-format";
import { Link, withRouter } from "react-router-dom";
import { message, Icon } from "antd";
import { connect } from "react-redux";
import { deleteOrder } from "../../actions/user_actions";
import currency from "currency-formatter";
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
                  Trang chủ
                </a>
              </li>
              <li className="active">Thông tin đơn hàng</li>
            </ol>
          </div>
        </div>
        <br />

        <div className="row">
          <div className="well col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6">
                <address>
                  <strong style={{ fontWeight: "bold" }}>Tên khách hàng:</strong>{" "}
                  {this.state.username}
                  <br />
                  {this.state.method === "Payment By Paypal" ? (
                    <>
                      {" "}
                      <strong style={{ fontWeight: "bold" }}>
                        Địa chỉ:
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
                        Địa chỉ:
                      </strong>{" "}
                      {this.state.user ? this.state.user.Address : ""}
                      <br />
                    </>
                  )}
                  <abbr title="Phone" style={{ fontWeight: "bold" }}>
                    Số điện thoại:
                  </abbr>{" "}
                  {this.state.user ? this.state.user.Phone : ""}
                  <br />
                  <abbr title="Phone" style={{ fontWeight: "bold" }}>
                    Phương thức thanh toán:
                  </abbr>{" "}
                  {this.state.method}
                </address>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 text-right">
                <p>
                  <em style={{ fontWeight: "bold" }}>Thời gian: </em>
                  {moment(new Date(Date.now())).format("LL")}
                </p>
                <p>
                  <em style={{ fontWeight: "bold" }}>Hóa đơn #: </em>
                  {this.state.user ? this.state.user.paymentID : ""}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="text-center">
                <h1>Biên nhận</h1>
              </div>

              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>
                      <strong>Sản phẩm</strong>
                    </th>
                    <th>
                      <strong>Số lượng</strong>
                    </th>
                    <th className="text-center">
                      <strong>Giá</strong>
                    </th>
                    <th className="text-center">
                      <strong>Tổng cộng</strong>
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
                          {`${currency.format(item.price, {code:"VND"})}`}
                          </td>
                          <td className="col-md-1 text-center">
                            {" "}
                            {`${currency.format(item.price * item.quantityCart, {code:"VND"})}`}
                          </td>
                        </tr>
                      ))
                    : ""}
                  <tr>
                    <td>   </td>
                    <td>   </td>
                    <td className="text-right">
                      <h4>
                        <strong>Tổng: </strong>
                      </h4>
                    </td>
                    <td className="text-center text-danger">
                      <h4>
                        <strong>
                         {`${currency.format(this.state.amount, {code:"VND"})}`}
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
                  <Icon type="left" /> Tiếp tục mua sắm
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

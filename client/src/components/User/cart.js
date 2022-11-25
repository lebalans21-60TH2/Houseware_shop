import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCart,
  deleteCart,
  updateCartIn,
  updateCartDe,
  onSuccessBuy,
  auth
} from "../../actions/user_actions";
import { Button, Modal, Form, Input, message, Popconfirm } from "antd";
import NumberFormat from "react-number-format";
import { withRouter, Link } from "react-router-dom";
import Payment from "../../utils/payment";
import currency from "currency-formatter";

export class Cart extends Component {
  state = {
    total: 0,
    showTotal: false,
    visible: false,
    cartDetail: [],
    userData: {},
    quantity: 0
  };
  componentDidMount() {
    let cartItems = [];
    let user = this.props.user;
    this.props
      .dispatch(auth())
      .then(res => this.setState({ userData: res.payload }));
    if (user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        });
        this.props.dispatch(getCart(cartItems, user.userData.cart)).then(() => {
          if (this.props.user.cartDetail.length > 0) {
            this.setState({ cartDetail: this.props.user.cartDetail });
            this.totalAmount(this.props.user.cartDetail);
          }
        });
      }
    }
  }
  //   componentWillReceiveProps(nextProps) {
  //     if (nextProps && nextProps.user.cartDetail) {
  //       this.setState({ cartDetail: nextProps.user.cartDetail });
  //     }
  //   }
  s4() {
    return Math.floor((1 + Math.random()) * 0x1000)
      .toString(16)
      .substring(1);
  }
  generateID() {
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      this.s4()
    );
  }
  showModal = () => {
    this.props.form.setFields({ name: { value: "" } });
    this.setState({
      visible: true
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
      edit: false
    });
  };
  totalAmount = cart => {
    let total = 0;
    cart.forEach(item => {
      total += parseInt(item.price, 10) * item.quantityCart;
    });

    this.setState({
      total,
      showTotal: true
    });
  };
  findIndex = (products, id) => {
    var result = -1;
    products.forEach((product, index) => {
      if (product._id === id) {
        result = index;
      }
    });
    return result;
  };
  deleteItemFromCart = id => {
    let index = -1;
    const { cartDetail } = this.state;
    if (cartDetail) {
      index = this.findIndex(cartDetail, id);
      cartDetail.splice(index, 1);
      if (cartDetail.length <= 0) {
        this.setState({
          showTotal: false
        });
      } else {
        this.totalAmount(cartDetail);
      }
      this.setState({ cartDetail });
    }
    this.props.dispatch(deleteCart(id));
  };
  updateCartIn = id => {
    const { cartDetail } = this.state;
    let updateIn = {
      key: 1
    };
    this.props.dispatch(updateCartIn(id, updateIn));
    if (cartDetail) {
      cartDetail.forEach(item => {
        if (item._id === id) {
          item.quantityCart = item.quantityCart + 1;
          message.success("Update Successfully!");
          this.setState({ cartDetail });
          this.totalAmount(cartDetail);
        }
      });
    }
  };
  updateCartDe = id => {
    const { cartDetail } = this.state;
    this.props.dispatch(updateCartDe(id));
    if (cartDetail) {
      cartDetail.forEach(item => {
        if (item._id === id) {
          item.quantityCart = item.quantityCart - 1;
          this.setState({ cartDetail });
          message.success("Update Successfully!");
          this.totalAmount(cartDetail);
        }
      });
    }
  };

  paymentByPaypal = data => {
    const { userData, total } = this.state;
    let orderDetail = {
      user: data,
      cartDetail: this.props.user.cartDetail,
      total,
      method: "Thanh toán bằng Paypal",
      username: userData.name
    };
    localStorage.setItem("orderDetail", JSON.stringify(orderDetail));
    this.props
      .dispatch(
        onSuccessBuy({
          cartDetail: this.props.user.cartDetail,
          paymentData: data,
          amount: total
        })
      )
      .then(() => {
        if (this.props.user.successBuy) {
          this.setState({
            showTotal: false,
            showSuccess: true
          });
          this.props.history.push("/orderDetail");
        }
      });
  };
  paymentAtHome = e => {
    const { form } = this.props;
    const { userData, total } = this.state;

    e.preventDefault();
    form.validateFields((err, values) => {
      let newCartDetail = this.props.user.cartDetail;
      if (!err) {
        let data = {
          paymentID: this.generateID(),
          Address: values.address,
          Phone: values.phone,
          cancelled: false
        };
        let orderDetail = {
          user: data,
          username: userData.name,
          cartDetail: newCartDetail,
          total,
          method: "Thanh toán khi giao hàng"
        };
        localStorage.setItem("orderDetail", JSON.stringify(orderDetail));
        this.props
          .dispatch(
            onSuccessBuy({
              cartDetail: this.props.user.cartDetail,
              paymentData: data,
              amount: total
            })
          )
          .then(() => {
            if (this.props.user.successBuy) {
              this.setState({
                showTotal: false,
                showSuccess: true,
                visible: false
              });
              this.props.history.push("/orderDetail");
            }
          });
      }
    });
  };
  render() {
    const { user } = this.props;
    const { total, userData, cartDetail } = this.state;

    const totalProducts = cartDetail
      ? cartDetail.map((item, i) => (
          <li key={i}>
            {item.name}
            <span>
              {/* <NumberFormat
                value={parseInt(item.price, 10) * item.quantityCart}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              /> */}
              {`${currency.format(item.price * item.quantityCart, {code:"VND"})}`}{" "}
            </span>
          </li>
        ))
      : null;
    const cartItems = cartDetail
      ? cartDetail.map((item, i) => (
          <tbody key={i}>
            <tr className="rem1">
              <td className="invert">{i + 1}</td>
              <td className="invert-image" style={{ width: "8em" }}>
              <Link to={`/product_detail/${item._id}`}><img
                    src={item.images[0].url}
                    alt=" "
                    className="img-responsive"
                    style={{ width: "6em", height: "6em" }}
                  /></Link>
                {/* <a href="single.html">
                  <img
                    src={item.images[0].url}
                    alt=" "
                    className="img-responsive"
                    style={{ width: "6em", height: "6em" }}
                  />
                </a> */}
              </td>
              <td className="invert">
                <div className="quantity">
                  <div className="quantity-select">
                    <div
                      className="entry value-minus"
                      style={
                        item.quantityCart === 1
                          ? { pointerEvents: "none", opacity: 0.4 }
                          : null
                      }
                      onClick={() => this.updateCartDe(item._id)}
                    >
                      &nbsp;
                    </div>
                    <div className="entry value">
                      <span>{item.quantityCart}</span>
                    </div>
                    <div
                      className="entry value-plus active"
                      style={
                        item.quantityCart >= item.quantity
                          ? { pointerEvents: "none", opacity: 0.4 }
                          : null
                      }
                      onClick={() => this.updateCartIn(item._id)}
                    >
                      &nbsp;
                    </div>
                  </div>
                </div>
              </td> 
              <td className="invert"><Link to={`/product_detail/${item._id}`}>{item.name}</Link></td>

              <td className="invert">
              {`${currency.format(item.price, {code:"VND"})}`}
              </td>
              <td className="invert">
                <div className="rem">
                  <Popconfirm
                    title="Bạn có chắc chắn xóa sản phẩm này?"
                    onConfirm={() => this.deleteItemFromCart(item._id)}
                    onCancel={this.cancel}
                    okText="Có"
                    cancelText="Không"
                  >
                    <div className="close1" />
                  </Popconfirm>
                </div>
              </td>
            </tr>
          </tbody>
        ))
      : null;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="checkout">
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
              <li className="active">Giỏ hàng</li>
            </ol>
          </div>
          <div className="clearfix" />
        </div>
        <br />
        <div className="container">
          <h3 className="animated wow slideInLeft" data-wow-delay=".5s">
            Số sản phẩm:{" "}
            <span>{user.cartDetail ? user.cartDetail.length : 0} Sản phẩm</span>
          </h3>
          <div
            className="checkout-right animated wow slideInUp"
            data-wow-delay=".5s"
          >
            {cartDetail.length > 0 ? (
              <table className="timetable_sub">
                <tbody>
                  <tr>
                    <th>STT.</th>
                    <th>Hình ảnh</th>
                    <th>Số lượng</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Xóa</th>
                  </tr>
                </tbody>

                {cartItems}
              </table>
            ) : null}
          </div>

          <div className="checkout-left">
            {cartDetail.length > 0 ? (
              <div
                className="checkout-left-basket animated wow slideInLeft"
                data-wow-delay=".5s"
              >
                <h4>Tiếp tục vào giỏ hàng</h4>
                <ul>
                  {totalProducts}
                  <li
                    style={{
                      borderTop: "1px solid black",
                      color: "black",
                      fontSize: "1.5em"
                    }}
                  >
                    Tổng cộng{" "}
                    <span>
                    {`${currency.format(total, {code:"VND"})}`}
                    </span>
                  </li>
                </ul>
                <Button
                  type="primary"
                  style={{ background: "red", color: "white", width: "100%" }}
                  size="large"
                  onClick={this.showModal}
                >
                  
                  THANH TOÁN KHI GIAO HÀNG(COD)
                </Button>
                <div className="paypal_button_container">
                  <Payment
                    toPay={this.state.total}
                    transactionError={data => this.transactionError(data)}
                    transactionCanceled={data => this.transactionCanceled(data)}
                    onSuccess={data => this.paymentByPaypal(data)}
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            <div
              className="checkout-right-basket animated wow slideInRight"
              data-wow-delay=".5s"
            >
              <Link to="">
                <span
                  className="glyphicon glyphicon-menu-left"
                  aria-hidden="true"
                />
                Tiếp tục mua sắm
              </Link>
            </div>
            <div className="clearfix"> </div>
          </div>
        </div>
        <Modal
          title="Thanh toán"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Hủy bỏ
            </Button>,
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={this.state.loading}
              onClick={this.paymentAtHome}
            >
              Đồng ý
            </Button>
          ]}
        >
          <Form
            onSubmit={this.paymentAtHome}
            className="login-form"
            style={{ margin: "0 auto" }}
          >
            <Form.Item {...formItemLayout} label="Email">
              <Input
                placeholder="Email"
                value={userData ? userData.email : ""}
                disabled={true}
              />
            </Form.Item>
            <Form.Item {...formItemLayout} label="Họ">
              {" "}
              <Input
                placeholder="Họ"
                value={userData ? userData.name : ""}
                disabled={true}
                label="First Name"
              />
            </Form.Item>
            <Form.Item {...formItemLayout} label="Tên">
              <Input
                placeholder="Tên"
                value={userData ? userData.lastname : ""}
                disabled={true}
              />
            </Form.Item>
            <Form.Item {...formItemLayout} label="Địa chỉ">
              {getFieldDecorator("address", {
                rules: [
                  { required: true, message: "Vui lòng nhập địa chỉ nhận hàng!" }
                ]
              })(<Input placeholder="Địa chỉ" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Sdt">
              {getFieldDecorator("phone", {
                rules: [{ required: true, message: "Vui lòng nhập số điện thoại!" }]
              })(<Input placeholder="Số điện thoại" />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const CartForm = Form.create()(Cart);
export default connect(mapStateToProps)(withRouter(CartForm));

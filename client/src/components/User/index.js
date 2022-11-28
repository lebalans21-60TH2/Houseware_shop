import React, { Component } from "react";
import UserLayout from "../../hoc/user";
import MyButton from "../../utils/button";
import MUIDataTable from "mui-datatables";
import { Button, Badge, Icon, Spin, Popconfirm, message, Modal } from "antd";
import { getHistoryPurchase, deleteOrder } from "../../actions/user_actions";
import moment from "moment";
import currency from "currency-formatter";

export class UserDashboard extends Component {
  state = {
    visible: false,
    product: [],
    userData: [],
    data: [],
    status: "",
    date: "",
    id: "",
    amount: 0,
  };

  componentDidMount() {
    this.props.dispatch(getHistoryPurchase());
  }

  cancelOrder = (id) => {
    this.setState({ visible: false });
    this.props.dispatch(deleteOrder(id));
    message.success("Cancel Successfully");
  };

  showDetail = (id) => {
    const { user } = this.props;
    this.setState({ visible: true });
    if (user.payments) {
      user.payments.map((item) => {
        if (item._id === id) {
          this.setState({
            userData: item.user,
            data: item.data,
            product: item.product,
            status: item.status,
            date: item.date,
            id,
            amount: item.amount,
          });
        }
      });
    }
  };

  handleCancel = () => this.setState({ visible: false });

  showdata = () => {
    const { user } = this.props;
    let newData = [];
    if (user.payments) {
      newData = user.payments.map((product, i) => {
        return [
          i + 1,
          moment(new Date(product.date)).format("LL"),
          `${currency.format(product.amount, {code:"VND"})}`,
          product.status === "Active" ? (
            <Badge status="success" text="Completed" />
          ) : (
            <Badge status="processing" text="Processing" />
          ),
          <>
            <Button type="primary" onClick={() => this.showDetail(product._id)}>
              Chi tiết
            </Button>{" "}
            &nbsp;
            {product.status === "Pending" ? (
              <Popconfirm
                title={`Are you sure canel this order?`}
                onConfirm={() => this.cancelOrder(product._id)}
                onCancel={this.cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger">Cancel</Button>
              </Popconfirm>
            ) : null}
          </>,
        ];
      });
    }
    return newData;
  };

  render() {
    const { user } = this.props;
    const { data, product, userData, status, id, date, amount } = this.state;
    const columns = ["Stt.", "Thời gian", "Giá", "Trạng thái", "Tùy chọn"];
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      selectableRows: false,
    };
    console.log(data);
    return (
      <UserLayout>
        <div>
          <div className="user_nfo_panel">
            <h1>Thông tin người dùng</h1>
            <div>
              <span>
                Họ:{" "}
                <strong style={{ color: "#d8703f" }}>
                  {user.userData.lastname}
                </strong>
              </span>
              <span>
                Tên:{" "}
                <strong style={{ color: "#d8703f" }}>
                  {" "}
                  {user.userData.name}
                </strong>
              </span>
              <span>
                Email:{" "}
                <strong style={{ color: "#d8703f" }}>
                  {user.userData.email}
                </strong>
              </span>
            </div>
            <MyButton
              type="default"
              title="Chỉnh sửa thông tin"
              LinkTo="/user/updateProfile"
            />
          </div>

          {user.payments ? (
            <div
              style={{
                background: "#f8f8f8",
                padding: "14px",
                marginTop: "20px",
              }}
            >
              <MUIDataTable
                title={"Lịch sử mua hàng"}
                data={this.showdata()}
                columns={columns}
                options={options}
              />
            </div>
          ) : (
            <Spin indicator={antIcon} />
          )}
        </div>
        <Modal
          title="Chi tiết đơn hàng"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[
            status ? (
              status === "Active" ? null : (
                <Popconfirm
                  title={`Bạn có muốn hủy đơn hàng?`}
                  onConfirm={() => this.cancelOrder(id ? id : null)}
                  onCancel={this.cancel}
                  okText="Có"
                  cancelText="Không"
                >
                  <Button type="danger">Hủy</Button>
                </Popconfirm>
              )
            ) : null,
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={this.state.loading}
              onClick={this.handleCancel}
            >
              OK
            </Button>,
          ]}
        >
          <div className="row">
            <div
              className="well col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3"
              style={{
                marginLeft: "0px",
                width: "100%",
                overflowY: "auto",
                maxHeight: "40em",
              }}
            >
              <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6">
                  <address>
                    <strong style={{ fontWeight: "bold" }}>
                      Tên khách hàng:
                    </strong>{" "}
                    {userData[0]
                      ? `${userData[0].lastname} ${userData[0].name}`
                      : null}
                    <br />
                    {/* {data[0] ? (
                      data[0].paymentID.includes("PAYID") ? (
                        <>
                          {" "}
                          <strong style={{ fontWeight: "bold" }}>
                            Địa chỉ:
                          </strong>{" "}
                          {data[0].address.line1} ${data[0].address.city} $
                          {data[0].address.country_code}`
                          <br />
                        </>
                      ) : (
                        <>
                          {" "}
                          <strong style={{ fontWeight: "bold" }}>
                            Địa chỉ:
                          </strong>{" "}
                          {data[0] ? data[0].Address : ""}
                          <br />
                        </>
                      )
                    ) : null} */}
                    <abbr title="Phone" style={{ fontWeight: "bold" }}>
                      Địa chỉ:
                    </abbr>{" "}
                    {data[0]
                      ? data[0].Address
                        : null}
                    <br />
                    <abbr title="Phone" style={{ fontWeight: "bold" }}>
                      Hình thức thanh toán:
                    </abbr>{" "}
                    {data[0]
                      ? data[0].method : null}
                  </address>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 text-right">
                  <p>
                    <em style={{ fontWeight: "bold" }}>Thời gian: </em>
                    {moment(new Date(date ? date : "")).format("LL")}
                  </p>
                  <p>
                    <em style={{ fontWeight: "bold" }}>Mã biên nhận #: </em>
                    {data[0] ? data[0].paymentID : ""}
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
                        <strong>Tổng</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {product
                      ? product.map((item, i) => (
                          <tr key={i}>
                            <td className="col-md-9">
                              <em>{item.name}</em>
                            </td>
                            <td
                              className="col-md-1"
                              style={{ textAlign: "center" }}
                            >
                              {" "}
                              {item.quantity}{" "}
                            </td>
                            <td className="col-md-1 text-center">
                            {`${currency.format(item.price, {code:"VND"})}`}
                            </td>
                            <td className="col-md-1 text-center">
                              {" "}
                              {`${currency.format(item.price * item.quantity, {code:"VND"})}`}
                            </td>
                          </tr>
                        ))
                      : ""}
                    <tr>
                      <td></td>
                      <td></td>
                      <td className="text-right">
                        <h4>
                          <strong>Tổng: </strong>
                        </h4>
                      </td>
                      <td className="text-center text-danger">
                        <h4>
                          <strong>
                            
                             {`${currency.format(amount ? amount : null, {code:"VND"})}`}
                          </strong>
                        </h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Modal>
      </UserLayout>
    );
  }
}

export default UserDashboard;

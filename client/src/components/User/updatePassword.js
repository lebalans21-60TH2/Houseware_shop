import React, { Component } from "react";
import UserLayout from "../../hoc/user";
import { connect } from "react-redux";
import { Form, Input, Tooltip, Icon, Button, message } from "antd";
import { updateUserData } from "../../actions/user_actions";
import { withRouter } from "react-router-dom";

class UpdateInfo extends Component {
  state = {
    loading: false
  };
  componentDidMount() {
    const { form, user } = this.props;
    if (user.userData) {
      form.setFields({
        firstname: { value: user.userData.name },
        lastname: { value: user.userData.lastname },
        email: { value: user.userData.email }
      });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let dataSubmit = {
          name: values.firstname,
          lastname: values.lastname,
          email: values.email
        };
        this.props.dispatch(updateUserData(dataSubmit)).then(res => {
          if (res.payload.success) {
            message.success("Update Information Successfully!");
            this.setState({ loading: false });
            this.props.history.push("/");
          }else{
            message.error("Update Information Failed!");
          }
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <UserLayout>
          <h2>Thông tin cá nhân</h2>
          <Form onSubmit={this.handleSubmit}>
            
            <Form.Item
              label={
                <span>
                  Họ &nbsp;
                  <Tooltip title="Enter your last name!">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator("lastname", {
                rules: [
                  {
                    required: true,
                    message: "Please input your last name!",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Tên &nbsp;
                  <Tooltip title="Enter your first name!">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator("firstname", {
                rules: [
                  {
                    required: true,
                    message: "Please input your first name!",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Email&nbsp;
                  <Tooltip title="Enter your email!">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.loading}
              >
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </UserLayout>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const WrappedRegistrationForm = Form.create()(UpdateInfo);
export default connect(mapStateToProps)(withRouter(WrappedRegistrationForm));

import React, { Component } from "react";
import axios from "axios";
import { Modal } from "antd";
import "antd/dist/antd.css";
import InputTemplate from "../../utils/Form/inputTemplate";
import {
  update,
  generateData,
  isFormValid
} from "../../utils/Form/validateForm";
class updatepassword extends Component {
  state = {
   
    formError: false,
    formErrorMessage: "",
    formSuccess: "",
    formdata: {
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Nhập mật khẩu "
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      newpassword: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Nhập mật khẩu mới"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      confirmPassword: {
        element: "input",
        value: "",
        config: {
          name: "confirm_password_input",
          type: "password",
          placeholder: "Nhập lại mật khẩu mới"
        },
        validation: {
          required: true,
          confirm: "newpassword"
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };
  componentDidMount() {
    // const resetToken = this.props.match.params.token;
    // this.setState({ resetToken });
    const { form, user } = this.props;
   
  }
  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, "update_password");
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };
  countDown = () => {
    let secondsToGo = 3;
    const modal = Modal.success({
      title: "Đặt lại mật khẩu thành công !!",
      content: `Trang chủ sẽ mở sau ${secondsToGo} giây!`
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `Trang chủ sẽ mở sau ${secondsToGo} giây!`
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  };
  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "update_password");
    let formIsValid = isFormValid(this.state.formdata, "update_password");

    if (formIsValid) {
      axios
        .post("/api/client/update_password", {
          ...dataToSubmit,
         
        })
        .then(response => {
          if (!response.data.success) {
            this.setState({
              formError: true,
              formErrorMessage: response.data.message
            });
          } else {
            this.setState({ formError: false, formSuccess: true });
            this.countDown();
            setTimeout(() => {
              this.props.history.push("/");
            }, 3000);
          }
        });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  render() {
    const { formErrorMessage, formError, formdata } = this.state;
    return (
      <div>
        <div className="breadcrumbs">
          <div className="container">
            <ol
              className="breadcrumb breadcrumb1 animated wow slideInLeft"
              data-wow-delay=".5s"
            >
              <li>
                <a href="/">
                  <span
                    className="glyphicon glyphicon-home"
                    aria-hidden="true"
                  />
                  Trang chủ
                </a>
              </li>
              <li className="active">Đổi mật khẩu</li>
            </ol>
          </div>
        </div>
        <div className="login">
          <div className="container">
            <h3 className="animated wow zoomIn" data-wow-delay=".5s">
              Đổi mật khẩu
            </h3>
            <div
              className="login-form-grids animated wow slideInUp"
              data-wow-delay=".5s"
            >
              <form onSubmit={this.submitForm}>
                <InputTemplate
                  id={"password"}
                  formdata={formdata.password}
                  change={element => this.updateForm(element)}
                />
                 <InputTemplate
                  id={"newpassword"}
                  formdata={formdata.newpassword}
                  change={element => this.updateForm(element)}
                />
                <InputTemplate
                  id={"confirmPassword"}
                  formdata={formdata.confirmPassword}
                  change={element => this.updateForm(element)}
                />
                {formError ? (
                  <div className="error_label">{formErrorMessage}</div>
                ) : (
                  ""
                )}
                <input
                  onClick={this.submitForm}
                  type="submit"
                  value="Đổi mật khẩu"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default updatepassword;

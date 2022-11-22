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
class ResetPass extends Component {
  state = {
    resetToken: "",
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
          placeholder: "Enter your password"
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
          placeholder: "Confirm your password"
        },
        validation: {
          required: true,
          confirm: "password"
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };
  componentDidMount() {
    const resetToken = this.props.match.params.token;
    this.setState({ resetToken });
  }
  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, "reset_pass");
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };
  countDown = () => {
    let secondsToGo = 3;
    const modal = Modal.success({
      title: "Reset Your Password Successfully !!",
      content: `You will be redirected to the HOME after ${secondsToGo} second!`
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `You will be redirected to the HOME after ${secondsToGo} second!`
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  };
  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "reset_pass");
    let formIsValid = isFormValid(this.state.formdata, "reset_pass");

    if (formIsValid) {
      axios
        .post("/api/client/reset_password", {
          ...dataToSubmit,
          resetToken: this.state.resetToken
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
              this.props.history.push("/register_login");
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
                <a href="index.html">
                  <span
                    className="glyphicon glyphicon-home"
                    aria-hidden="true"
                  />
                  Home
                </a>
              </li>
              <li className="active">Reset Password</li>
            </ol>
          </div>
        </div>
        <div className="login">
          <div className="container">
            <h3 className="animated wow zoomIn" data-wow-delay=".5s">
              Reset Password
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
                  value="Reset password"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPass;

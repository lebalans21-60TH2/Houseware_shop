import React, { Component } from "react";
import axios from "axios";
import InputTemplate from "../../utils/Form/inputTemplate";
import {
  update,
  generateData,
  isFormValid
} from "../../utils/Form/validateForm";

class ReserUser extends Component {
  state = {
    formError: false,
    formSuccess: false,
   
    
    formdata: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Nhập Email của bạn"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, "reset_email");
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, "reset_email");
    let formIsValid = isFormValid(this.state.formdata, "reset_email");

    if (formIsValid) {
      axios.post("/api/client/reset_user", dataToSubmit).then(response => {
        if (response.data.success) {
          this.setState({
            formSuccess: true
          });
        }else {
          this.setState({
            formError: true
          });

        }
      });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  render() {
    const { formdata, formError, formSuccess} = this.state;
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
              <li className="active">Quên mật khẩu</li>
            </ol>
          </div>
        </div>
        <div className="login">
          <div className="container">
            <h3 className="animated wow zoomIn" data-wow-delay=".5s">
              Quên mật khẩu
            </h3>

            <div
              className="login-form-grids animated wow slideInUp"
              data-wow-delay=".5s"
            >
              <form onSubmit={this.submitForm}>
                <InputTemplate
                  id={"email"}
                  formdata={formdata.email}
                  change={element => this.updateForm(element)}
                />
                {formSuccess ? (
                  <div className="form_success">Xong, kiểm tra Email</div>
                ) : null}
                {formError ? (
                  <div className="error_label">Kiểm tra lại Email đã nhập</div>
                ) : null}
               
                <input
                  onClick={this.submitForm}
                  type="submit"
                  value="Gửi mã xác nhận"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReserUser;

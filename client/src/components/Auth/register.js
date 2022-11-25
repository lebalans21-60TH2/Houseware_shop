import React, {Component} from "react";
import InputTemplate from "../../utils/Form/inputTemplate";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {message, Modal} from "antd";
import "antd/dist/antd.css";
import {generateData, isFormValid, update} from "../../utils/Form/validateForm";
import {registerUser} from "../../actions/user_actions";

class Register extends Component {
    state = {
        formError: false,
        formSuccess: "",
        formdata: {
            lastname: {
                element: "input",
                value: "",
                config: {
                    name: "lastname_input",
                    type: "text",
                    placeholder: "Họ..." 
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ""
            },
            name: {
                element: "input",
                value: "",
                config: {
                    name: "name_input",
                    type: "text",
                    placeholder: "Tên..."
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ""
            },
            email: {
                element: "input",
                value: "",
                config: {
                    name: "email_input",
                    type: "email",
                    placeholder: "Email của bạn!!!"
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ""
            },
            password: {
                element: "input",
                value: "",
                config: {
                    name: "password_input",
                    type: "password",
                    placeholder: "Vui lòng nhập mật khẩu!!!"
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
                    placeholder: "Vui lòng nhập lại mật khẩu!!!"
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
    updateForm = element => {
        const newFormdata = update(element, this.state.formdata, "register");

        this.setState({
            formError: false,
            formdata: newFormdata
        });
    };
    countDown = () => {
        let secondsToGo = 3;
        const modal = Modal.success({
            title: "SUCCESSFULLY !!",
            content: `Trang Đăng Nhập sẽ mở sau ${secondsToGo} giây!`
        });
        const timer = setInterval(() => {
            secondsToGo -= 1;
            modal.update({
                content: `Trang Đăng Nhập sẽ mở sau ${secondsToGo} giây!`
            });
        }, 1000);
        setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
        }, secondsToGo * 1000);
    };
    onSubmit = e => {
        e.preventDefault();
        let dataToSubmit = generateData(this.state.formdata, "register");
        console.log(dataToSubmit);
        let formIsValid = isFormValid(this.state.formdata, "register");
        if (formIsValid) {
            this.props
                .dispatch(registerUser(dataToSubmit))
                .then(res => {
                    if (res.payload.success) {
                        this.countDown();
                        this.setState({
                            formError: false,
                            formSuccess: true
                        });
                        setTimeout(() => {
                            this.props.history.push("/register_login");
                        }, 3000);
                    } else {
                      console.log(res.payload);
                        message.warning(res.payload.err.message);
                        this.setState({
                            formError: true
                        });
                    }
                })
                .catch(err => {
                    this.setState({
                        formError: true
                    });
                });
        } else {
            this.setState({
                formError: true
            });
        }
    };

    render() {
        var {formdata} = this.state;
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
                            <li className="active">Đăng ký</li>
                        </ol>
                    </div>
                </div>

                <div className="register">
                    <div className="container">
                        <h3 className="animated wow zoomIn" data-wow-delay=".5s">
                            Đăng ký
                        </h3>

                        <div className="login-form-grids">
                            <h5 className="animated wow slideInUp" data-wow-delay=".5s">
                                Thông tin người dùng
                            </h5>
                            <form
                                className="animated wow slideInUp"
                                data-wow-delay=".5s"
                                onSubmit={this.onSubmit}
                            >
                                <InputTemplate
                                    id={"lastname"}
                                    formdata={formdata.lastname}
                                    change={element => this.updateForm(element)}
                                />
                                <InputTemplate
                                    id={"name"}
                                    formdata={formdata.name}
                                    change={element => this.updateForm(element)}
                                />
                                
                                <h6 className="animated wow slideInUp" data-wow-delay=".5s">
                                    Thông tin đăng nhập
                                </h6>
                                <InputTemplate
                                    id={"email"}
                                    formdata={formdata.email}
                                    change={element => this.updateForm(element)}
                                />
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
                                {this.state.formError ? (
                                    <div className="error_label">Vui lòng kiểm tra lại dữ liệu</div>
                                ) : null}
                                <input onClick={this.onSubmit} type="submit" value="Đăng ký"/>
                            </form>
                        </div>
                        <div
                            className="register-home animated wow slideInUp"
                            data-wow-delay=".5s"
                        >
                            <Link to="/">Tiếp tục mua sắm</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(withRouter(Register));

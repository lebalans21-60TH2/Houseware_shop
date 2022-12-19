import React, {Component} from "react";
import {connect} from "react-redux";
import InputTemplate from "../../utils/Form/inputTemplate";
import {Modal} from "antd";
import "antd/dist/antd.css";
import {FacebookLoginButton} from "react-social-login-buttons";
import {GoogleLoginButton} from "react-social-login-buttons";
import {
    update,
    generateData,
    isFormValid
} from "../../utils/Form/validateForm";
import {loginUser} from "../../actions/user_actions";
import {withRouter, Link} from "react-router-dom";

class RegisterLogin extends Component {
    state = {
        formError: false,
        formSuccess: "",
        formdata: {
            email: {
                element: "input",
                value: "",
                config: {
                    name: "email_input",
                    type: "email",
                    placeholder: "Email..."
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
                    placeholder: "Mật khẩu..."
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ""
            }
        }
    };
    countDown = () => {
        let secondsToGo = 3;
        const modal = Modal.success({
            title: "SUCCESSFULLY !!",
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
    countDownAdmin = () => {
        let secondsToGo = 100;
        const modal = Modal.success({
            title: "CẢNH BÁO !!",
            content: `Đây không phải hệ thống ADMIN, tài khoản ADMIN không khả dụng trên hệ thống mua sắm này!`
        });
        const timer = setInterval(() => {
            secondsToGo -= 1;
            modal.update({
                content: `Đây không phải hệ thống ADMIN, tài khoản ADMIN không khả dụng trên hệ thống mua sắm này!!`
            });
        }, 1000);
        setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
        }, secondsToGo * 1000);
    };
    submitForm = e => {
        e.preventDefault();
        let dataToSubmit = generateData(this.state.formdata, "login");
        let formIsValid = isFormValid(this.state.formdata, "login");

        if (formIsValid) {
            this.props.dispatch(loginUser(dataToSubmit)).then(res => {
                if (res.payload.loginSuccess) {
                    this.countDown();
                    setTimeout(() => {
                        this.props.history.push("");
                    }, 3000);
                }else if (res.payload.loginAdminSuccess) {this.countDownAdmin();
                    setTimeout(() => {
                        // this.props.history.push("");
                    }, 3000);} else {
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

    updateForm = element => {
        const newFormdata = update(element, this.state.formdata, "login");
        this.setState({
            formError: false,
            formdata: newFormdata
        });
    };

    render() {
        var {formdata, formError} = this.state;
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
                                    <span className="glyphicon glyphicon-home" aria-hidden="true"/>
                                    Trang chủ
                                </a>
                            </li>
                            <li className="active">Đăng nhập</li>
                        </ol>
                    </div>
                </div>
                <div className="login">
                    <div className="container">
                        <h3 className="animated wow zoomIn" data-wow-delay=".5s">
                            Đăng nhập
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
                                <InputTemplate
                                    id={"password"}
                                    formdata={this.state.formdata.password}
                                    change={element => this.updateForm(element)} //element(id,event,blur) tu InputTemplate truyen ra
                                />
                                {formError ? (
                                    <div className="error_label">Email hoặc mật khẩu không đúng!!!</div>
                                ) : null}
                                <div className="forgot">
                                    <Link to='/reset_user'>Quên mật khẩu?</Link>
                                </div>
                                <input onClick={this.submitForm} type="submit" value="Đăng nhập"/>
                                {/* <a href="/auth/facebook"> <FacebookLoginButton/></a>
                                <a href="/auth/google"><GoogleLoginButton/></a> */}
                            </form>
                        </div>
                        <h4 className="animated wow slideInUp" data-wow-delay=".5s">
                            
                        </h4>
                        <p className="animated wow slideInUp" data-wow-delay=".5s">
                            <a href="/register">Đăng ký</a> || {" "}
                            <a href="/">
                                Trang chủ
                                <span
                                    className="glyphicon glyphicon-menu-right"
                                    aria-hidden="true"
                                />
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

// The Way 1
// const mapStateToProps = state =>({
//     user: state.user
// })
// // const mapDispatchToProps = (dispatch,props) => ({
// //     onLoginUser : dataToSubmit =>{
// //         dispatch(loginUser(dataToSubmit));
// //     }
// // })
// export default connect(mapStateToProps,{loginUser})(withRouter(Login));

export default connect()(withRouter(RegisterLogin));

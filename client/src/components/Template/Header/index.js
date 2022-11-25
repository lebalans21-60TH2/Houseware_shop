import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {AutoComplete, Avatar, Badge, Icon, Input} from "antd";
import {Logout} from "../../../actions/user_actions";
import {searchProduct} from "../../../actions/products";

class Header extends Component {
    state = {
        dataSource: [
            "Nồi",
            "Chảo",
            "Bếp điện",
            "Tủ lạnh",
            "Dao bếp",
            "Máy giặt",
            "Sunhouse",
            "SATO",
            "Bluestone"
        ],
        textSearch: "",
        open: false,
        user: [
            {
                name: "My Account",
                linkTo: "/user/dashboard",
                public: false
            },
            {
                name: "Login",
                linkTo: "/register_login",
                className: "glyphicon glyphicon-log-in",
                public: true
            },
            {
                name: "Register",
                linkTo: "/register",
                className: "glyphicon glyphicon-book",
                public: true
            },
            {
                name: "Logout",
                linkTo: "/user/logout",
                className: "glyphicon glyphicon-log-out",
                public: false
            }
        ]
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.userData.isAuth) {
            this.setState({
                isAuth: true
            });
        }
    }

    logOut = () => {
        this.props.dispatch(Logout()).then(res => {
            if (res.payload.success) {
                this.props.history.push("/");
            }
        });
    };
    defaultLink = (item, i) =>
        item.name === "Logout" ? (
            <li key={i} onClick={this.logOut}>
                <i className={item.className} aria-hidden="true"/>
                <a>{item.name}</a>
            </li>
        ) : item.name === "My Account" ? (
            <li key={i}>
                <i className={item.className} aria-hidden="true"/>
                <Link to={item.linkTo}>
                    <Avatar
                        size="small"
                        style={{backgroundColor: "#87d068", marginRight: 5}}
                        icon="user"
                    />
                    <span style={{color: "#d8703f"}}>
            {this.props.user.userData.name}
          </span>
                </Link>
            </li>
        ) : (
            <li key={i}>
                <i className={item.className} aria-hidden="true"/>
                <Link to={item.linkTo}>{item.name}</Link>
            </li>
        );
    showLinks = type => {
        let list = [];
        if (this.props.user.userData) {
            type.forEach(item => {
                if (!this.props.user.userData.isAuth) {
                    if (item.public === true) {
                        list.push(item);
                    }
                } else {
                    if (item.name !== "Login" && item.name !== "Register") {
                        list.push(item);
                    }
                }
            });
        }
        return list.map((item, i) => {
            return this.defaultLink(item, i);
        });
    };
    showCart = () => {
        const user = this.props.user.userData;
        if (user) {
            if (user.isAuth) {
                return (
                    <div className="header-right">
                        <div style={{marginTop: "5px", float: "right"}}>
                            <Link to="/cart">
                                <Badge
                                    count={user.cart ? user.cart.length : 0}
                                    style={{backgroundColor: "#52c41a"}}
                                >
                                    <Icon
                                        type="shopping-cart"
                                        style={{fontSize: "35px", color: "#ffc229"}}
                                    />
                                </Badge>
                            </Link>
                            <p>
                                <a className="simpleCart_empty">
                                    {user.cart ? "" : "Empty Cart"}
                                </a>
                            </p>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                );
            }
        }
    };
    onSelect = value => {
        this.setState({
            textSearch: value
        });
    };
    handleSearch = value => {
        value
            ? this.setState({open: true, textSearch: value})
            : this.setState({open: false, textSearch: value});
    };

    onSearch = () => {
        this.props.dispatch(searchProduct(this.state.textSearch));
        this.props.history.push("/search");
    };

    render() {
        const {dataSource, open, user} = this.state;
        return (
            // <!-- header -->
            <div className="header">
                <div className="container">
                    <div className="header-grid">
                        <div
                            className="header-grid-left animated wow slideInLeft"
                            data-wow-delay=".5s"
                        >
                            <ul>
                                <li>
                                    <i
                                        className="glyphicon glyphicon-envelope"
                                        aria-hidden="true"
                                    />
                                    <a href="mailto:taihtgcs15415@fpt.edu.vn">
                                        admin123@gmail.com
                                    </a>
                                </li>
                                <li>
                                    <i
                                        className="glyphicon glyphicon-earphone"
                                        aria-hidden="true"
                                    />
                                    +(84) 320 435 654
                                </li>
                                {this.showLinks(user)}
                            </ul>
                        </div>
                        <div
                            className="header-grid-right animated wow slideInRight"
                            data-wow-delay=".5s"
                        >
                            <ul className="social-icons">
                                <li>
                                    <a href="#" className="facebook"/>
                                </li>
                                <li>
                                    <a href="#" className="twitter"/>
                                </li>
                                <li>
                                    <a href="#" className="g"/>
                                </li>
                                <li>
                                    <a href="#" className="instagram"/>
                                </li>
                            </ul>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="logo-nav">
                        <div
                            className="logo-nav-left animated wow zoomIn"
                            data-wow-delay=".5s"
                        >
                            <h1>
                                <Link to="/">
                                Houseware Store <span>Shop anywhere</span>
                                </Link>
                            </h1>
                        </div>
                        <div className="logo-nav-left1">
                            <nav className="navbar navbar-default">
                                {/* <!-- Brand and toggle get grouped for better mobile display --> */}
                                <div className="navbar-header nav_2">
                                    <button
                                        type="button"
                                        className="navbar-toggle collapsed navbar-toggle1"
                                        data-toggle="collapse"
                                        data-target="#bs-megadropdown-tabs"
                                    >
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar"/>
                                        <span className="icon-bar"/>
                                        <span className="icon-bar"/>
                                    </button>
                                </div>
                                <div
                                    className="collapse navbar-collapse"
                                    id="bs-megadropdown-tabs"
                                >
                                    <ul className="nav navbar-nav">
                                        <li className="active">
                                            <Link to="/" className="act">
                                                Trang chủ
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/shop">Sản phẩm</Link>
                                        </li>
                                        <li>
                                            <Link to="/contact">Liên hệ</Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>

                        <AutoComplete
                            style={{width: 300, marginTop: 20, marginLeft: 15}}
                            dataSource={dataSource}
                            placeholder="Tìm kiếm..."
                            onSearch={this.handleSearch}
                            onSelect={this.onSelect}
                            filterOption={(inputValue, option) =>
                                option.props.children
                                    .toUpperCase()
                                    .indexOf(inputValue.toUpperCase()) !== -1
                            }
                            open={open}
                        >
                            <Input
                                suffix={
                                    <Icon
                                        type="search"
                                        className="certain-category-icon"
                                        onClick={this.onSearch}
                                    />
                                }
                            />
                        </AutoComplete>
                        {this.showCart()}
                        <div className="clearfix"/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        products: state.products
    };
};
export default connect(mapStateToProps)(withRouter(Header));
//   <header classNameName="bck_b_light">
//   <div classNameName="container">
//     <div classNameName="left">
//       <div classNameName="logo">SHOWROOM MOTOR</div>
//     </div>
//     <div classNameName="right">
//       <div classNameName="top">
//           Login
//       </div>
//       <div classNameName="bottom"></div>
//     </div>
//   </div>
// </header>

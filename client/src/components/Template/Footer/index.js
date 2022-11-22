import React, {Component} from "react";
import {animateScroll as scroll} from "react-scroll";
import {Icon} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import "antd/dist/antd.css";

class Footer extends Component {
    scrollToTop = () => {
        scroll.scrollToTop();
    };
    showCartSide = () => {
        const user = this.props.user.userData;
        if (user) {
            if (user.isAuth) {
                return (
                    <div className="cart-side-container">
                        <Link to="/cart" id="cart-side-plus">
                            ({user.cart ? user.cart.length : 0})<Icon type="shopping-cart"/>
                        </Link>
                    </div>
                );
            }
        }
    };

    render() {
        return (
            <div className="footer">
                {this.showCartSide()}
                <div className="scroll-to-top-container">
                    <button onClick={this.scrollToTop} id="btn-to-top">
                        <Icon type="up"/>
                    </button>
                </div>
                <div className="container">
                    <div className="footer-grids">
                        <div
                            className="col-md-3 footer-grid animated wow slideInLeft"
                            data-wow-delay=".5s"
                        >
                            <h3>About Us</h3>
                            <p>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse.
                                <span>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit.
                </span>
                            </p>
                        </div>
                        <div
                            className="col-md-3 footer-grid animated wow slideInLeft"
                            data-wow-delay=".6s"
                        >
                            <h3>Contact Info</h3>
                            <ul>
                                <li>
                                    <i
                                        className="glyphicon glyphicon-map-marker"
                                        aria-hidden="true"
                                    />
                                    55/31/1 Thanh My, Ward 8, Tan Binh District,{" "}
                                    <span>Ho Chi Minh City.</span>
                                </li>
                                <li>
                                    <i
                                        className="glyphicon glyphicon-envelope"
                                        aria-hidden="true"
                                    />
                                    <a href="mailto:taihtgcs15415@fpt.edu.vn">
                                      Longnguyen9897@gmail.com
                                    </a>
                                </li>
                                <li>
                                    <i
                                        className="glyphicon glyphicon-earphone"
                                        aria-hidden="true"
                                    />
                                    +(84) 961 079 699
                                </li>
                            </ul>
                        </div>
                        <div
                            className="col-md-3 footer-grid animated wow slideInLeft"
                            data-wow-delay=".7s"
                        >
                            <h3>Flickr Posts</h3>
                            <div className="footer-grid-left">
                                <a href="single.html">
                                    <img
                                        src="/images/videopic3.jpg"
                                        alt=" "
                                        className="img-responsive"
                                    />
                                </a>
                            </div>
                            <div className="footer-grid-left">
                                <a href="single.html">
                                    <img
                                        src="/images/videopic1.jpg"
                                        alt=" "
                                        className="img-responsive"
                                    />
                                </a>
                            </div>
                            <div className="footer-grid-left">
                                <a href="single.html">
                                    <img
                                        src="/images/videopic2.jpg"
                                        alt=" "
                                        className="img-responsive"
                                    />
                                </a>
                            </div>
                            <div className="footer-grid-left">
                                <a href="single.html">
                                    <img
                                        src="/images/videopic4.jpg"
                                        alt=" "
                                        className="img-responsive"
                                    />
                                </a>
                            </div>
                            <div className="footer-grid-left">
                                <a href="single.html">
                                    <img
                                        src="/images/videopic5.jpg"
                                        alt=" "
                                        className="img-responsive"
                                    />
                                </a>
                            </div>
                            <div className="footer-grid-left">
                                <a href="single.html">
                                    <img
                                        src="/images/videopic6.jpg"
                                        alt=" "
                                        className="img-responsive"
                                    />
                                </a>
                            </div>
                            <div className="footer-grid-left">
                                <a href="single.html">
                                    <img
                                        src="/images/recent1.jpg"
                                        alt=" "
                                        className="img-responsive"
                                    />
                                </a>
                            </div>
                            <div className="footer-grid-left">
                                <a href="single.html">
                                    <img
                                        src="/images/recent2.jpg"
                                        alt=" "
                                        className="img-responsive"
                                    />
                                </a>
                            </div>
                            <div className="footer-grid-left">
                                <a href="single.html">
                                    <img
                                        src="/images/recent3.jpg"
                                        alt=" "
                                        className="img-responsive"
                                    />
                                </a>
                            </div>
                            <div className="footer-grid-left">
                                <a href="single.html">
                                    <img
                                        src="/images/recent4.jpg"
                                        alt=" "
                                        className="img-responsive"
                                    />
                                </a>
                            </div>
                            <div className="footer-grid-left">
                                <a href="single.html">
                                    <img
                                        src="/images/recent5.jpg"
                                        alt=" "
                                        className="img-responsive"
                                    />
                                </a>
                            </div>
                            <div className="footer-grid-left">
                                <a href="single.html">
                                    <img
                                        src="/images/recent6.jpg"
                                        alt=" "
                                        className="img-responsive"
                                    />
                                </a>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div
                            className="col-md-3 footer-grid animated wow slideInLeft"
                            data-wow-delay=".8s"
                        >
                            <h3>Blog Posts</h3>
                            <div className="footer-grid-sub-grids">
                                <div className="footer-grid-sub-grid-left">
                                    <a href="single.html">
                                        <img
                                            src="/images/recent8-8.jpg"
                                            alt=" "
                                            className="img-responsive"
                                        />
                                    </a>
                                </div>
                                <div className="footer-grid-sub-grid-right">
                                    <h4>
                                        <a href="single.html">culpa qui officia deserunt</a>
                                    </h4>
                                    <p>Posted On 22/02/2020</p>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="footer-grid-sub-grids">
                                <div className="footer-grid-sub-grid-left">
                                    <a href="single.html">
                                        <img
                                            src="/images/recent1-1.jpg"
                                            alt=" "
                                            className="img-responsive"
                                        />
                                    </a>
                                </div>
                                <div className="footer-grid-sub-grid-right">
                                    <h4>
                                        <a href="single.html">Quis autem vel eum iure</a>
                                    </h4>
                                    <p>Posted On 30/3/2020</p>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div
                        className="footer-logo animated wow slideInUp"
                        data-wow-delay=".5s"
                    >
                        <h2>
                            <a href="index.html">
                                Motor Store <span>shop anywhere</span>
                            </a>
                        </h2>
                    </div>
                    <div
                        className="copy-right animated wow slideInUp"
                        data-wow-delay=".5s"
                    >
                        <p>
                            &copy 2016 Motor Store. All rights reserved | Design by{" "}
                            <a href="https://www.facebook.com/tai.nganh.9">Nguyen Hoang Long</a>
                        </p>
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
export default connect(mapStateToProps)(Footer);

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
                            <h3>Giới thiệu</h3>
                            <p>
                                Houseware Store chuyên cung cấp các sản phẩm đồ gia dụng giá rẻ, chất lượng cao.
                                <span>
                 Nhiều chính sách khuyến mãi, 1 đổi 1 trong vòng 7 ngày và bảo hành trọn đời cho mọi sản phẩm.
                </span>
                            </p>
                        </div>
                        <div
                            className="col-md-3 footer-grid animated wow slideInLeft"
                            data-wow-delay=".6s"
                        >
                            <h3>Thông tin liên hệ</h3>
                            <ul>
                                <li>
                                    <i
                                        className="glyphicon glyphicon-map-marker"
                                        aria-hidden="true"
                                    />
                                    55/31/1 Thanh My, Ward 8, Tan Binh District, TP.HCM.
                                    
                                </li>
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
                                    +(84) 233 234 564
                                </li>
                            </ul>
                        </div>
                        {/* <div
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
                        </div> */}
                           <div
                            className="col-md-3 footer-grid animated wow slideInLeft"
                            data-wow-delay=".6s"
                        >
                            <h3>Hướng dẫn - chính sách</h3>
                            <ul>
                                <li>
                                   Hướng dẫn mua hàng
                                </li>
                                <li>
                                   Chính sách đổi trả
                                </li>
                                <li>
                                   Chính sách bảo hành
                                </li>
                                <li>
                                   Chính sách thanh toán
                                </li>
                            </ul>
                        </div>
                        <div
                            className="col-md-3 footer-grid animated wow slideInLeft"
                            data-wow-delay=".8s"
                        >
                            <h3>Theo dõi chúng tôi</h3>
                            <ul className="social-icons" >
                                <li>
                                    <img 
                                    style={{width:"40px", height:"40px"}}
                                    src="images/fackebook.png" 
                                    alt="facebook"/>
                                </li>
                                <li>
                                    <img 
                                    style={{width:"40px", height:"40px"}}
                                    src="images/Twitter-logo.png" 
                                    alt="twiter"/>
                                </li>
                                <li>
                                    <img 
                                    style={{width:"40px", height:"40px"}}
                                    src="images/pngwing.com.png" 
                                    alt="google"/>
                                </li>
                                <li>
                                    <img 
                                    style={{width:"40px", height:"40px"}}
                                    src="images/intagram.png" 
                                    alt="intagram"/>
                                </li>
                            </ul>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div
                        className="footer-logo animated wow slideInUp"
                        data-wow-delay=".5s"
                    >
                        <h2>
                            <a href="/">
                                HouseWare Store<span>shop anywhere</span>
                            </a>
                        </h2>
                    </div>
                    <div
                        className="copy-right animated wow slideInUp"
                        data-wow-delay=".5s"
                    >
                        {/* <p>
                            &copy 2016 Motor Store. All rights reserved | Design by{" "}
                            <a href="https://www.facebook.com/tai.nganh.9">Nguyen Hoang Long</a>
                        </p> */}
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

import React, { Component } from "react";

export class ContactUs extends Component {
  render() {
    return (
      <div>
        {/* breadcrumbs */}
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
              <li className="active">Liên hệ</li>
            </ol>
          </div>
        </div>
        {/* //breadcrumbs */}
        {/* mail */}
        <div className="mail animated wow zoomIn" data-wow-delay=".5s">
          <div className="container">
            <h3>Inbox qua Email</h3>
            <div className="mail-grids">
              <div
                className="col-md-8 mail-grid-left animated wow slideInLeft"
                data-wow-delay=".5s"
              >
                <form>
                  <input type="text" placeholder="Tên" required />
                  <input type="email" placeholder="Email" required />
                  <input type="text" defaultValue="Chủ đề" required />
                  <textarea type="text" required defaultValue={"Lời nhắn..."} />
                  <input type="submit" defaultValue="Submit Now" />
                </form>
              </div>
              {/* <div
                className="col-md-4 mail-grid-right animated wow slideInRight"
                data-wow-delay=".5s"
              >
                <div className="mail-grid-right1">
                  <img
                    style={{ width: 210 }}
                    src="images/me.jpg"
                    alt=" "
                    className="img-responsive"
                  />
                  <h4>
                    Hoang Thanh Tai <span>President</span>
                  </h4>
                  <ul className="phone-mail">
                    <li>
                      <i
                        className="glyphicon glyphicon-earphone"
                        aria-hidden="true"
                      />
                      Phone: +90 555 1967
                    </li>
                    <li>
                      <i
                        className="glyphicon glyphicon-envelope"
                        aria-hidden="true"
                      />
                      Email:{" "}
                      <a href="mailto:info@example.com">
                        taihtgcs15415@fpt.edu.vn
                      </a>
                    </li>
                  </ul>
                  <ul className="social-icons">
                    <li>
                      <a
                        href="https://www.facebook.com/tai.nganh.9"
                        className="facebook"
                      />
                    </li>
                    <li>
                      <a href="#" className="twitter" />
                    </li>
                    <li>
                      <a href="#" className="g" />
                    </li>
                    <li>
                      <a href="#" className="instagram" />
                    </li>
                  </ul>
                </div>
              </div> */}
              <div className="clearfix"> </div>
            </div>
            <iframe
              className="animated wow slideInLeft"
              data-wow-delay=".5s"
              width="600"
              height={500}
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3919.3999857003523!2d106.65112381525735!3d10.780645842318709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zNTUvMzEgVGjDoG5oIE3hu7ksIFTDom4gQsOsbmgsIEjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2s!4v1552152114933"
              frameBorder={0}
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>
        </div>
        {/* //mail */}
      </div>
    );
  }
}

export default ContactUs;

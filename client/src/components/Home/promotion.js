import React from "react";
const Promotion = () => {
  return (
    <div className="home_promotion">
      <div className="collections-bottom">
        <div className="container">
          <div className="collections-bottom-grids">
            <div
              className="collections-bottom-grid animated wow slideInLeft"
              data-wow-delay=".5s"
            >
              <h3>
                10% cho các <span>Sản phẩm điện tử</span>
              </h3>
            </div>
          </div>
          <div
            className="newsletter animated wow slideInUp"
            data-wow-delay=".5s"
          >
            <h3>Newsletter</h3>
            <p>Đăng ký để nhận tin tức về các khuyến mãi, sản phẩm mới nhất.</p>
            <form>
              <input type="submit" value="Shop Now" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;

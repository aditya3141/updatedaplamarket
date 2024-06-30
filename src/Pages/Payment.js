import React, { useState } from "react";
import Layout from "../Components/Layout/AllLayout";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal } from "antd";
import { BiArrowBack } from "react-icons/bi";

const Payment = () => {
  const [cart, setCart] = useCart();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });

      return total;
    } catch (error) {}
  };

  //handle payments
  const handlePayment = async () => {
    try {
      setVisible(true);
      const { data } = await axios.post("/api/v1/product/payment", {
        cart,
      });

      localStorage.removeItem("cart");
      setCart([]);
    } catch (error) {}
  };
  return (
    <Layout>
      <div>
        {/* payment method section start */}
        <section
          className="payment-method section-lg-b-space"
          style={{ overflowX: "hidden" }}
        >
          <div className="row mt-3 mb-3">
            <NavLink to={"/update-address"} className="col-5">
              <span className="product-back">
                <BiArrowBack />
              </span>
            </NavLink>
            <h2 className="col-7 mt-2">Payment</h2>
          </div>
          <div className="custom-container">
            <h2 className="fw-semibold theme-color section-t-space">Wallet</h2>
            <div className="payment-list">
              <ul className="cart-add-box payment-card-box gap-0 mt-3">
                <li className="w-100">
                  <div className="payment-detail">
                    <label className="form-label">
                      <img
                        className="img-fluid"
                        src="../../images/svg/google.svg"
                        alt="success-payment"
                      />
                      <span>
                        <span className="fw-normal theme-color">
                          Google Pay
                        </span>
                      </span>
                    </label>
                    <div className="form-check">
                      <h5>Comming Soon...</h5>
                    </div>
                  </div>
                </li>
                <li className="w-100">
                  <div className="payment-detail border-bottom-0">
                    <label className="form-label" htmlFor="six">
                      <img
                        className="img-fluid"
                        src="../../images/svg/wallet.svg"
                        alt="success-payment"
                      />
                      <span>
                        <span className="fw-normal theme-color">
                          Cash on Delivery
                        </span>
                      </span>
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        required
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* payment method section end */}
        {/* pay popup start */}
        <div className="pay-popup">
          <div className="price-items">
            <h6>Total price</h6>
            <h2>{totalPrice()} &#8377;</h2>
          </div>
          <button
            className="btn btn-lg theme-btn pay-btn mt-0"
            onClick={handlePayment}
          >
            Pay Now
          </button>
        </div>
        {/* pay popup end */}
        {/* success payment modal start */}
        <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
          <div className="modal-body">
            <div className="confirm-title text-center">
              <img
                className="img-fluid confirm-offer"
                src="../../images/svg/success.gif"
                alt="success-payment"
              />

              <h1 className="theme-color text-center fw-medium mt-2">
                अभिनंदन !!
              </h1>
              <h5 className="light-text fw-normal lh-base text-center w-100 mt-2 mx-auto">
                तुमची ऑर्डर स्वीकारली आहे. तुमचे आयटम मार्गावर आहेत आणि लवकरच
                पोहोचतील.
              </h5>
            </div>
            <NavLink
              to={"/dashboard/user/orders"}
              className="btn theme-btn w-100 mt-4"
              role="button"
            >
              आत्ता ऑर्डर पहा
            </NavLink>
            <NavLink to={"/"} className="btn gray-btn mt-3">
              खरेदी चालू ठेवा
            </NavLink>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default Payment;

import Layout from "../Components/Layout/AllLayout";
import React, { useState } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

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

  const PymentHandle = () => {
    if (totalPrice() < 100) {
      toast.error("किमान ऑर्डर ची मर्यादा 100 रुपये आहे");
    } else {
      navigate("/update-address");
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      toast.success("कार्टमधून आयटम काढले आहे");
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {}
  };
  return (
    <Layout>
      <div>
        {/* cart section start */}
        <section>
          <NavLink to={"/"} className="product-back">
            <span className="product-back position-absolute left-0">
              <BiArrowBack />
            </span>
          </NavLink>
          <h3 className="text-center mb-3 text-warning">
            {cart?.length
              ? `You Have ${cart.length} 
                 items in your cart ${
                   auth?.token ? "" : "please login to checkout"
                 }`
              : ` Your Cart Is Empty `}
          </h3>
          <div className="custom-container">
            <ul className="horizontal-product-list">
              {cart?.map((p) => (
                <li className="cart-product-box" key={p._id}>
                  <div className="horizontal-product-box">
                    <div className="horizontal-product-img">
                      <NavLink to={`/product/${p.slug}`}>
                        <img
                          className="img-fluid img"
                          src={`/api/v1/product/product-photo/${p._id}`}
                          alt="p11"
                        />
                      </NavLink>
                    </div>

                    <div className="horizontal-product-details">
                      <div className="d-flex align-items-center justify-content-between">
                        <a href="product-details.html">
                          <h4>{p.name}</h4>
                        </a>

                        <span
                          className="iconsax trash text-warning fs-5"
                          onClick={() => removeCartItem(p._id)}
                        >
                          <AiOutlineDelete />
                        </span>
                      </div>
                      <ul className="product-info">
                        <li>Qty : 1</li>
                      </ul>
                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <div className="d-flex align-items-center gap-2">
                          <h3 className="fw-semibold">
                            Price : {p.price} &#8377;
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        {/* cart section end */}
        {/* cart bottom start */}

        <section className="bill-details section-b-space">
          <div className="custom-container">
            <div className="total-detail">
              <div className="sub-total d-flex justify-content-between">
                <h5 className="light-text">Sub Total</h5>
                <h4 className="fw-medium">{totalPrice()} &#8377;</h4>
              </div>
              <div className="sub-total mt-3 d-flex justify-content-between">
                <h5 className="light-text">Shipping charge</h5>
                <h4 className="fw-medium">0 &#8377;</h4>
              </div>
              <div className="sub-total mt-3 mb-3 d-flex justify-content-between">
                <h5 className="fw-medium light-text">Discount (10%)</h5>
                <h4 className="fw-medium">0 &#8377;</h4>
              </div>
              <div className="grand-total pt-3 d-flex justify-content-between">
                <h5 className="fw-medium">Grand Total</h5>
                <h4 className="fw-semibold amount">{totalPrice()} &#8377;</h4>
              </div>
            </div>

            <div>
              {auth?.token ? (
                <button className="btn theme-btn w-100" onClick={PymentHandle}>
                  Continue To Payment
                </button>
              ) : (
                <button
                  className="btn theme-btn w-100"
                  onClick={() =>
                    navigate("/login", {
                      state: "/cart",
                    })
                  }
                >
                  Plase Login to checkout
                </button>
              )}
            </div>
          </div>
        </section>

        {/* cart bottom end */}
        {/* panel-space start */}
        <section className="panel-space" />
        {/* panel-space end */}
      </div>
    </Layout>
  );
};

export default CartPage;

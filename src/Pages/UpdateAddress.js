import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import UpdateAddressForm from "../Components/forms/UpdateAddressForm";
import { BiPencil } from "react-icons/bi";
import Layout from "../Components/Layout/AllLayout";
import { useAuth } from "../context/auth";

import { Modal } from "antd";

import { BiArrowBack } from "react-icons/bi";

const UpdateAddress = () => {
  const [auth, setAuth] = useAuth();
  const [visible, setVisible] = useState(false);
  return (
    <Layout>
      {/* shipping details section start */}

      <section className="shipping-details-sec" style={{ overflowX: "hidden" }}>
        <div className="row mt-2 mb-5">
          <NavLink to={"/cart"} className="col-5">
            <span className="product-back">
              <BiArrowBack />
            </span>
          </NavLink>
          <h2 className="text-center">Upadate Address</h2>
        </div>
        <div className="custom-container">
          <ul className="address-list">
            <li>
              <div className="shipping-address">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadio1"
                      id="radio1"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="radio1">
                      My Address
                    </label>
                  </div>
                </div>
                <div className="address-details">
                  <p>{auth.user?.address}</p>
                  <div class="options">
                    <span
                      className="iconsax icons edit-add"
                      onClick={() => setVisible(true)}
                    >
                      <BiPencil />
                    </span>
                  </div>
                  <Modal
                    onCancel={() => setVisible(false)}
                    footer={null}
                    open={visible}
                  >
                    <UpdateAddressForm />
                  </Modal>
                  <h5 className="content-number">
                    Phone no. : <span> {auth.user?.phone}</span>
                  </h5>
                </div>
              </div>
            </li>
          </ul>
          <NavLink to={"/payment"} className="btn theme-btn w-100">
            Continue
          </NavLink>
        </div>
      </section>
      {/* shipping details section end */}
    </Layout>
  );
};

export default UpdateAddress;

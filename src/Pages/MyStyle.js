import React from "react";
import Layout from "../Components/Layout/AllLayout";
import background from "../Components/video/bg video.mp4";
import { NavLink } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const MyStyle = () => {
  return (
    <Layout>
      <section className="banner-wapper">
        <div className="row mt-3 mb-3">
          <NavLink to={"/"} className="col-4">
            <span className="product-back">
              <BiArrowBack />
            </span>
          </NavLink>
          <h2 className="col-8 mt-2">How To Use This App</h2>
        </div>
        <div className="custom-container">
          <div className="banner-bg">
            <div className="overlay img-fluid img-bg"></div>

            <video
              src={background}
              controls
              autoPlay
              className="img-fluid img-bg w-100 "
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MyStyle;

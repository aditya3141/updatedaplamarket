import React, { useState, useEffect } from "react";

import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Layout from "../../Components/Layout/AllLayout";
import { BiShoppingBag, BiSolidHeart } from "react-icons/bi";
import { BiArrowBack } from "react-icons/bi";

const Category = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {}
  };
  return (
    <Layout>
      <div style={{ overflowX: "hidden" }} className="mt-5">
        <div className="row">
          <NavLink to={"/"} className="col-5">
            <span className="product-back">
              <BiArrowBack />
            </span>
          </NavLink>
          <h4 className="text-center">Category - {category?.name}</h4>
          <h6 className="text-center">{products?.length} result found </h6>
        </div>

        <div className="row g-4 mt-3">
          {products?.map((p) => (
            <div className="col-6" key={p._id}>
              <div className="product-box">
                <div className="product-box-img">
                  <NavLink to={`/product/${p.slug}`}>
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                  </NavLink>
                  <div className="cart-box">
                    <NavLink className="text-warning">
                      <BiShoppingBag />
                    </NavLink>
                  </div>
                </div>
                <div className="like-btn ">
                  <div className="text-danger">
                    <BiSolidHeart />
                  </div>
                  <div className="effect-group">
                    <span className="effect" />
                    <span className="effect" />
                    <span className="effect" />
                    <span className="effect" />
                    <span className="effect" />
                  </div>
                </div>
                <div className="product-box-detail">
                  <h4>{p.name}</h4>
                  <h5>{p.description}</h5>
                  <div className="bottom-panel">
                    {/* <h5>{p.description.substring(0, 30)}...</h5> */}
                    <h3 className="price ">
                      {p.price}
                      <span className="fs-7">&#8377;</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Category;

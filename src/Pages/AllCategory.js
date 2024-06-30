import Layout from "../Components/Layout/AllLayout.js";
import React from "react";
import useCategory from "../hooks/useCategory.js";
import { NavLink } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const AllCategory = () => {
  const categories = useCategory();

  return (
    <Layout>
      {/* Categories section start */}

      <section style={{ overflowX: "hidden" }}>
        <div className="row mt-1 mb-4">
          <NavLink to={"/"} className="col-5">
            <span className="product-back">
              <BiArrowBack />
            </span>
          </NavLink>
          <h2 className="col-6">Category</h2>
        </div>
        <div className="custom-container">
          {categories?.map((c) => (
            <ul className="categories-list" key={c._id}>
              <li className="mt-0 mb-3 p-1">
                <NavLink
                  to={`/category/${c.slug}`}
                  className="d-flex align-items-center"
                >
                  <div className="p-2 ">
                    <h2>{c.name}</h2>
                    <h4 className="mt-1">{">>>>>>>"}</h4>
                  </div>
                  <div className="categories-img"></div>
                </NavLink>
              </li>
            </ul>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default AllCategory;

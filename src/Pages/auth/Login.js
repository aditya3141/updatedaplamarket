import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";
import Layout from "../../Components/Layout/AllLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  // form fn

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("तुम्ही काही तरी चुकत आहात !");
    }
  };
  return (
    <Layout>
      <div className="auth-body container">
        <br />
        <div className="text-warning fs-6 fw-bold text-center">
          आपलं मार्केट ॲप वर आपलंं स्वागत आहे
        </div>
        <br />
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="custom-container">
            <div className="form-group">
              <label className="form-label">Email id</label>
              <div className="form-input mb-4">
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  placeholder="तुमचा ईमेल टाका"
                  required
                />
                <i className="iconsax icons" data-icon="mail" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="form-input">
                <input
                  type="text"
                  className="form-control"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  id="password"
                  placeholder="तुमचा पासवर्ड टाका"
                  required
                />
                <i className="iconsax icons" data-icon="key" />
              </div>
              <div className="contact-btn">
                <button type="submit" className="btn auth-btn w-100">
                  Login
                </button>
                <button
                  type="submit"
                  className="btn btn-secondary w-100"
                  onClick={() => {
                    navigate("/forgot-Password/");
                  }}
                >
                  Forget Password
                </button>
                <br />
              </div>
              <div className="division">
                <span>OR</span>
              </div>
              <h4 className="signup pt-0">
                <NavLink to="/register/"> Create a Account</NavLink> To
                Aapla-Market
              </h4>
            </div>
            ;
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;

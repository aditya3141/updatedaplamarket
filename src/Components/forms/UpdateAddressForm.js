import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import axios from "axios";

const UpdateAddressForm = () => {
  const [auth, setAuth] = useAuth();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const { address, phone, name } = auth?.user;
    setName(name);
    setAddress(address);
    setPhone(phone);
  }, [auth?.user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "https://backend-market-1bby.onrender.com/api/v1/auth/update-address",
        {
          name,
          address,
          phone,
        }
      );

      if (data.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
  return (
    <section className="section-b-space p-5">
      <div className="custom-container">
        <form className="address-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Update Profile</label>
            <div className="form-input mb-3">
              <input
                type="text"
                className="form-control"
                value={name}
                id="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Update Your Name"
                required
                autoFocus
              />
            </div>
            <div className="form-input mb-3">
              <input
                type="text"
                className="form-control"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                id="address"
                placeholder="Update Address"
                required
              />
            </div>
            <div className="form-input mb-3">
              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                id="mobile"
                placeholder="Update Your Mobile No."
                required
              />
            </div>
            <button type="submit" className="btn btn-secondary">
              Update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default UpdateAddressForm;

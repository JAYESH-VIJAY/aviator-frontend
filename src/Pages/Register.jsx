import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #012348;
  height: 100vh;
`;

const Register = () => {
  const [termsChecked, setTermsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setTermsChecked(!termsChecked);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Wrapper className="active" id="via-email">
      <form
        className="register-form row w-75"
        onSubmit={handleSubmit((data) => console.log(data))}
        style={{ color: "white" }}
      >
        <h2>Register</h2>

        {/* Name Field */}
        <div className="col-md-6 col-12">
          <div className="input-group flex-nowrap mb-3 promocode align-items-center">
            <span className="input-group-text" id="addon-wrapping">
              <span className="material-symbols-outlined bold-icon">badge</span>
            </span>
            <input
              required
              type="text"
              className="form-control ps-0"
              id="name"
              placeholder="Name"
              name="name"
              {...register("name")}
            />
          </div>
        </div>

        {/* Gender Field */}
        <div className="col-md-6 col-12">
          <div className="input-group flex-nowrap mb-3 promocode align-items-center">
            <span className="input-group-text" id="addon-wrapping">
              <span className="material-symbols-outlined bold-icon">male</span>
            </span>
            <select
              required
              className="form-select custom-select"
              id="gender"
              name="gender"
              {...register("gender")}
            >
              <option value="" style={{ color: "black" }}>
                Select Gender
              </option>
              <option value="male" style={{ color: "black" }}>
                Male
              </option>
              <option value="female" style={{ color: "black" }}>
                Female
              </option>
            </select>
          </div>
        </div>

        {/* Mobile Field */}
        <div className="col-12">
          <div className="input-group flex-nowrap mb-3 promocode align-items-center">
            <span className="input-group-text" id="addon-wrapping">
              <span className="material-symbols-outlined bold-icon">
                smartphone
              </span>
            </span>
            <input
              required
              type="text"
              className="form-control ps-0"
              id="mobile"
              placeholder="Mobile"
              name="mobile"
              {...register("mobile")}
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="col-12">
          <div className="input-group flex-nowrap mb-3 promocode align-items-center">
            <span className="input-group-text" id="addon-wrapping">
              <span className="material-symbols-outlined bold-icon">mail</span>
            </span>
            <input
              required
              type="email"
              className="form-control ps-0"
              id="reg_email"
              placeholder="Email"
              name="email"
              {...register("email")}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="col-12">
          <div className="input-group flex-nowrap mb-3 promocode align-items-center">
            <span className="input-group-text" id="addon-wrapping">
              <span className="material-symbols-outlined bold-icon">lock</span>
            </span>
            <input
              required
              type="password"
              className="form-control ps-0"
              id="regpassword"
              placeholder="Password"
              name="password"
              {...register("password")}
            />
            <span
              className="material-symbols-outlined input-ico"
              id="view_password_register"
            >
              visibility_off
            </span>
          </div>
        </div>

        {/* Promocode Field */}
        <div className="col-12">
          <div className="input-group flex-nowrap mb-3 promocode align-items-center">
            <span className="input-group-text" id="addon-wrapping">
              <span className="material-symbols-outlined bold-icon">
                settings
              </span>
            </span>
            <input
              type="text"
              className="form-control ps-0"
              id="promo_code"
              name="promocode"
              placeholder="Enter Promocode"
              {...register("promocode")}
            />
          </div>
        </div>

        {/* Email Policy Checkbox */}
        <div className="col-12">
          <div className="checks-bg">
            <div
              className="pretty"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="state"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  required
                  type="checkbox"
                  name="terms"
                  {...register("terms")}
                  checked={termsChecked}
                  onClick={handleCheckboxChange}
                  style={{ width: "16px", height: "16px" }}
                />
                <label >
                  I confirm that I am of legal age and agree with the{" "}
                  <Link href="/">site rules</Link>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn orange-btn md-btn custm-btn-2 mx-auto mt-3 mb-0 registerSubmit"
          id="register_via_email"
        >
          START GAME
        </button>
      </form>
    </Wrapper>
  );
};

export default Register;

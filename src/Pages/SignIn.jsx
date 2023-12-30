import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Modal from "react-modal";
const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #012348;
  height: 100vh;
`;
export default function SignIn() {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your password recovery logic here
  };

  return (
    <Wrapper className="active" id="via-email">
      <form className="register-form row w-75" style={{ color: "white" }}>
        <h2>Login</h2>

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
            />
            <span
              className="material-symbols-outlined input-ico"
              id="view_password_register"
            >
              visibility_off
            </span>
          </div>
        </div>
        {/* forgot password */}
        <div className="col-12 mb-2">
          <div className="checks-bg">
            <div
              className="pretty p-svg"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="state" style={{ marginLeft: "-20px" }}>
                <label>
                  Forgot Your Password?{" "}
                  <span className="text-white" onClick={openModal}>
                    Click Here
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* ForgotPasswordModal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <div >
            <div >
              <div className="modal-content">
                <div className="modal-header login-header">
                  <span className="material-symbols-outlined">lock</span>
                  <h5 className="modal-title" id="exampleModalLabel">
                    PASSWORD RECOVERY
                  </h5>
                </div>
                <div className="mx-4 modal-body pt-0">
                  <label id="registerError" className="error"></label>
                  <p className="link-text f-14 email_text text-white">
                    To recover your password, enter your email or phone number
                    used during registration
                  </p>
                  <form
                    className="login-form"
                    onSubmit={handleSubmit}
                    id="forgotPasswordForm"
                  >
                    <div className="login-controls">
                      <label htmlFor="Username">
                        <input
                          type="text"
                          className="form-control text-indent-0"
                          id="user_name"
                          placeholder="Your email/phone"
                          name="username"
                          required
                        />
                      </label>
                    </div>
                    <div className="login-controls" id="otp_div">
                      <label htmlFor="otp">
                        <input
                          type="text"
                          className="form-control text-indent-0"
                          id="otp"
                          placeholder="Verification Code"
                          name="otp"
                        />
                      </label>
                    </div>
                    <div>
                      <label id="otp_error" className="error"></label>
                    </div>
                    <button
                      className="btn green-btn md-btn custm-btn-2 mx-auto mt-3 mb-3 w-100"
                      id="processSubmit"
                    >
                      PROCEED
                    </button>
                    <div
                      className="text-white cursor-pointer f-14 mb-2 d-flex justify-content-center"
                      onClick={closeModal}
                      style={{cursor:"pointer"}}
                    >
                      Cancel
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* for register */}
        <div className="col-12">
          <div className="checks-bg">
            <div
              className="pretty p-svg"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="state" style={{ marginLeft: "-20px" }}>
                <label>
                  Not registered yet? <Link to="/auth/register">Register</Link>
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
          Login
        </button>
      </form>
    </Wrapper>
  );
}

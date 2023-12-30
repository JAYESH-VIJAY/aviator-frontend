import React, { useState } from "react";
import { useBetContext } from "./ContextAndHooks/BetContext";
import Register from "./Pages/Register";
import { NavLink } from "react-router-dom";
const HeaderTop = () => {
  const { isLogin } = useBetContext().state;

  return (
    <div className="header-top">
      <div className="header-left">
        <a href="dashboard">
          <img src="images/logo.png" alt="Logo" className="logo1" />
        </a>
      </div>
      {!isLogin && (
        <div className="header-right d-flex align-items-center">
          <NavLink
            to="/auth/register"
            className="register-btn rounded-pill d-flex align-items-center me-2 reg_btn"
          >
            Register
          </NavLink>
          <NavLink
            className="login-btn rounded-pill d-flex align-items-center me-2"
            id="login"
            to="/auth/Login"
          >
            Login
          </NavLink>
        </div>
      )}
      {isLogin && (
        <div className="header-right d-flex align-items-center">
          <a href="/deposit">
            <button className="deposite-btn rounded-pill d-flex align-items-center me-2">
              <span className="material-symbols-outlined me-2"> payments </span>
              {/* <span>$</span> */}
              <span className="me-2" id="header_wallet_balance">
                ₹250{/* Render wallet balance dynamically here */}
              </span>
              DEPOSIT
            </button>
          </a>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-transparent dropdown-toggle p-0 d-flex align-items-center justify-content-center caret-none"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="material-symbols-outlined f-24 menu-icon text-white">
                menu
              </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark profile-dropdown p-0">
              <li className="profile-head d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  {/* You can render user image dynamically */}
                  <img
                    src="{{user('image')}}"
                    alt="User Avatar"
                    className="avtar-ico"
                    id="avatar_img"
                  />
                  <div>
                    <div className="profile-name mb-1">
                      {/* Render user email dynamically */}
                    </div>
                    <div className="profile-name" id="username">
                      {/* Render user ID dynamically */}
                    </div>
                  </div>
                </div>
              </li>
              {/* ... Other list items */}
              <li className="divider"> </li>
              {/* ... Additional list items */}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderTop;

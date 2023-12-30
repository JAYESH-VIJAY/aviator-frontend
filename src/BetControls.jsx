import React, { memo, useMemo, useCallback, useState } from "react";
import { useBetContext } from "./ContextAndHooks/BetContext";
import Modal from "react-modal";
const BetControls = memo(() => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: "10000",
    },
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const [betType1, setBetType1] = useState(0); // 0 for "Bet", 1 for "Auto"
  const [betType2, setBetType2] = useState(0); // 0 for "Bet", 1 for "Auto"
  const { state: oldState, dispatch: oldDispatch } = useBetContext();
  const state = useMemo(() => oldState, [oldState]);
  // Memoize the dispatch function using useCallback
  const dispatch = useCallback(oldDispatch, [oldDispatch]);
  console.log(state);
  const {
    extraBetAmount1,
    extraBetAmount2,
    gameStarted,
    withdrawn1,
    withdrawn2,
    isBet1,
    isBet2,
  } = state;
  const handleBetTypeChange = (type) => {
    setBetType1(type);
  };
  const handleBetTypeChange2 = (type) => {
    setBetType2(type);
  };

  const bet_amount_decremental1 = useCallback(
    (isExtra) => {
      if (isExtra) {
        dispatch({ type: "decExtra1" });
      } else {
        dispatch({ type: "decExtra2" });
      }
    },
    [dispatch]
  );

  const bet_amount_incremental1 = useCallback(
    (isExtra) => {
      if (isExtra) {
        dispatch({ type: "incExtra1" });
      } else {
        dispatch({ type: "incExtra2" });
      }
    },
    [dispatch]
  );

  const select_direct_bet_amount1 = useCallback(
    (amount, isExtra) => {
      if (isExtra) {
        dispatch({ type: "incExtra1", payload: amount });
      } else {
        dispatch({ type: "incExtra2", payload: amount });
      }
    },
    [dispatch]
  );

  const bet_now1 = useCallback(
    (isExtra) => {
      if (!gameStarted || withdrawn1 || isExtra) {
        alert("Game has already started or bet has been withdrawn.");
        return;
      }

      // const betAmount = isExtra ? extraBetAmount1 : mainBetAmount1;
      // alert(`Betting now: ${betAmount}`);
      // Add your logic for placing the bet with the selected amount
    },
    [dispatch]
  );

  const cancle_now1 = useCallback(
    (isExtra) => {
      if (gameStarted || withdrawn1) {
        alert("Game has already started or bet has been withdrawn.");
        return;
      }

      // alert(`Cancelling now: ${isExtra ? "Extra Bet" : "Main Bet"}`);
      // Add your logic for canceling the bet
    },
    [dispatch]
  );

  const cash_out_now1 = useCallback(
    (isExtra) => {
      if (!gameStarted && (isExtra ? withdrawn1 : withdrawn2)) {
        alert(
          `Game hasn't started or bet has already been withdrawn for Bet ${
            isExtra ? 1 : 2
          }.`
        );
        return;
      }

      // alert(`Withdrawing now from Bet ${isExtra ? 1 : 2}`);
      // dispatch({ type: isExtra ? "withdrawn1" : "withdrawn2" });

      // Add your logic for cashing out the bet
    },
    [dispatch]
  );

  const main_incrementor_change1 = useCallback(
    (value) => {
      alert(`Main Incrementor Change: ${value}`);
      // Add your logic for main_incrementor_change
    },
    [dispatch]
  );

  const extra_incrementor_change1 = useCallback(
    (value) => {
      alert(`Extra Incrementor Change: ${value}`);
      // Add your logic for extra_incrementor_change
    },
    [dispatch]
  );

  return (
    <div className="bet-controls">
      <div className="bet-control double-bet" id="main_bet_section">
        <div className="controls">
          <div className="navigation">
            <input id="bet_type" type="hidden" value="0" />
            <div className="navigation-switcher">
              <div
                className={`slider bet-btn ${betType1 === 0 ? "active" : ""}`}
                onClick={() => handleBetTypeChange(0)}
              >
                Bet
              </div>
              <div
                className={`slider auto-btn ${betType1 === 1 ? "active" : ""}`}
                onClick={() => handleBetTypeChange(1)}
              >
                Auto
              </div>
              <span className="active-line"></span>
            </div>
          </div>
          <div className="first-row auto-game-feature">
            <div className="bet-block">
              <div className="spinner">
                <div className="input">
                  <input
                    id="bet_amount"
                    value={extraBetAmount1}
                    type="text"
                    className="main_bet_amount"
                    onChange={(e) => {
                      // Remove non-numeric characters and validate as a number
                      const value = e.target.value.replace(/[^0-9.]/g, "");
                      // Check if the value is a valid number
                      const parsedValue = parseFloat(value);
                      // Update state only if the input is a valid number
                      if (!isNaN(parsedValue)) {
                        dispatch({ type: "incExtra1", payload: parsedValue });
                      } else dispatch({ type: "incExtra1", payload: 10.0 });
                    }}
                  />
                </div>
                <div className="qty-buttons">
                  <button
                    className="minus "
                    id="main_minus_btn"
                    onClick={() => bet_amount_decremental1(true)}
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <button
                    className="plus"
                    id="main_plus_btn"
                    onClick={() => bet_amount_incremental1(true)}
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>
              <div className="bets-opt-list">
                <button
                  className="btn btn-secondary btn-sm bet-opt main_amount_btn"
                  onClick={() => select_direct_bet_amount1(100, true)}
                >
                  <span className="amt">100</span>
                  <span className="currency">₹</span>
                </button>
                <button
                  className="btn btn-secondary btn-sm bet-opt main_amount_btn"
                  onClick={() => select_direct_bet_amount1(200, true)}
                >
                  <span className="amt">200</span>
                  <span className="currency">₹</span>
                </button>
                <button
                  className="btn btn-secondary btn-sm bet-opt main_amount_btn"
                  onClick={() => select_direct_bet_amount1(500, true)}
                >
                  <span className="amt">500</span>
                  <span className="currency">₹</span>
                </button>
                <button
                  className="btn btn-secondary btn-sm bet-opt main_amount_btn"
                  onClick={() => select_direct_bet_amount1(1000, true)}
                >
                  <span className="amt">1000</span>
                  <span className="currency">₹</span>
                </button>
              </div>
            </div>
            {!isBet1 && (
              <div className="buttons-block" id="bet_button">
                <button
                  className="btn btn-success bet font-family-title ng-star-inserted main_bet_btn"
                  id="extra_bet_now"
                  onClick={() => bet_now1(true)}
                >
                  <label className="font-family-title label">BET</label>
                </button>
              </div>
            )}

            <div
              className="buttons-block"
              id="cancle_button"
              style={{ display: "none" }}
            >
              <div
                className="btn-tooltip f-14 mb-1"
                id="waiting"
                style={{ display: "none" }}
              >
                Waiting for next round
              </div>
              <button
                className="btn btn-danger bet font-family-title height-70 ng-star-inserted main_bet_btn"
                id="extra_cancel_now"
                onClick={() => cancel_now1(true)}
              >
                <label className="font-family-title label">CANCEL</label>
              </button>
            </div>
            <div
              className="buttons-block"
              id="cashout_button"
              style={{ display: "none" }}
            >
              <input type="hidden" name="main_bet_id" id="main_bet_id" />
              <button
                className="btn btn-warning bet font-family-title ng-star-inserted"
                onClick={() => cash_out_now1(true)}
              >
                <label className="font-family-title label">CASH OUT</label>
                <div
                  className="font-family-title label"
                  id="cash_out_amount"
                ></div>
              </button>
            </div>
          </div>
          <div className={`text-white ${betType1 == 0 ? "second-row" : ""}`}>
            <div className=" m-0">
              <div className="d-flex mt-1 mb-1">
                <div
                  className=" d-flex align-items-center"
                  style={{
                    padding: "2px 32px",
                    borderRadius: "30px",
                    backgroundColor: "#1d7aca",
                  }}
                  onClick={openModal}
                >
                  Auto Play
                </div>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={customStyles}
                >
                  <div>
                    <div>
                      <div className="modal-content">
                        <div className="modal-header login-header">
                          <span className="material-symbols-outlined">
                            lock
                          </span>
                          <h5 className="modal-title" id="exampleModalLabel">
                            Auto Play Options:
                          </h5>
                        </div>
                        <div className="mx-4 modal-body pt-0">
                          <label id="registerError" className="error"></label>
                          <p className="link-text f-14 email_text text-white">
                            Select Below Options for auto play
                          </p>
                          <form className="login-form" id="forgotPasswordForm">
                            <div className="content">
                              <div
                                className="content-part content-part-1 d-flex gap-4 "
                                style={{
                                  alignItems: "Center",
                                  justifyContent: "center",
                                }}
                              >
                                <div className="rounds-wrap">
                                  <div
                                    className="d-flex gap-2"
                                    style={{
                                      alignItems: "Center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <span className="fw-bold f-16 ">
                                      Number of rounds:
                                    </span>
                                    <div
                                      className="btn-group"
                                      role="group"
                                      aria-label="Number of Rounds"
                                    >
                                      <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                      >
                                        10
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                      >
                                        20
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                      >
                                        50
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-outline-secondary active"
                                      >
                                        100
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center auto-cashout-line">
                                  <span className="me-2 fw-bold">
                                    Auto Cash Out:
                                  </span>
                                  <div className="spinner small ">
                                    <div className="input d-flex ">
                                      <input
                                        type="text"
                                        onInput={(e) =>
                                          (e.target.value =
                                            e.target.value.replace(
                                              /[^\d^.]/g,
                                              ""
                                            ))
                                        }
                                        className="form-control font-weight-bold"
                                      />
                                      <span className="text mx-2">×</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
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
                              style={{ cursor: "pointer" }}
                            >
                              Cancel
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
                <div style={{ display: "flex", gap: "24px" }}>
                  <div className=" text-white form-check form-switch lg-switch d-flex align-items-center">
                    <label
                      className="form-check-label f-12 me-1"
                      htmlFor="cashout"
                    >
                      Auto Cash Out
                    </label>
                    <input
                      className="form-check-input m-0"
                      type="checkbox"
                      role="cashout"
                      id="main_checkout"
                    />
                  </div>
                  <div
                    className="spinner small"
                    style={{ maxWidth: "100px", height: "24px" }}
                  >
                    <div className="input full-width">
                      <input
                        className="f-16 font-weight-bold"
                        disabled
                        type="text"
                        value="1.01"
                        id="main_incrementor"
                        onChange={(e) =>
                          main_incrementor_change1(e.target.value)
                        }
                      />
                      <div className="text text-x">
                        <span className="material-symbols-outlined">close</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bet-control double-bet" id="extra_bet_section">
        <div className="controls">
          <div className="bet-box-action" id="remove_extra_section_btn">
            <span className="material-symbols-outlined">do_not_disturb_on</span>
          </div>
          <div className="navigation">
            <input id="bet_type" type="hidden" value="0" />
            <div className="navigation-switcher">
              <div
                className={`slider bet-btn ${betType2 === 0 ? "active" : ""}`}
                onClick={() => handleBetTypeChange2(0)}
              >
                Bet
              </div>
              <div
                className={`slider auto-btn ${betType2 === 1 ? "active" : ""}`}
                onClick={() => handleBetTypeChange2(1)}
              >
                Auto
              </div>
              <span className="active-line"></span>
            </div>
          </div>
          <div className="first-row auto-game-feature">
            <div className="bet-block">
              <div className="spinner">
                <div className="input">
                  <input
                    id="bet_amount"
                    value={extraBetAmount2}
                    className="extra_bet_amount"
                    onChange={(e) => {
                      // Remove non-numeric characters and validate as a number
                      const value = e.target.value.replace(/[^0-9.]/g, "");

                      // Check if the value is a valid number
                      const parsedValue = parseFloat(value);

                      // Update state only if the input is a valid number
                      if (!isNaN(parsedValue)) {
                        dispatch({ type: "incExtra2", payload: parsedValue });
                      } else dispatch({ type: "incExtra2", payload: 10.0 });
                    }}
                  />
                </div>
                <div className="qty-buttons">
                  <button
                    className="minus"
                    id="extra_minus_btn"
                    onClick={() => bet_amount_decremental1(false)}
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <button
                    className="plus"
                    id="extra_plus_btn"
                    onClick={() => bet_amount_incremental1(false)}
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>
              <div className="bets-opt-list">
                <button
                  className="btn btn-secondary btn-sm bet-opt extra_amount_btn"
                  onClick={() => select_direct_bet_amount1(100, false)}
                >
                  <span className="amt">100</span>
                  <span className="currency">₹</span>
                </button>
                <button
                  className="btn btn-secondary btn-sm bet-opt extra_amount_btn"
                  onClick={() => select_direct_bet_amount1(200, false)}
                >
                  <span className="amt">200</span>
                  <span className="currency">₹</span>
                </button>
                <button
                  className="btn btn-secondary btn-sm bet-opt extra_amount_btn"
                  onClick={() => select_direct_bet_amount1(500, false)}
                >
                  <span className="amt">500</span>
                  <span className="currency">₹</span>
                </button>
                <button
                  className="btn btn-secondary btn-sm bet-opt extra_amount_btn"
                  onClick={() => select_direct_bet_amount1(1000, false)}
                >
                  <span className="amt">1000</span>
                  <span className="currency">₹</span>
                </button>
              </div>
            </div>
            <div className="buttons-block" id="bet_button">
              <button
                className="btn btn-success bet font-family-title ng-star-inserted main_bet_btn"
                id="extra_bet_now"
                onClick={() => bet_now1(false)}
              >
                <label className="font-family-title label">BET</label>
              </button>
            </div>
            <div
              className="buttons-block"
              id="cancle_button"
              style={{ display: "none" }}
            >
              <div
                className="btn-tooltip f-14 mb-1"
                id="waiting"
                style={{ display: "none" }}
              >
                Waiting for next round
              </div>
              <button
                className="btn btn-danger bet font-family-title height-70 ng-star-inserted main_bet_btn"
                id="extra_cancel_now"
                onClick={() => cancle_now1(false)}
              >
                <label className="font-family-title label">CANCEL</label>
              </button>
            </div>
            <div
              className="buttons-block"
              id="cashout_button"
              style={{ display: "none" }}
            >
              <input type="hidden" name="extra_bet_id" id="extra_bet_id" />
              <button
                className="btn btn-warning bet font-family-title ng-star-inserted"
                onClick={cash_out_now1}
              >
                <label className="font-family-title label">CASH OUT</label>
                <div
                  className="font-family-title label"
                  id="cash_out_amount"
                ></div>
              </button>
            </div>
          </div>
          <div className="second-row">
            <div className="cashout-block m-0">
              <div className="cash-out-switcher">
                <div className="form-check form-switch lg-switch d-flex align-items-center pe-5">
                  <label className="form-check-label f-12 me-1" htmlFor="bet">
                    Auto Bet
                  </label>
                  <input
                    className="form-check-input m-0"
                    type="checkbox"
                    role="bet"
                    id="extra_auto_bet"
                  />
                </div>
                <div className="form-check form-switch lg-switch d-flex align-items-center">
                  <label
                    className="form-check-label f-12 me-1"
                    htmlFor="cashout"
                  >
                    Auto Cash Out
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="cashout"
                    id="extra_checkout"
                  />
                </div>
              </div>
              <div className="cashout-spinner-wrapper">
                <div className="cashout-spinner disabled">
                  <div className="spinner small">
                    <div className="input full-width">
                      <input
                        className="f-16 font-weight-bold"
                        type="text"
                        disabled
                        value="1.01"
                        id="extra_incrementor"
                        onChange={(e) =>
                          extra_incrementor_change1(e.target.value)
                        }
                      />
                    </div>
                    <div className="text text-x">
                      <span className="material-symbols-outlined">close</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default BetControls;

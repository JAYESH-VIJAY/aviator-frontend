import { memo, useMemo, useCallback, useState, useEffect } from "react";
import { useBetContext } from "./ContextAndHooks/BetContext";
import Modal from "react-modal";
import { FaRegPlayCircle } from "react-icons/fa";
import { toast } from "react-toastify";
const BetControls = memo(() => {
  return (
    <div className="bet-controls">
      <BetButtons id={1} />
      <BetButtons id={2} />
    </div>
  );
});

export default BetControls;

function BetButtons({ id }) {
  //0 normal bet and 1 for auto bet
  const [betType, setBetType] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [cashDecrease, setCashDecrease] = useState(0);
  const [cashIncrease, setCashIncrease] = useState(0);
  const [autoCashOut, setAutoCashOut] = useState(false);
  const [rounds, setRounds] = useState(10);
  const [activeRound, setActiveRound] = useState(0);
  const [autoCashOutValue, setAutoCashOutValue] = useState("2");
  useEffect(() => {
    const AutoCashOut = (id) => {
      if (id === 1) {
        dispatch({ type: "autoCashOut1", payload: autoCashOut });
      } else dispatch({ type: "autoCashOut2", payload: autoCashOut });
    };
  }, [autoCashOut]);

  const { state, dispatch } = useBetContext();
  const {
    extraBetAmount1,
    extraBetAmount2,
    gameStarted,
    withdrawn1,
    withdrawn2,
    isBet1,
    isBet2,
    autoCashOut1,
    autoCashOut2,
  } = state;
  const autoCashOutHandler = (e) => {
    setAutoCashOut(!autoCashOut);
  };

  const handleDecreaseChange = (value) => {
    // You can add validation or other logic here if needed
    setCashDecrease(value);
  };
  const handleIncreaseChange = (value) => {
    // You can add validation or other logic here if needed
    setCashIncrease(value);
  };
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function handleStart(e) {
    e.preventDefault();
    console.log("hi");
  }
  const handleBetTypeChange = (type) => {
    setBetType(type);
  };

  const bet_amount_decremental = useCallback(
    (id) => {
      if (id === 1) {
        dispatch({ type: "decExtra1" });
      } else {
        dispatch({ type: "decExtra2" });
      }
    },
    [dispatch]
  );

  const bet_amount_incremental = useCallback(
    (id) => {
      if (id === 1) {
        dispatch({ type: "incExtra1" });
      } else {
        dispatch({ type: "incExtra2" });
      }
    },
    [dispatch]
  );

  const select_direct_bet_amount = useCallback(
    (amount, id) => {
      if (id === 1) {
        dispatch({ type: "incExtra1", payload: amount });
      } else {
        dispatch({ type: "incExtra2", payload: amount });
      }
    },
    [dispatch]
  );

  const bet_now = useCallback(
    (id) => {
      if (!gameStarted || withdrawn1 || id === 1) {
        alert("Game has already started or bet has been withdrawn.");
        return;
      }

      // const betAmount = isExtra ? extraBetAmount1 : mainBetAmount1;
      // alert(`Betting now: ${betAmount}`);
      // Add your logic for placing the bet with the selected amount
    },
    [dispatch]
  );

  const cancle_now = useCallback(
    (id) => {
      if (gameStarted || withdrawn1) {
        alert("Game has already started or bet has been withdrawn.");
        return;
      }

      // alert(`Cancelling now: ${isExtra ? "Extra Bet" : "Main Bet"}`);
      // Add your logic for canceling the bet
    },
    [dispatch]
  );

  const cash_out_now = useCallback(
    (id) => {
      if (!gameStarted && (id === 1 ? withdrawn1 : withdrawn2)) {
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

  const main_incrementor_change = useCallback(
    (value, id) => {
      if (id === 1) {
        dispatch({ type: "autoCashOut1", payload: value });
      } else {
        dispatch({ type: "autoCashOut2", payload: value });
      }
      // Add your logic for main_incrementor_change
    },
    [dispatch]
  );

  const extra_incrementor_change = useCallback(
    (value) => {
      alert(`Extra Incrementor Change: ${value}`);
      // Add your logic for extra_incrementor_change
    },
    [dispatch]
  );
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
  return (
    <div className="bet-control double-bet" id="extra_bet_section">
      <div className="controls">
        <div className="navigation">
          <div className="navigation-switcher">
            <div
              className={`slider bet-btn ${betType === 0 ? "active" : ""}`}
              onClick={() => handleBetTypeChange(0)}
            >
              Bet
            </div>
            <div
              className={`slider auto-btn ${betType === 1 ? "active" : ""}`}
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
                  value={id === 1 ? extraBetAmount1 : extraBetAmount2}
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
                  onClick={() => bet_amount_decremental(id)}
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <button
                  className="plus"
                  id="extra_plus_btn"
                  onClick={() => bet_amount_incremental(id)}
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
            <div className="bets-opt-list">
              <button
                className="btn btn-secondary btn-sm bet-opt extra_amount_btn"
                onClick={() => select_direct_bet_amount(100, id)}
              >
                <span className="amt">100</span>
                <span className="currency">₹</span>
              </button>
              <button
                className="btn btn-secondary btn-sm bet-opt extra_amount_btn"
                onClick={() => select_direct_bet_amount(200, id)}
              >
                <span className="amt">200</span>
                <span className="currency">₹</span>
              </button>
              <button
                className="btn btn-secondary btn-sm bet-opt extra_amount_btn"
                onClick={() => select_direct_bet_amount(500, id)}
              >
                <span className="amt">500</span>
                <span className="currency">₹</span>
              </button>
              <button
                className="btn btn-secondary btn-sm bet-opt extra_amount_btn"
                onClick={() => select_direct_bet_amount(1000, id)}
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
              onClick={() => bet_now(id)}
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
              onClick={() => cancle_now(id)}
            >
              <label className="font-family-title label">CANCEL</label>
            </button>
          </div>
          <div
            className="buttons-block"
            id="cashout_button"
            style={{ display: "none" }}
          >
            <button
              className="btn btn-warning bet font-family-title ng-star-inserted"
              onClick={cash_out_now(id)}
            >
              <label className="font-family-title label">CASH OUT</label>
              <div
                className="font-family-title label"
                id="cash_out_amount"
              ></div>
            </button>
          </div>
        </div>
        <div className={`text-white ${betType == 0 ? "second-row" : ""}`}>
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
                        <FaRegPlayCircle className="material-symbols-outlined" />
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
                              <div className="">
                                <div
                                  className=" gap-2"
                                  style={{
                                    alignItems: "Center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <span className="fw-bold f-16 mx-2 ">
                                    Number of rounds:
                                  </span>
                                  <div
                                    className="btn-group"
                                    role="group"
                                    aria-label="Number of Rounds"
                                  >
                                    {[10, 20, 50, 100].map((value, index) => (
                                      <input
                                        type="button"
                                        key={value}
                                        className={`btn btn-outline-secondary ${
                                          index === activeRound ? "active" : ""
                                        }`}
                                        value={value}
                                        onClick={() => {
                                          setRounds(value);
                                          setActiveRound(index);
                                        }}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex align-items-center auto-cashout-line">
                                <span className="me-2 fw-bold f-16">
                                  Auto Cash Out:
                                </span>
                                <div className="d-flex gap-4 align-items-center flex-wrap">
                                  <div className=" text-white form-check form-switch lg-switch d-flex align-items-center">
                                    <input
                                      className="form-check-input m-0"
                                      type="checkbox"
                                      role="cashout"
                                      id="main_checkout"
                                      onChange={autoCashOutHandler}
                                      checked={autoCashOut}
                                    />
                                  </div>
                                  <div
                                    className="spinner small"
                                    style={{ maxWidth: "100px" }}
                                  >
                                    <div className="input d-flex ">
                                      <input
                                        type="text"
                                        title="value can't be less than 1.5"
                                        required={autoCashOut}
                                        value={autoCashOutValue}
                                        onChange={(e) => {
                                          e.preventDefault();
                                          let inputValue = e.target.value;
                                          inputValue = inputValue.replace(
                                            /[^\d.]/g,
                                            ""
                                          );
                                          const inputLength = inputValue.length;

                                          if (
                                            inputLength > 2 &&
                                            parseFloat(inputValue) < 1.5
                                          ) {
                                            inputValue = "2";
                                          } else if (
                                            parseFloat(inputValue) === 1.0
                                          ) {
                                            toast.error(
                                              "AutoCashOut Value must be greater then 1.5"
                                            );
                                          }

                                          setAutoCashOutValue(inputValue);
                                        }}
                                        className="form-control font-weight-bold"
                                      />

                                      <span
                                        className="material-symbols-outlined font-weight-bold"
                                        style={{
                                          position: "absolute",
                                          right: "10px",
                                          color: "#868e96",
                                        }}
                                      >
                                        close
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: "16px",
                            }}
                          >
                            <div>
                              <span className="title text-left pl-1 mr-auto disabled fw-bold f-16">
                                Stop if cash decreases by
                              </span>
                              <div className="spinner  mt-2">
                                <button
                                  type="button"
                                  className="spinner-button"
                                  style={{
                                    borderRadius: "100%",
                                    background: "#adb5bd",
                                    padding: "2px 8px",
                                  }}
                                  onClick={() =>
                                    handleDecreaseChange(cashDecrease - 1)
                                  }
                                >
                                  -
                                </button>
                                <div className="input ">
                                  <input
                                    type="text"
                                    value={cashDecrease}
                                    onChange={(e) =>
                                      handleDecreaseChange(e.target.value)
                                    }
                                    onInput={(e) =>
                                      (e.target.value = e.target.value.replace(
                                        /[^\d^.]/g,
                                        ""
                                      ))
                                    }
                                    className="font-weight-bold"
                                  />
                                </div>
                                <button
                                  type="button"
                                  className="spinner-button"
                                  style={{
                                    borderRadius: "50%",
                                    background: "#adb5bd",
                                  }}
                                  onClick={() =>
                                    handleDecreaseChange(cashDecrease + 1)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div>
                              <div className="title text-left  mr-auto disabled fw-bold f-16">
                                Stop if cash increases by
                              </div>
                              <div className="spinner  mt-2">
                                <button
                                  type="button"
                                  className="spinner-button"
                                  style={{
                                    borderRadius: "100%",
                                    background: "#adb5bd",
                                    padding: "2px 8px",
                                  }}
                                  onClick={() =>
                                    handleIncreaseChange(cashIncrease - 1)
                                  }
                                >
                                  -
                                </button>
                                <div className="input full-width">
                                  <input
                                    type="text"
                                    value={cashIncrease}
                                    onChange={(e) =>
                                      handleIncreaseChange(e.target.value)
                                    }
                                    onInput={(e) =>
                                      (e.target.value = e.target.value.replace(
                                        /[^\d^.]/g,
                                        ""
                                      ))
                                    }
                                    className="font-weight-bold"
                                  />
                                </div>
                                <button
                                  type="button"
                                  className="spinner-button"
                                  style={{
                                    borderRadius: "50%",
                                    background: "#adb5bd",
                                  }}
                                  onClick={() =>
                                    handleIncreaseChange(cashIncrease + 1)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label id="otp_error" className="error"></label>
                          </div>
                          <button
                            className="btn green-btn md-btn custm-btn-2 mx-auto mt-3 mb-3 w-100"
                            id="processSubmit"
                            onClick={handleStart}
                          >
                            Start
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
                    onChange={autoCashOutHandler}
                    checked={autoCashOut}
                  />
                </div>
                <div
                  className="spinner small"
                  style={{ maxWidth: "100px", height: "24px" }}
                >
                  <div className="input full-width">
                    <input
                      className="f-16 font-weight-bold"
                      type="text"
                      id="main_incrementor"
                      required={autoCashOut}
                      value={autoCashOutValue}
                      onChange={(e) => {
                        e.preventDefault();
                        let inputValue = e.target.value;
                        inputValue = inputValue.replace(/[^\d.]/g, "");
                        const inputLength = inputValue.length;

                        if (inputLength > 2 && parseFloat(inputValue) < 1.5) {
                          inputValue = "2";
                        } else if (parseFloat(inputValue) === 1.0) {
                          toast.error(
                            "AutoCashOut Value must be greater then 1.5"
                          );
                        }

                        setAutoCashOutValue(inputValue);
                      }}
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
  );
}

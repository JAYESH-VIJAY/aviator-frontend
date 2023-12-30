import React, { useState } from "react";

const LeftSidebar = () => {

  const [mybets, setMyBets] = useState([
    { created_at: new Date(), amount: 100, cashout_multiplier: 2 },
    { created_at: new Date(), amount: 150, cashout_multiplier: 1.5 },
    // Add more sample objects as needed
  ]);

  const dformat = (date, format) => {
    // Implement your date formatting logic here
    return date.toLocaleTimeString(); // Sample implementation, replace it with your logic
  };

  const number_format = (value, decimals) => {
    // Implement your number formatting logic here
    return value.toFixed(decimals); // Sample implementation, replace it with your logic
  };

  // Your other functions like previous_hand can be implemented here if needed

  return (
    <div className="left-sidebar">
      <div className="tabs-navs">
        <ul className="nav nav-pills" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-allbets-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-allbets"
              type="button"
              role="tab"
              aria-controls="pills-allbets"
              aria-selected="true"
            >
              All Bets
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-mybets-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-mybets"
              type="button"
              role="tab"
              aria-controls="pills-mybets"
              aria-selected="false"
            >
              My Bets
            </button>
          </li>
          <span className="active-line"></span>
        </ul>
      </div>
      <div className="contents-blocks">
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-allbets"
            role="tabpanel"
            aria-labelledby="pills-allbets-tab"
          >
            <div className="d-flex align-items-center justify-content-between">
              <div className="bets-count secondary-font f-14">
                TOTAL BETS :{" "}
                <span className="text-success" id="total_bets">
                  0
                </span>
              </div>
              <div className="custom-badge mx-auto hide" id="prev_win_multi">
                0.00x
              </div>
              <div className="">
                <button
                  className="btn btn-transparent previous-history d-flex align-items-center"
                  id="current_hand_btn"
                >
                  <span className="material-symbols-outlined f-18 me-1 history-icos">
                    history
                  </span>
                  <span className="material-symbols-outlined f-18 me-1 close-icos">
                    close
                  </span>
                  Previous hand
                </button>
                <button
                  className="btn btn-transparent previous-history selected d-flex align-items-center d-none"
                  id="previous_hand_btn"
                  onClick={() => previous_hand(2)}
                >
                  <span className="material-symbols-outlined f-18 me-1 history-icos">
                    history
                  </span>
                  <span className="material-symbols-outlined f-18 me-1 close-icos">
                    close
                  </span>
                  Previous hand
                </button>
              </div>
            </div>
            <div className="list-data-tbl mt-2">
              <div className="list-header">
                <div className="column-1">User</div>
                <div className="column-2">Bet</div>
                <div className="column-3">Mult.</div>
                <div className="column-4">Cash out</div>
              </div>
              <div className="list-body scroll-div list-body0" id="all_bets">
                {/* Add your content for "All Bets" here */}
              </div>
              <div
                className="list-body scroll-div list-body0 hide"
                id="prev_bets"
              >
                {/* Add your content for "Previous Bets" here */}
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-mybets"
            role="tabpanel"
            aria-labelledby="pills-mybets-tab"
          >
            <div className="list-data-tbl mt-2">
              <div className="list-header">
                <div className="column-1">Date</div>
                <div className="column-2">Bet</div>
                <div className="column-3">Mult.</div>
                <div className="column-4">Cash out</div>
                <div className="ps-2"></div>
              </div>
              <div className="list-body scroll-div list-body1" id="my_bet_list">
                {mybets.map((item, index) => (
                  <div className="list-items" key={index}>
                    <div className="column-1 users fw-normal">
                      {dformat(item.created_at, "h:i")}
                    </div>
                    <div className="column-2">
                      <button className="btn btn-transparent previous-history d-flex align-items-center mx-auto fw-normal">
                        {number_format(item.amount, 2)}₹
                      </button>
                    </div>
                    <div className="column-3">
                      <div className="bg3 custom-badge mx-auto">
                        {number_format(item.cashout_multiplier, 2)}x
                      </div>
                    </div>
                    <div className="column-4 fw-normal">
                      {number_format(item.amount * item.cashout_multiplier, 2)}₹
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;

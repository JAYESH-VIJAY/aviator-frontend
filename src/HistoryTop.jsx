import React from "react";

const HistoryTop = ({ allresults }) => {

  const number_format = (value, decimals) => {
    // Implement your number formatting logic here
    return value.toFixed(decimals); // Sample implementation, replace it with your logic
  };

  return (
    <div className="history-top">
      <div className="stats">
        <div className="payouts-wrapper">
          <div className="payouts-block">
            {allresults &&
              allresults
                .filter(
                  (item) => item.result !== "pending" && item.result !== ""
                )
                .map((item, index) => (
                  <div key={index} className="bg1 custom-badge">
                    {number_format(item.result, 2)}x
                  </div>
                ))}
          </div>
        </div>
        <div className="shadow"></div>
        <div className="button-block">
          <div className="dropdown-toggle button histry-toggle">
            <div className="trigger">
              <span className="material-symbols-outlined">history</span>
              <span className="material-symbols-outlined dd-icon up-arrow">
                arrow_drop_up
              </span>
              <span className="material-symbols-outlined dd-icon down-arrow">
                arrow_drop_down
              </span>
            </div>
          </div>
          <div className="history-dropdown">
            <div className="pa-5 secondary-font text-white pb-0">
              ROUND HISTORY
            </div>
            <div className="d-flex flex-wrap pa-5 round-history-list">
              {allresults
                .filter(
                  (item) => item.result !== "pending" && item.result !== ""
                )
                .map((item, index) => (
                  <div key={index} className="bg1 custom-badge">
                    {number_format(item.result, 2)}x
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTop;

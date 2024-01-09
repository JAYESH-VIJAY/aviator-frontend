import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
const Withdraw = () => {
  const [amount, setAmount] = useState('');
  const [msg, setMsg] = useState('');

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleWithdraw = async () => {
    try {
      // Make an API request to withdraw with the entered amount
      const response = await axios.post('/api/withdraw', { amount });
      // Assuming the API returns a success message
      setMsg(response.data.message);
      // Display a success message using toast
      toast.success('Request sent successfully!');
    } catch (error) {
      console.error('Error withdrawing:', error);
      // Handle error as needed
      // Display an error message using toast
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="deposite-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="pay-tabs">
              <a href="/deposit" className="custom-tabs-link">
                DEPOSIT
              </a>
              <a href="#" className="custom-tabs-link active">
                WITHDRAW
              </a>
            </div>

            <div className="pay-options">
              <div className="payment-cols">
                <div className="grid-view">
                  <div className="grid-list">
                    <button
                      className="btn payment-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#withdraw-modal"
                      onClick={() => handleWithdraw('6', '')}
                    >
                      <img src="images/app-logo/interkassa_net_banking.svg " alt="Net Banking" />
                      <div className="PaymentCard_limit">Net Banking</div>
                    </button>
                  </div>

                  <div className="grid-list">
                    <button
                      className="btn payment-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#withdraw-modal"
                      onClick={() => handleWithdraw('3', '')}
                    >
                      <img src="images/app-logo/upiMt.svg " alt="UPI" />
                      <div className="PaymentCard_limit">UPI</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade l-modal w-480" id="withdraw-modal" tabIndex="-1" aria-labelledby="withdraw-modal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header login-header justify-content-center">
              <span
                className="material-symbols-outlined absolute-btn text-dark f-18 bold-icon m-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                close
              </span>
              <h5 className="modal-title pt-2" id="exampleModalLabel">
                Withdraw Request
              </h5>
            </div>

            <div className="modal-body pt-1">
              <form className="login-form text-center" action="/insert/withdrawal" method="post" id="withdraw_form">
                {/* ... Form fields and labels */}
                <button className="btn yellow-btn md-btn custm-btn-2 mx-auto mt-3 mb-1" onClick={handleWithdraw}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;

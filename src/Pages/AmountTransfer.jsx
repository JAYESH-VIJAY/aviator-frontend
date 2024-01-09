import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AmountTransfer = () => {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [promoCodeError, setPromoCodeError] = useState('');

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleTransfer = (event) => {
    event.preventDefault();
    // Add validation logic as needed
    // For example, check if the user ID and amount are not empty

    // Make an API request to transfer the amount
    axios.post('/api/wallet_transfer', { userId, amount })
      .then((response) => {
        // Handle success, e.g., display a success message
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error, e.g., display an error message
        console.error('Error transferring amount:', error);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Make an AJAX request to '/game-cron' every second
      axios.get('/game-cron')
        .then((response) => {
          // Handle the response as needed
          console.log(response.data);
        })
        .catch((error) => {
          // Handle error, e.g., display an error message
          console.error('Error in game cron:', error);
        });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="active" id="via-email">
      <form className="register-form row w-25" style={{ margin: '100px auto 0 auto', color: 'white !important' }} onSubmit={handleTransfer}>
        <h2>Title</h2>
        <div className="col-md-12 col-12">
          <div className="input-group flex-nowrap mb-3 promocode align-items-center">
            <span className="input-group-text" id="addon-wrapping">
              <span className="material-symbols-outlined bold-icon">
                badge
              </span>
            </span>
            <input type="text" className="form-control ps-0" id="userid" placeholder="User Id" name="userid" onChange={handleUserIdChange} value={userId} />
          </div>
        </div>
        <div className="col-12">
          <div className="input-group flex-nowrap mb-3 promocode align-items-center">
            <span className="input-group-text" id="addon-wrapping">
              <span className="material-symbols-outlined bold-icon">
                money
              </span>
            </span>
            <input type="number" className="form-control ps-0" id="amount" placeholder="Amount" name="amount" onChange={handleAmountChange} value={amount} />
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="promo_code" id="promo_code_error" className="error">{promoCodeError}</label>
        </div>
        <button type="submit" className="btn orange-btn md-btn custm-btn-2 mx-auto mt-3 mb-0 registerSubmit">Transfer Now</button>
      </form>
    </div>
  );
};

export default AmountTransfer;

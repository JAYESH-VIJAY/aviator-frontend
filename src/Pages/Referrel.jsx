import React from 'react';

const Referral = () => {
  return (
    <div className="active" id="via-email">
      <form className="register-form row w-25" style={{ margin: '100px auto 0 auto', color: 'white !important' }}>
        <h2>Referral</h2>
        {/* CSRF token - you might need to handle this differently in React */}
        <input type="hidden" name="_token" value={"kjsdfklhasdf"} />
        <div className="col-md-12 col-12">
          <p>My Code: {/* Replace with user id in your React state or context */}</p>
        </div>
        <div className="col-md-12 col-12">
          <p>
            My URL: 
          </p>
        </div>
      </form>
    </div>
  );
};

export default Referral;

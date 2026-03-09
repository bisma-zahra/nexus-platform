import React, { useState } from 'react';

function Wallet() {
  const [balance, setBalance] = useState(50000);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState('');

  const handleDeposit = () => {
    if (amount && Number(amount) > 0) {
      setBalance(balance + Number(amount));
      setAmount('');
      setShowDeposit(false);
      alert(`$${amount} deposited successfully!`);
    }
  };

  const handleWithdraw = () => {
    if (amount && Number(amount) > 0 && Number(amount) <= balance) {
      setBalance(balance - Number(amount));
      setAmount('');
      setShowWithdraw(false);
      alert(`$${amount} withdrawn successfully!`);
    } else {
      alert('Insufficient balance or invalid amount');
    }
  };

  return (
    <div className="wallet-container">
      <h2 className="section-title">Wallet</h2>
      
      <div className="balance-card">
        <div className="balance-label">Available Balance</div>
        <div className="balance-amount">${balance.toLocaleString()}</div>
        <div className="balance-currency">USD</div>
      </div>

      <div className="action-buttons">
        <button className="btn btn-success" onClick={() => {setShowDeposit(true); setShowWithdraw(false);}}>
          <span className="btn-icon">📥</span> Deposit
        </button>
        <button className="btn btn-warning" onClick={() => {setShowWithdraw(true); setShowDeposit(false);}}>
          <span className="btn-icon">📤</span> Withdraw
        </button>
        <button className="btn btn-primary">
          <span className="btn-icon">↗️</span> Transfer
        </button>
        <button className="btn btn-secondary">
          <span className="btn-icon">💼</span> Fund a Deal
        </button>
      </div>

      {(showDeposit || showWithdraw) && (
        <div className="amount-modal">
          <h3>{showDeposit ? 'Deposit Money' : 'Withdraw Money'}</h3>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="amount-input"
          />
          <div className="modal-actions">
            <button 
              className="btn btn-secondary" 
              onClick={() => {setShowDeposit(false); setShowWithdraw(false); setAmount('');}}
            >
              Cancel
            </button>
            <button 
              className="btn btn-primary" 
              onClick={showDeposit ? handleDeposit : handleWithdraw}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Wallet;
import React, { useState } from 'react';

function TransactionHistory({ transactions }) {
  const [filter, setFilter] = useState('all');

  const sampleTransactions = transactions || [
    { id: 1, type: 'Deposit', amount: 10000, date: '2026-03-01', status: 'Completed', from: 'Bank', to: 'Wallet' },
    { id: 2, type: 'Transfer', amount: 5000, date: '2026-03-05', status: 'Completed', from: 'Wallet', to: 'Investor #1234' },
    { id: 3, type: 'Withdraw', amount: 2000, date: '2026-03-07', status: 'Pending', from: 'Wallet', to: 'Bank' },
  ];

  const filteredTransactions = sampleTransactions.filter(t => {
    if (filter === 'all') return true;
    return t.type.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="transaction-history">
      <div className="transaction-header">
        <h3>Transaction History</h3>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
          <option value="all">All Transactions</option>
          <option value="deposit">Deposits</option>
          <option value="withdraw">Withdrawals</option>
          <option value="transfer">Transfers</option>
        </select>
      </div>

      <div className="transactions-list">
        {filteredTransactions.map(t => (
          <div key={t.id} className="transaction-card">
            <div className="transaction-icon">
              {t.type === 'Deposit' ? '📥' : t.type === 'Withdraw' ? '📤' : '↗️'}
            </div>
            <div className="transaction-details">
              <div className="transaction-type">{t.type}</div>
              <div className="transaction-meta">
                <span>{t.date}</span>
                <span>{t.from} → {t.to}</span>
              </div>
            </div>
            <div className="transaction-amount-status">
              <div className={`transaction-amount ${t.type === 'Deposit' ? 'positive' : 'negative'}`}>
                {t.type === 'Deposit' ? '+' : '-'}${t.amount}
              </div>
              <span className={`transaction-status status-${t.status.toLowerCase()}`}>
                {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionHistory;
import React, { useState } from 'react';
import MeetingCalendar from './components/MeetingCalendar';
import VideoCall from './components/VideoCall';
import Documents from './components/Documents';
import Wallet from './components/Wallet';
import TransactionHistory from './components/TransactionHistory';
import SecuritySettings from './components/SecuritySettings';
import SimpleTour from './components/SimpleTour';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState('Investor');
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'Deposit', amount: 10000, date: '2026-03-01', status: 'Completed', from: 'Bank', to: 'Wallet' },
    { id: 2, type: 'Transfer', amount: 5000, date: '2026-03-05', status: 'Completed', from: 'Wallet', to: 'Investor #1234' },
    { id: 3, type: 'Withdraw', amount: 2000, date: '2026-03-07', status: 'Pending', from: 'Wallet', to: 'Bank' },
    { id: 4, type: 'Deal Funding', amount: 15000, date: '2026-03-08', status: 'Completed', from: 'Wallet', to: 'Deal #5678' },
  ]);

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1 className="logo">Nexus Platform</h1>
          <nav className="nav">
            <button 
              className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={`nav-link ${activeTab === 'meetings' ? 'active' : ''}`}
              onClick={() => setActiveTab('meetings')}
            >
              Meetings
            </button>
            <button 
              className={`nav-link ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              Documents
            </button>
            <button 
              className={`nav-link ${activeTab === 'payments' ? 'active' : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              Payments
            </button>
            <button 
              className={`nav-link ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              Security
            </button>
          </nav>
          <div className="user-menu">
            <span className="user-role">{userRole}</span>
            <select 
              className="role-switcher"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
            >
              <option value="Investor">Investor</option>
              <option value="Entrepreneur">Entrepreneur</option>
            </select>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="welcome-section">
            <h1>Welcome back, Bisma!</h1>
            <p>Investor & Entrepreneur Collaboration Platform</p>
            <SimpleTour />
          </div>

          {activeTab === 'dashboard' && (
            <div className="dashboard-grid">
              <div className="grid-item">
                <MeetingCalendar />
              </div>
              <div className="grid-item">
                <VideoCall />
              </div>
              <div className="grid-item grid-full">
                <Documents />
              </div>
              <div className="grid-item">
                <Wallet />
              </div>
              <div className="grid-item">
                <SecuritySettings userRole={userRole} />
              </div>
            </div>
          )}

          {activeTab === 'meetings' && (
            <div className="full-width">
              <MeetingCalendar />
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="full-width">
              <Documents />
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="payments-grid">
              <div className="grid-item">
                <Wallet />
              </div>
              <div className="grid-item grid-full">
                <TransactionHistory transactions={transactions} />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="full-width">
              <SecuritySettings userRole={userRole} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
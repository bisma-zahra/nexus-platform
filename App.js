import React from 'react';
import MeetingCalendar from './components/MeetingCalendar';
import VideoCall from './components/VideoCall';
import Documents from './components/Documents';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1 className="logo">Nexus Platform</h1>
          <nav className="nav">
            <button className="nav-link">Dashboard</button>
            <button className="nav-link">Meetings</button>
            <button className="nav-link">Documents</button>
            <button className="nav-link">Payments</button>
          </nav>
          <div className="user-menu">
            <span className="user-role">Investor</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="welcome-section">
            <h1>Welcome back, Bisma!</h1>
            <p>Investor & Entrepreneur Collaboration Platform</p>
          </div>

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
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
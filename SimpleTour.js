import React, { useState, useEffect } from 'react';

function SimpleTour() {
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { target: '.logo', message: 'Welcome to Nexus Platform! Click Next to continue.' },
    { target: '.nav', message: 'Use these tabs to navigate between different sections.' },
    { target: '.calendar-container', message: 'Schedule and manage meetings here.' },
    { target: '.video-call-container', message: 'Start video calls with investors/entrepreneurs.' },
    { target: '.document-chamber', message: 'Upload, preview, and sign documents.' },
    { target: '.wallet-container', message: 'Manage your funds and transactions.' },
    { target: '.security-settings', message: 'Secure your account with password & 2FA.' },
  ];

  const startTour = () => {
    setIsTourActive(true);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      endTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const endTour = () => {
    setIsTourActive(false);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (isTourActive && steps[currentStep]) {
      const target = document.querySelector(steps[currentStep].target);
      if (target) {
        target.classList.add('tour-highlight');
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    return () => {
      document.querySelectorAll('.tour-highlight').forEach(el => {
        el.classList.remove('tour-highlight');
      });
    };
  }, [isTourActive, currentStep]);

  if (!isTourActive) {
    return (
      <button className="btn btn-secondary tour-button" onClick={startTour}>
        <span className="btn-icon">🎯</span> Start Tour
      </button>
    );
  }

  return (
    <div className="tour-overlay">
      <div className="tour-tooltip">
        <div className="tour-header">
          <span className="tour-step">Step {currentStep + 1}/{steps.length}</span>
          <button className="tour-close" onClick={endTour}>✕</button>
        </div>
        <div className="tour-message">{steps[currentStep].message}</div>
        <div className="tour-footer">
          <button 
            className="tour-btn tour-btn-secondary" 
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Previous
          </button>
          <button 
            className="tour-btn tour-btn-primary" 
            onClick={nextStep}
          >
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SimpleTour;
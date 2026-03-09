import React, { useRef, useState } from 'react';

function VideoCall() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  const startCall = () => {
    setIsCallActive(true);
    // WebRTC logic yahan ayega (mock for now)
    console.log('Call started');
  };

  const endCall = () => {
    setIsCallActive(false);
    setIsAudioMuted(false);
    setIsVideoOff(false);
    console.log('Call ended');
  };

  const toggleAudio = () => {
    setIsAudioMuted(!isAudioMuted);
    console.log(isAudioMuted ? 'Audio unmuted' : 'Audio muted');
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    console.log(isVideoOff ? 'Video turned on' : 'Video turned off');
  };

  const shareScreen = () => {
    console.log('Screen sharing toggled');
    alert('Screen share feature - demo mode');
  };

  return (
    <div className="video-call-container">
      <h2 className="section-title">Video Calling</h2>
      
      <div className="videos">
        <div className="video-wrapper">
          <video ref={localVideoRef} autoPlay muted className="local-video" />
          <span className="video-label">You</span>
        </div>
        <div className="video-wrapper">
          <video ref={remoteVideoRef} autoPlay className="remote-video" />
          <span className="video-label">Remote User</span>
        </div>
      </div>

      <div className="call-controls">
        {!isCallActive ? (
          <button onClick={startCall} className="btn btn-success">
            <span className="btn-icon">📞</span> Start Call
          </button>
        ) : (
          <>
            <button 
              onClick={toggleAudio} 
              className={`btn ${isAudioMuted ? 'btn-warning' : 'btn-secondary'}`}
            >
              <span className="btn-icon">{isAudioMuted ? '🔇' : '🎤'}</span>
              {isAudioMuted ? 'Unmute' : 'Mute'}
            </button>
            <button 
              onClick={toggleVideo}
              className={`btn ${isVideoOff ? 'btn-warning' : 'btn-secondary'}`}
            >
              <span className="btn-icon">{isVideoOff ? '📹' : '🎥'}</span>
              {isVideoOff ? 'Start Video' : 'Stop Video'}
            </button>
            <button onClick={shareScreen} className="btn btn-secondary">
              <span className="btn-icon">🖥️</span> Share Screen
            </button>
            <button onClick={endCall} className="btn btn-danger">
              <span className="btn-icon">📴</span> End Call
            </button>
          </>
        )}
      </div>

      {!isCallActive && (
        <div className="call-info">
          <p>Click "Start Call" to begin video meeting</p>
        </div>
      )}
    </div>
  );
}

export default VideoCall;
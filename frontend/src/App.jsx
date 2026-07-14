import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [view, setView] = useState('login');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (type, details) => {
    setFeedback(`${type} ready — ${details}`);
  };

  const switchTo = (target) => {
    setFeedback('');
    setView(target);
  };

  return (
    <div className="app-shell">
      <div className="auth-panel" role="main">
        <header className="auth-switch" aria-label="Choose auth view">
          <button
            className={`switch-btn ${view === 'login' ? 'is-active' : ''}`}
            onClick={() => switchTo('login')}
          >
            Login
          </button>
          <button
            className={`switch-btn ${view === 'register' ? 'is-active' : ''}`}
            onClick={() => switchTo('register')}
          >
            Register
          </button>
        </header>

        <p className="page-description">
          {view === 'login'
            ? 'Access your workspace with your login credentials.'
            : 'Create a new account and start building.'}
        </p>

        {view === 'login' ? (
          <LoginPage
            onSwitch={() => switchTo('register')}
            onSubmit={(details) => handleSubmit('Login', details)}
          />
        ) : (
          <RegisterPage
            onSwitch={() => switchTo('login')}
            onSubmit={(details) => handleSubmit('Registration', details)}
          />
        )}

        {feedback && <div className="feedback" role="status">{feedback}</div>}
      </div>
    </div>
  );
}

export default App;

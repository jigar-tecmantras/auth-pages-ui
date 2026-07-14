import React, { useMemo, useState } from 'react';

const emailRegex = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/;

const LoginPage = ({ onSwitch, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => {
    const errs = {};

    if (touched.email && !emailRegex.test(email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (touched.password && password.trim().length < 6) {
      errs.password = 'Password must be 6 characters or longer.';
    }

    if (!email && touched.email) {
      errs.email = 'Email is required.';
    }

    if (!password && touched.password) {
      errs.password = 'Password is required.';
    }

    return errs;
  }, [email, password, touched]);

  const isFormValid = useMemo(() => {
    return (
      emailRegex.test(email) &&
      password.trim().length >= 6 &&
      email.length > 0 &&
      password.length > 0
    );
  }, [email, password]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ email: true, password: true });

    if (!isFormValid) return;

    onSubmit(`Email: ${email}`);
  };

  const labelClasses = (field) => (errors[field] ? 'input-label has-error' : 'input-label');

  return (
    <form className="auth-card" onSubmit={handleSubmit} noValidate>
      <div className="input-group">
        <label className={labelClasses('email')} htmlFor="login-email">
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          className={`input-field ${errors.email ? 'input-error-field' : ''}`}
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && <p className="input-error" role="alert">{errors.email}</p>}
      </div>

      <div className="input-group">
        <label className={labelClasses('password')} htmlFor="login-password">
          Password
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
          className={`input-field ${errors.password ? 'input-error-field' : ''}`}
          placeholder="••••••••"
          aria-invalid={Boolean(errors.password)}
        />
        {errors.password && <p className="input-error" role="alert">{errors.password}</p>}
      </div>

      <button type="submit" className="submit-button" disabled={!isFormValid}>
        Continue to Dashboard
      </button>

      <div className="auth-footer">
        <button type="button" className="link-button" onClick={onSwitch}>
          Need an account? Create one
        </button>
        <a className="link-button" href="#" aria-label="Reset password">
          Forgot password?
        </a>
      </div>
    </form>
  );
};

export default LoginPage;

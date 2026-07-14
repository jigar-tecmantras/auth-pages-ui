import React, { useMemo, useState } from 'react';

const emailRegex = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/;
const phoneRegex = /^\d{10,15}$/;

const RegisterPage = ({ onSwitch, onSubmit }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => {
    const errs = {};

    if (touched.fullName && fullName.trim().length < 2) {
      errs.fullName = 'Enter your first and last name.';
    }

    if (touched.email && !emailRegex.test(email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (touched.phone && !phoneRegex.test(phone)) {
      errs.phone = 'Please enter a valid phone number.';
    }

    if (touched.password && password.length < 8) {
      errs.password = 'Password must be at least 8 characters.';
    }

    if (touched.confirmPassword && confirmPassword !== password) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    if (!fullName && touched.fullName) {
      errs.fullName = 'Full name is required.';
    }

    if (!email && touched.email) {
      errs.email = 'Email is required.';
    }

    if (!phone && touched.phone) {
      errs.phone = 'Phone number is required.';
    }

    if (!password && touched.password) {
      errs.password = 'Password is required.';
    }

    if (!confirmPassword && touched.confirmPassword) {
      errs.confirmPassword = 'Please confirm your password.';
    }

    return errs;
  }, [fullName, email, password, confirmPassword, phone, touched]);

  const isFormValid = useMemo(() => {
    return (
      fullName.trim().length >= 2 &&
      emailRegex.test(email) &&
      phoneRegex.test(phone) &&
      password.length >= 8 &&
      confirmPassword === password &&
      email.length > 0 &&
      confirmPassword.length > 0
    );
  }, [fullName, email, phone, password, confirmPassword]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });

    if (!isFormValid) return;

    onSubmit(`Welcome, ${fullName}`);
  };

  const labelClasses = (field) => (errors[field] ? 'input-label has-error' : 'input-label');

  return (
    <form className="auth-card" onSubmit={handleSubmit} noValidate>
      <div className="input-group">
        <label className={labelClasses('fullName')} htmlFor="signup-fullname">
          Full name
        </label>
        <input
          id="signup-fullname"
          name="fullName"
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, fullName: true }))}
          className={`input-field ${errors.fullName ? 'input-error-field' : ''}`}
          placeholder="Jordan Rivera"
          aria-invalid={Boolean(errors.fullName)}
        />
        {errors.fullName && <p className="input-error" role="alert">{errors.fullName}</p>}
      </div>

      <div className="input-group">
        <label className={labelClasses('email')} htmlFor="signup-email">
          Email
        </label>
        <input
          id="signup-email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          className={`input-field ${errors.email ? 'input-error-field' : ''}`}
          placeholder="team@example.com"
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && <p className="input-error" role="alert">{errors.email}</p>}
      </div>

      <div className="input-group">
        <label className={labelClasses('phone')} htmlFor="signup-phone">
          Phone number
        </label>
        <input
          id="signup-phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
          className={`input-field ${errors.phone ? 'input-error-field' : ''}`}
          placeholder="1234567890"
          aria-invalid={Boolean(errors.phone)}
        />
        {errors.phone && <p className="input-error" role="alert">{errors.phone}</p>}
      </div>

      <div className="input-group">
        <label className={labelClasses('password')} htmlFor="signup-password">
          Password
        </label>
        <input
          id="signup-password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
          className={`input-field ${errors.password ? 'input-error-field' : ''}`}
          placeholder="Create a strong password"
          aria-invalid={Boolean(errors.password)}
        />
        {errors.password && <p className="input-error" role="alert">{errors.password}</p>}
      </div>

      <div className="input-group">
        <label className={labelClasses('confirmPassword')} htmlFor="signup-confirm">
          Confirm password
        </label>
        <input
          id="signup-confirm"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, confirmPassword: true }))}
          className={`input-field ${errors.confirmPassword ? 'input-error-field' : ''}`}
          placeholder="Repeat your password"
          aria-invalid={Boolean(errors.confirmPassword)}
        />
        {errors.confirmPassword && <p className="input-error" role="alert">{errors.confirmPassword}</p>}
      </div>

      <button type="submit" className="submit-button" disabled={!isFormValid}>
        Create my account
      </button>

      <div className="auth-footer">
        <button type="button" className="link-button" onClick={onSwitch}>
          Already have an account? Sign in
        </button>
      </div>
    </form>
  );
};

export default RegisterPage;

import React, { useState, useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Orb from '../components/Orb'; // Assuming Orb component is in the same directory
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGlobalContext } from '../context/globalContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function LoginPage() {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const { login, signup, success, setSuccess } = useGlobalContext();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [matchPassword, setMatchPassword] = useState('');
  const [name, setName] = useState(''); // New state for name
  const [role, setRole] = useState('Customer'); // New state for role
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [error, setError] = useState('');

  const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    toast('Please fill the form');
  }, [success]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setError('');
  }, [email, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validEmail || !validPassword || (!isLogin && !validMatch)) {
      setError('Invalid Entry');
      return;
    }
    const data = { email, password, name, role }; // Include name and role in data

    try {
      const response = isLogin ? login(data) : signup(data);
      setEmail('');
      setPassword('');
      setMatchPassword('');
      setName('');
    } catch (err) {
      if (!err?.response) {
        setError('No Server Response');
      } else if (err.response?.status === 409) {
        setError('Email Taken');
      } else {
        setError('Registration/Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <LoginPageStyled>
      {orbMemo}
      <div className='form-wrapper'>
        {success ? (
          navigate('/customers')
        ) : (
          <form onSubmit={handleSubmit}>
            <p
              ref={errRef}
              className={error ? 'errmsg' : 'offscreen'}
              aria-live='assertive'>
              {error}
            </p>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

            {!isLogin && (
              <>
                <label htmlFor='name'>Name:</label>
                <input
                  type='text'
                  id='name'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required={!isLogin}
                />
              </>
            )}

            <label htmlFor='email'>
              Email:
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !email ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type='email'
              id='email'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? 'false' : 'true'}
              aria-describedby='uidnote'
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              id='uidnote'
              className={
                emailFocus && email && !validEmail
                  ? 'instructions'
                  : 'offscreen'
              }>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must be a valid email address.
            </p>

            <label htmlFor='password'>
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPassword ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPassword || !password ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type='password'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              aria-invalid={validPassword ? 'false' : 'true'}
              aria-describedby='pwdnote'
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <p
              id='pwdnote'
              className={
                passwordFocus && !validPassword ? 'instructions' : 'offscreen'
              }>
              <FontAwesomeIcon icon={faInfoCircle} />8 to 24 characters. Must
              include uppercase and lowercase letters, a number and a special
              character. Allowed special characters: ! @ # $ %
            </p>

            {!isLogin && (
              <>
                <label htmlFor='confirm_pwd'>
                  Confirm Password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validMatch && matchPassword ? 'valid' : 'hide'}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={
                      validMatch || !matchPassword ? 'hide' : 'invalid'
                    }
                  />
                </label>
                <input
                  type='password'
                  id='confirm_pwd'
                  onChange={(e) => setMatchPassword(e.target.value)}
                  value={matchPassword}
                  required={!isLogin}
                  aria-invalid={validMatch ? 'false' : 'true'}
                  aria-describedby='confirmnote'
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id='confirmnote'
                  className={
                    matchFocus && !validMatch ? 'instructions' : 'offscreen'
                  }>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must match the first password input field.
                </p>
              </>
            )}

            {!isLogin && (
              <>
                <label htmlFor='role'>Role:</label>
                <select
                  id='role'
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required>
                  <option value='Customer'>Customer</option>
                  <option value='Admin'>Admin</option>
                </select>
              </>
            )}

            <button
              disabled={
                !validEmail || !validPassword || (!isLogin && !validMatch)
                  ? true
                  : false
              }>
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
            <button
              className='google-button'
              type='button'
              onClick={() => console.log('Google login')}>
              Login with Google
            </button>
          </form>
        )}
        <p className='switch-form' onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : 'Already have an account? Login'}
        </p>
      </div>
    </LoginPageStyled>
  );
}

const LoginPageStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f0f0f0; /* A light background to make the orb effect stand out */
  padding: 2rem;
  position: relative;

  .form-wrapper {
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    background: white;
    border-radius: 20px;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
      text-align: center;
      margin-bottom: 1rem;
      color: #f56692;
    }

    .errmsg {
      background-color: lightpink;
      color: firebrick;
      font-weight: bold;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      border-radius: 0.25rem;
      width: 100%;
      text-align: center;
    }

    .error-message {
      color: red;
      text-align: center;
    }

    input,
    select {
      width: 100%;
      padding: 0.75rem;
      margin-bottom: 1rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s;

      &:focus {
        border-color: #f56692;
      }
    }

    button {
      width: 100%;
      padding: 0.75rem;
      background: linear-gradient(180deg, #f56692 0%, #f2994a 100%);
      border: none;
      border-radius: 8px;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      margin-bottom: 1rem;
      transition: background 0.3s;

      &:hover {
        background: linear-gradient(180deg, #f2994a 0%, #f56692 100%);
      }

      &.google-button {
        background: #db4437;

        &:hover {
          background: #c53727;
        }
      }
    }

    .switch-form {
      text-align: center;
      color: #666;
      cursor: pointer;
      margin-top: 1rem;

      &:hover {
        text-decoration: underline;
      }
    }

    label {
      display: block;
      width: 100%;
      margin-bottom: 0.5rem;
      font-weight: bold;

      .valid {
        color: green;
        margin-left: 0.5rem;
      }

      .invalid {
        color: red;
        margin-left: 0.5rem;
      }

      .hide {
        display: none;
      }
    }

    .instructions {
      font-size: 0.75rem;
      border-radius: 0.25rem;
      background: #f0f0f0;
      color: #333;
      padding: 0.5rem;
      position: absolute;
      bottom: -3.25rem;
      left: 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .offscreen {
      display: none;
    }
  }
`;

export default LoginPage;

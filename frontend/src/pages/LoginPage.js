import React, { useState, useMemo } from "react";
import styled from "styled-components";
import Orb from "../components/Orb";
import { useGlobalContext } from "../context/globalContext";
import { InnerLayout } from "../styles/Layouts.js";
function LoginPage() {
  const {
    login,
    register,
    setCurrCustomer,
    setIsAuthenticated,
    error,
    loading,
    setError,
  } = useGlobalContext();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const [name, setName] = useState(""); // New state for name
  const [role, setRole] = useState("User"); // New state for role

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password, name, role }; // Include name and role in data

    try {
      loading && setError("PLEASE WAIT you will be redirected soon... after some internal verification");
      const response = isLoginForm ? await login(data) : await register(data);
      setEmail("");
      setPassword("");
      setMatchPassword("");
      setName("");

      if (isLoginForm && response.success) {
        setIsAuthenticated(true);
      } else {
        setIsLoginForm(true);
      }
    } catch (err) {
      console.error("Error during form submission:", err.message);

      if (!err.message) {
        setError("No Server Response");
      } else if (err.message.includes("Email Taken")) {
        setError("Email Taken");
      } else {
        setError(err.message || "Registration/Login Failed");
      }
    } finally {
      setError("");
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <LoginPageStyled>
        {orbMemo}
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <p className={error ? "errmsg" : "offscreen"} aria-live="assertive">
              {error}
            </p>
            <h2>{isLoginForm ? "Login" : "Sign Up"}</h2>

            {!isLoginForm && (
              <>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required={!isLoginForm}
                />
              </>
            )}

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />

            {!isLoginForm && (
              <>
                <label htmlFor="confirm_pwd">Confirm Password:</label>
                <input
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPassword(e.target.value)}
                  value={matchPassword}
                  required={!isLoginForm}
                />
              </>
            )}

            {!isLoginForm && (
              <>
                <label htmlFor="role">Role:</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="User">User</option>
                  <option value="Moderator">Moderator</option>
                </select>
              </>
            )}

            <button type="submit">
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </form>
          <p
            className="switch-form"
            onClick={() => {
              setIsLoginForm(!isLoginForm);
              setError("");
            }}
          >
            {isLoginForm
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </p>
        </div>
      </LoginPageStyled>
      <ImageSection>
        <InnerLayout>
          <img
            src="/loginPage.jpg"
            alt="Login Page"
            onError={(e) => (e.target.style.display = "none")}
          />
        </InnerLayout>
      </ImageSection>
    </div>
  );
}

const ImageSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    margin-top: 1rem;
  }
`;

const LoginPageStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5d6e0, #f0f4f8);
  padding: 2rem;
  position: relative;
  width: 100%;

  .form-wrapper {
    margin-left: 10vw;
    margin-right: 10vw;
    width: 100%;
    padding: 2rem;
    background: white;
    border-radius: 20px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* max-width: 18vw; */
    
    h2 {
      text-align: center;
      margin-bottom: 1rem;
      color: #ff647c;
      font-size: 1.5rem;
      font-weight: bold;
    }

    .errmsg {
      background-color: #ffe6e6;
      color: #d9534f;
      font-weight: bold;
      padding: 0.75rem;
      margin-bottom: 1rem;
      border-radius: 8px;
      width: 100%;
      text-align: center;
    }

    input,
    select {
      width: 100%;
      padding: 0.75rem;
      margin-bottom: 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;

      &:focus {
        border-color: #ff647c;
        box-shadow: 0 0 8px rgba(255, 100, 124, 0.3);
      }
    }
    [button]:disabled {
    background: #ddd; /* Disabled background color */
    cursor: not-allowed; /* Change cursor to indicate disabled state */
    opacity: 0.6; /* Slight transparency for visual cue */
  }

    button {
      width: 100%;
      padding: 0.75rem;
      margin-bottom: 1rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: bold;
      color: white;
      background: linear-gradient(135deg, #ff647c, #f2994a);
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: linear-gradient(135deg, #f2994a, #ff647c);
        transform: translateY(-2px);
      }

      &.google-button {
        background: #db4437;

        &:hover {
          background: #c33d2e;
        }
      }
    }

    .switch-form {
      text-align: center;
      color: #555;
      font-size: 0.9rem;
      margin-top: 1rem;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default LoginPage;

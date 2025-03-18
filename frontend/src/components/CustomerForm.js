import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../context/globalContext";
import Button from "../utils/Button";

function CustomerForm() {
  const currDate = new Date();
  const {
    register,
    updateUser,
    error,
    updateUserFromAdmin,
    setError,
    allUsers,
    me,
    user,
    inputState,
    setInputState,
    isUpdateForm,
    setIsUpdateForm,
    setAllUsers
  } = useGlobalContext();

  const cancelHandler = async (id) => {
    try {
      setIsUpdateForm(false);
      setInputState({
          name: "",
          role: "",
          email: "",
          description: "",
        });
      }
     catch (error) {
     console.error("Failed to fetch reset form:", error);
    }
  };

  useEffect(() => {console.log(me);
  }, []);

  const { name, email, date, role, password, newPassword, description } =
    inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(`inputState is `, inputState);

      let response;

      if (me.role === "User") {
        response = await updateUser(me._id, inputState);
      } else if (isUpdateForm) {
        response = await updateUserFromAdmin(user._id, inputState);
      } else {        
        response = await register(inputState);
        if (response) {
          setAllUsers([...allUsers, response.data]);
        }
        setInputState({
          name: "",
          email: "",
          date: "",
          role: "",
          password: "",
          newPassword: "",
          description: "",
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    (me.role === "Admin" || me.role === "User") && (
      <CustomerFormStyled onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <div className="input-control">
          <input
            type="text"
            value={name}
            name={"name"}
            placeholder="Customer name"
            onChange={handleInput("name")}
          />
        </div>
        <div className="input-control">
          <input
            value={email}
            type="text"
            disabled={me.role === "User"} // Dynamically disable the input based on me.role
            name={"email"}
            placeholder={"Customer email"}
            onChange={handleInput("email")}
          />
        </div>

        <div className="input-control">
          <DatePicker
            id="date"
            placeholderText="Enter A Date"
            selected={date}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => {
              setInputState({ ...inputState, date: date });
            }}
          />
        </div>
        <div className="selects input-control">
          <select
            required
            value={role}
            name="role"
            id="role"
            onChange={handleInput("role")}
          >
            <option value="" disabled>
              Select Option
            </option>
            {me.role === "Admin" && <option value="Admin">Admin</option>}
            <option value="User">User</option>
            {(me.role === "Moderator" || me.role === "Admin") && (
              <option value="Moderator">Moderator</option>
            )}
          </select>
        </div>
        <div className="input-control">
          <input
            type="text"
            value={password}
            name={"password"}
            placeholder="Password"
            onChange={handleInput("password")}
          />
        </div>
        {me.role === "User" && (
          <div className="input-control">
            <input
              type="text"
              value={newPassword}
              name={"newPassword"}
              placeholder="New Password"
              onChange={handleInput("newPassword")}
            />
          </div>
        )}
        <div className="input-control">
          <textarea
            name="description"
            value={description}
            placeholder="Add A Reference"
            id="description"
            cols="30"
            rows="4"
            onChange={handleInput("description")}
          ></textarea>
        </div>
        <div className="submit-btn">
          <Button
            name={
              me.role === "User"
                ? "Save"
                : isUpdateForm
                ? "Update Customer"
                : "Add Customer"
            }
            bPad={".8rem 1.6rem"}
            bRad={"30px"}
            bg={"var(--color-accent"}
            color={"#fff"}
          />

          {isUpdateForm && (
            <Button
              name="Cancel"
              bPad={".8rem 1.6rem"}
              bRad={"30px"}
              bg={"var(--color-accent"}
              color={"#fff"}
              onClick={()=>{cancelHandler()}}
            />
          )}
        </div>
      </CustomerFormStyled>
    )
  );
}

const CustomerFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }
  .submit-btn {
    display: flex;
    justify-content: left;
    gap: 2rem; /* Space between buttons */
    
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }

`;

export default CustomerForm;

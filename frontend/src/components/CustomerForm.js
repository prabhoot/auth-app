import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../context/globalContext";
import Button from "../utils/Button";
import { plus } from "../utils/Icons";
const getFormattedDate = () => {
  const now = new Date(); // Get the current date
  const day = String(now.getDate()).padStart(2, "0"); // Get the day and pad with 0 if needed
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  const year = now.getFullYear(); // Get the full year

  return `${day}/${month}/${year}`; // Combine into desired format
};
function CustomerForm() {
  const currDate = new Date();
  const {
    register,
    updateUser,
    error,
    updateUserFromAdmin,
    setError,
    user,
    allUsers,
  } = useGlobalContext();
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const [inputState, setInputState] = useState(() => {
    // Initialize state with null values if the role is "Admin"
    if (user.role === "Admin") {
      return {
        name: null,
        email: null,
        date: null,
        role: null,
        password: null,
        newPassword: null,
        description: null,
      };
    }
    // Otherwise, initialize with provided values
    return {
      name: `${user.name}`,
      email: `${user.email}`,
      date: ``,
      role: `${user.role}`,
      password: ``,
      newPassword: ``,
      description: `Hi! this is ${user.name}`,
    }});

  useEffect(() => {}, [allUsers]);
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

      if (user.role === "User") {
        response = await updateUser(user._id, inputState);
      } else if (isUpdateForm) {
        response = await updateUserFromAdmin(user._id, inputState);
      } else {
        response = await register(inputState);
        window.location.href = "/";
        // if (response) {
        //   setAllUsers([...allUsers, response.data]);
        // }
        // setInputState({
        //   name: "",
        //   email: "",
        //   date: "",
        //   role: "",
        //   password: "",
        //   newPassword: "",
        //   description: "",
        // });
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    (user.role === "Admin" || user.role === "User") && (
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
            disabled={user.role === "User"} // Dynamically disable the input based on user.role
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
            {user.role === "Admin" && <option value="Admin">Admin</option>}
            <option value="User">User</option>
            {(user.role === "Moderator" || user.role === "Admin") && (
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
        {user.role === "User" && (
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
              user.role === "User"
                ? "Save & Exit"
                : isUpdateForm
                ? "Update Customer"
                : "Add Customer"
            }
            bPad={".8rem 1.6rem"}
            bRad={"30px"}
            bg={"var(--color-accent"}
            color={"#fff"}
          />
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
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;

export default CustomerForm;

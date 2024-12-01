import React, { useEffect } from "react";
import styled from "styled-components";
import { dateFormat } from "../utils/dateFormat";
import { calender, editButton, rupee, trash, users } from "../utils/Icons";
import Button from "../utils/Button";
const { useGlobalContext } = require("../context/globalContext");


function FormItems({ id, title, amount = 0, date, role, indicatorColor }) {
  const { deleteUser, user } = useGlobalContext();
  const updateHandler = (user) => {
    console.log(user._id);
    
  };
  return (
    <FormItemsStyled
      indicator={indicatorColor}
      onClick={() => {
        updateHandler(id);
      }}
    >
      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              {rupee} {amount}
            </p>
            <p>
              {calender} {dateFormat(date)}
            </p>
            <p>
              {users}
              {role}
            </p>
          </div>
          {user.role === "Admin" && (
            <div className="controls">
              <div className="">
                <Button
                  icon={editButton}
                  bPad={"1rem"}
                  bRad={"50%"}
                  bg={"var(--primary-color"}
                  color={"#fff"}
                  iColor={"#fff"}
                  hColor={"var(--color-green)"}
                  onClick={() => updateHandler(user)}
                />
              </div>
              <div className="">
                <Button
                  icon={trash}
                  bPad={"1rem"}
                  bRad={"50%"}
                  bg={"var(--primary-color"}
                  color={"#fff"}
                  iColor={"#fff"}
                  hColor={"var(--color-green)"}
                  onClick={() => deleteUser(id)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </FormItemsStyled>
  );
}

const FormItemsStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #222260;
  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    i {
      font-size: 2.6rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        /* p {
          color: var(--primary-color);
          display: flex;
          align-items: space-between;
          gap: 0.5rem;
          opacity: 0.8;
        } */
      }
      .controls {
        display: flex;
        gap: 1rem;
      }
    }
  }
`;

export default FormItems;

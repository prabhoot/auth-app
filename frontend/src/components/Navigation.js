import React, { useEffect } from "react";
import styled from "styled-components";
import avatar from "../img/avatar.png";
import { iLogout, iLogin } from "../utils/Icons";
import { MenuItems } from "../utils/menuItems";
import { useGlobalContext } from "../context/globalContext";
import { User, useAuth0 } from "@auth0/auth0-react";

// currCustomer.current= async ()=> getCustomerById(id);

function Navigation({ active, setActive }) {
  const { user, logout, loading } = useGlobalContext();

  const logoutHandler = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  function capitalizeWords(string) {
    return string
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <NavStyled>
      <div className="user-con">
        {user && user?.DP ? (
          <img src={user?.DP} alt="profile picture " />
        ) : (
          <img src={avatar} alt="default avatar" />
        )}
        <div className="text">
          <h2>{user ? capitalizeWords(user?.name) : "Prabhoot"}</h2>
          <p>AUTH Application</p>
        </div>
      </div>
      <ul className="menu-items">
        {MenuItems().map((item) => (
          <li
            key={item.id}
            onClick={() => {
              setActive(item.id);
            }}
            className={active === item.id ? "active" : ""}
          >
            {item.icon}
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
      <div className="bottom-nav">
        <span onClick={logoutHandler}>{iLogout} Log Out</span>
      </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2 {
      color: rgba(34, 34, 96, 1);
    }
    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      cursor: pointer;
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;
    i {
      color: rgba(34, 34, 96, 1) !important;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }
  .bottom-nav {
    span {
      -webkit-user-select: none; /* Safari */
      -ms-user-select: none; /* IE 10 and IE 11 */
      user-select: none; /* Standard syntax */
      cursor: pointer;
      padding: 8px;
    }
  }
`;

export default Navigation;

import React, { useState, useMemo } from "react";
import styled from "styled-components";
import bg from "../img/bg.png";
import { MainLayout } from "../styles/Layouts";
import Orb from "../components/Orb";
import Navigation from "../components/Navigation";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../pages/Dashboard";
import Campaign from "../pages/Campaign";
import Orders from "../pages/Orders";
import Customers from "./Customers";
function App() {
  const [active, setActive] = useState(1);

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {active === 1 ? (
            <Dashboard />
          ) : active === 2 ? (
            <Campaign />
          ) : active === 3 ? (
            <Customers />
          ) : active === 4 ? (
            <Orders />
          ) : (
            <Dashboard />
          )}
        </main>
      </MainLayout>{" "}
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;

/*
2. useeffect me fetch
3. allUsers -- aa raha hai but problem hai 
4. useeffect of every page will run getToken if not then user will be redirected to login page
5. card compontent creation.
7. signup mode always user-check
*/

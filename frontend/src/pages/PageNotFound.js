import React from "react";
import Orb from "../components/Orb";
import styled from "styled-components";
import Button from '../utils/Button';
import { useNavigate } from "react-router-dom"

const PageNotFound = () => {
    const navigate = useNavigate()
  return <>
    <Orb/>
    <PageNotFoundStyled>
    <div>
        <h1>Page Not Found</h1>
    </div>
    <div style={{color: "red"}}>
        Error 404 !!
    </div>
    <div className="button-wrapper">
        <Button name={'Go To Home'} bPad={'.8rem 1.6rem'} bRad={'30px'} bg={'var(--color-accent'} color={'#fff'} onClick={()=>{navigate("/")}}></Button>
    </div>
    </PageNotFoundStyled>
  </>;
};
const PageNotFoundStyled=styled.div`
    display: flex;
    align-items: center;
    align-content:center;
    flex-direction:column;
    margin-top:10%;
    font-size:3rem;
    .myButton{
        font-size: 2rem;
        margin-left:2rem;
    }
    .button-wrapper{
        display: flex;
        flex-direction: row;
        button{
            margin-left:2rem;
        }
    }
`

export default PageNotFound;

import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define keyframes outside the component
const moveOrb = keyframes`
    0% {
        transform: translate(0, 0);
    }
    50% {
        transform: translate(100vw, 50vh);
    }
    100% {
        transform: translate(0, 0);
    }
`;

const OrbStyled = styled.div`
    width: 70vh;
    height: 70vh;
    position: absolute;
    border-radius: 50%;
    margin-left: -35vh;
    margin-top: -35vh;
    background: linear-gradient(180deg, #f56692 0%, #f2994a 100%);
    filter: blur(400px);
    animation: ${moveOrb} 3s alternate linear infinite;
`;

function Orb() {
    // Use the window dimensions directly if needed
    // const width = window.innerWidth;
    // const height = window.innerHeight;
    return <OrbStyled />;
}

export default Orb;

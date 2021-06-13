import React from 'react';
import styled from 'styled-components'

const StyledBtn = styled.button`
    border: 1px solid hsla(203, 20%, 84%, 0.6);
    border-radius: 0.5rem;
    background: transparent;
    padding: 0.5rem;
    color: whitesmoke;
    font-weight: bold;
    transition: 0.2s ease;
    display: flex;
    place-items: center;
    gap: 0.3rem;
    &:hover {
        background: hsla(0, 0%, 96%, 0.2);
        border: 1px solid hsla(203, 20%, 84%, 1);
        cursor: pointer;
        transform: scale(1.1);
    }
`

function Button({ children, onClick }) {
    return (
        <StyledBtn onClick={onClick}>
            {children}
        </StyledBtn>
    );
}

export default Button;
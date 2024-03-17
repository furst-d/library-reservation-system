import styled from "styled-components";

const BurgerNavStyle = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: ${p => p.theme.secondary};
  width: 250px;
  z-index: 100;
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 20px;
  transform: ${props => props.$show ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.2s;
  overflow-y:scroll;
  
  li {
    padding: 5px 0;
    border-bottom: 1px solid ${p => p.theme.primary};
    font-weight: bold;
  }
`

export default BurgerNavStyle;
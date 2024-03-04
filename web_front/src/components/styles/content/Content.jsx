import styled from "styled-components";

export const ContentStyle = styled.div`
  background-color: ${p => p.theme.third};
  border-radius: 10px;
  margin: 1em;
  width: 100vw;
  max-width: 70em;
  padding: 20px;
  flex: 1 1 auto;
  
  @media (min-width: 768px) {
    margin: 1.5em;
  }
`

export const ContentWrapperStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  width: 100vw;
  margin: 1em;

  @media (min-width: 768px) {
    flex-direction: row;
    margin: 1.5em;
  }
`

export const SubMenuStyle = styled.ul`
  list-style: none;
  width: 100%;

  @media (min-width: 768px) {
    width: 250px;
    padding-left: 10px;
  }
`

export const SubContentStyle = styled.div`
  background-color: ${p => p.theme.secondary};
  flex: 1 1 auto;
  border-radius: 10px;
  padding: 20px;
`

// export const SubMenuStyledLink = styled(StyledLink)`
//   border-bottom: 1px solid ${p => p.theme.primary};
// `

export const ControlPanelWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

export const ControlPanelStyle = styled.ul`
  list-style: none;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`
import styled from 'styled-components'

export const FormStyle = styled.div`
  font-family: 'Open Sans', sans-serif;
  color: ${p => p.theme.text};

  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 10px;
  flex: 1;
  font-size: 20px;
  width: 100%;  

  @media (min-width: 768px) {
    flex: none;
    gap: 20px;
  }
`

export const LeftFormStyle = styled.div`
  color: ${p => p.theme.text};
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 10px;
  flex: 1;
  font-size: 20px;
  align-items: flex-start;
  width: 30em;

    @media (min-width: 768px) {
    flex: none;
    gap: 20px;
    padding: 35px;
  }
`
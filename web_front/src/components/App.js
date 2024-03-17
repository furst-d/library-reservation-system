import React from 'react';
import styled from "styled-components";
import StyleProvider from "./styles/StyleProvider";
import {BrowserRouter as Router} from "react-router-dom";
import PagesProvider from "./pages/PagesProvider";
import ToastProvider from "./toast/ToastProvider";

function App() {
  return (
    <StyleProvider>
        <ApplicationStyle>
            <ToastProvider>
                <Router>
                    <PagesProvider />
                </Router>
            </ToastProvider>
        </ApplicationStyle>
    </StyleProvider>
  );
}

export default App;

const ApplicationStyle = styled.div`
  background: ${p => p.theme.bg};
  color: ${p => p.theme.text_light};
  font-family: 'Open Sans', sans-serif;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`
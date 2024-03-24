import React from 'react';
import styled from "styled-components";
import {CircularProgress} from "@mui/material";

const LoadingSpinner = () => {
    return (
        <LoadingWrapper>
            <CircularWrapper size={75} />
        </LoadingWrapper>
    );
};

export default LoadingSpinner;

const LoadingWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const CircularWrapper = styled(CircularProgress)`
`
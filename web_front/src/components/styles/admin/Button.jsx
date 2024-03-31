import styled from "styled-components";

export const AdminEditButton = styled.button`
    background-color: ${p => p.theme.primary};
    border: none;
    color: white;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    border-radius: 5px;
    padding: 10px 15px;
`;

export const AdminDeleteButton = styled.button`
    background-color: darkred;
    border: none;
    color: white;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    border-radius: 5px;
    padding: 10px 15px;
`;

export const AdminAddButton = styled.button`
    background-color: green;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    padding: 10px 15px;
    margin: 0 0 20px 10px;
    display: flex;
    align-items: center;
`;
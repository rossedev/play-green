"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    font-family: 'DM Sans', sans-serif;
    margin: 0;
    padding: 0;
    height: 100%;    
  }
`;

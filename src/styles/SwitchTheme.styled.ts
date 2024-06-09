import styled from "styled-components";

export const SwitchTheme = styled.div<{ $currentTheme?: string }>`
  background: ${({ theme }) => theme.colors.bar};
  width: 50px;
  height: 50px;
  border-radius: 12px;
  align-content: center;
  text-align: center;
  cursor: pointer;
  position: absolute;
  z-index: 8;
  top: 16px;
  left: 16px;
`;

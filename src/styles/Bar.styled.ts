import styled from "styled-components";

export const BarContainer = styled.div`
  display: flex;
  width: 94%;
  justify-content: space-around;
  align-items: center;
  position: sticky;
  bottom: 14px;
  padding: 1rem 0;
  background: ${({ theme }) => theme.colors.bar};
  border-radius: 24px;
  left: 10px;
  z-index: 5;

  svg {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.text};
  }

  .container-icon {
    width: 40px;
    height: 38px;
    text-align: center;
    align-content: center;
    border-radius: 10px;
    cursor:pointer;
  }

  .current {
    background: ${({ theme }) => theme.colors.currentBackground} !important;

    svg{
      color: ${({ theme }) => theme.colors.currentText} !important;
    }
    
  }
`;

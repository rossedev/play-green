import styled from "styled-components";

export const ContainerMenu = styled.div`
  display: flex;
  gap: 3rem;
  a {
    font-weight: 400;
  }
  
  .current {
    font-weight: 700;
  }
`;

export const ContainerConfig = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  img {
    cursor: pointer;
  }

  .close {
    font-size: 18px;
    cursor: pointer;
  }
`;

export const ContainerHeader = styled.div`
  display: flex;
  justify-content:space-between;
  padding: 0 3rem;
  gap:5rem;
  align-items:center;
  background: ${({ theme }) => theme.colors.bar};
  font-size: 14px;

  .title {
    font-weight: 700;
  }

  a {
    text-decoration: none;
    align-content: center;
    color: ${({ theme }) => theme.colors.text};

  }
`;

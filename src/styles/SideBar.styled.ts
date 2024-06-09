import styled from "styled-components";

export const ContainerSideBar = styled.div`
  background: ${({ theme }) => theme.colors.primary};;
  display: flex;
  flex-wrap: wrap;
  width: 40%;
  height: 600px;
  overflow-y: auto
`;

export const Column = styled.div`
  flex: 0 0 50%;
  box-sizing: border-box;
  padding: 10px;
  position: relative;
  cursor: pointer;
`;

export const TextOverlay = styled.div`
  position: absolute;
  bottom: 13px;
  left: 10px;
  color: white;
  padding: 5px;
  border-radius: 3px;
  background: linear-gradient(transparent, black 100%);
  width: 90%;
`;

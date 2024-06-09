import styled from "styled-components";

export const ButtonStyle = styled.button`
  align-self: flex-start;
  width: 110px;
  height: 60px;
  border-radius: 25px;
  border: none;
  background: linear-gradient(99deg, #236BFE 6.69%, #0D4ED3 80.95%);
  box-shadow: 0px 4px 20px 0px #2269FBCC;
  color:#FEFEFE;
  font-weight: 700;
  line-height: 21.96px;
  font-size: 18px;
  margin-top: 1rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
  box-shadow: 0px 4px 30px 0px #2269FBCC;
  }
`;

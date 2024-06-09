import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;

  @media (max-width: 600px) {
    margin: 0 2rem;
  }
  
`;
export const Title = styled.h2`
  font-size: 42px;
  font-weight: 700;
  line-height: 51px;
  margin: 0;
`;

export const Subtitle = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 26px;
  opacity: 60%;
  margin: 0;
`;

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
  
  @media (max-width: 600px) {
    width: 100%;
    margin-top: 1rem;
  }
`;

export const ForgotPasswordLink = styled.p`
  align-self: flex-start;
  font-weight: 400;
  font-size: 16px;
  line-height: 19.52px;
  opacity: 60%;
  cursor:pointer;
  `;

export const ContainerFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  opacity: 60%;

  strong {
    cursor: pointer;
  }
`;

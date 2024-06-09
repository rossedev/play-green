import styled from "styled-components";

export const InputContainer = styled.div`
  position: relative;
  color: ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  padding: 10px;
  width: 350px;
  margin-top: 1rem;

  @media (max-width: 600px) {
    width: 100%;
    margin-top: 0.5rem;
  }
`;

export const InputField = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  padding-top: 25px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};

  &:focus + label,
  &:not(:placeholder-shown) + label {
    font-weight: 700;
  }

`;

export const InputLabel = styled.label`
  position: absolute;
  top: 20px;
  left: 12px;
  transform: translateY(-50%);
  transition: all 0.3s;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.text};
  line-height: 17.08px;
  opacity: 60%;
  font-size: 14px;
  font-weight: 400;
`;

export const ErrorMessage = styled.p`
  color: #D36060;
  margin: 0.3rem auto 0px 0.2rem;
  font-size: 14px;
  width: 350px;
  text-align: left;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

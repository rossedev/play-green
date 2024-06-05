import styled from "styled-components";

export const Login = () => {
  const Container = styled.div`
  text-align: center;
`;
  const Title = styled.h2`
  font-size: 42px;
  font-weight: 700;
  line-height: 51px;
`;

  const Subtitle = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 26px;
  color: ${({ theme }) => theme.colors.secondary};
`;

  const Input = styled.input`
  width: 330px;
  height: 60px;
  border-radius: 18px;
  border:0;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  padding: 0px 10px;
`;

  return (
    <Container>
      <Title>Welcome</Title>
      <Subtitle>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Subtitle>
      <Input type="text" placeholder="usuario@greenrun.com" />
    </Container>
  );
};

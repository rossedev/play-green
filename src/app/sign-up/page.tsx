"use client";

import { Button } from "../components/ui/Button";
import { useRouter } from "next/navigation";
import {
  Container,
  ContainerFooter,
  ContainerForm,
  Title,
} from "@/styles/Form.styled";
import { Input } from "../components/ui/Input";
import { useForm } from "@/hooks/useForm";
import { ErrorMessage } from "@/styles/Input.styled";

export default function SignUpPage() {
  const router = useRouter();
  const { errors, form, handleChange, handleSignUp } = useForm();

  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <Container>
      <Title>Create an account</Title>
      <ContainerForm>
        <Input
          type="text"
          label="Email"
          placeholder="usuario@greenrun.com"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange("email", e);
          }}
          value={form.email}
        />
        {!!errors &&
          errors.map((error) =>
            error.name === "email" ? (
              <ErrorMessage key={error.name}>{error.message}</ErrorMessage>
            ) : (
              ""
            )
          )}
        <Input
          type="password"
          label="Password"
          placeholder="**********"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange("password", e);
          }}
          value={form.password}
        />
        {!!errors &&
          errors.map((error) =>
            error.name === "password" ? (
              <ErrorMessage key={error.name}>{error.message}</ErrorMessage>
            ) : (
              ""
            )
          )}

        <Button
          style={{ marginTop: "2rem" }}
          title="Create"
          onClick={handleSignUp}
        />
      </ContainerForm>

      <ContainerFooter>
        <p>
          Or <strong onClick={handleRedirect}>Log In</strong>
        </p>
      </ContainerFooter>
    </Container>
  );
}

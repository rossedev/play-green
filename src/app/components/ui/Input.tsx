import { InputContainer, InputField, InputLabel } from "@/styles/Input.styled";

export const Input = (props: any) => {
  return (
    <InputContainer>
      <InputField {...props} />
      <InputLabel>{props.label}</InputLabel>
    </InputContainer>
  );
};

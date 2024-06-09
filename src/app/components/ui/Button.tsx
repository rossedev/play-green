import { ButtonStyle } from "@/styles/Button.styled";
import { MouseEventHandler } from "react";
import { CSSProperties } from "styled-components";

interface ButtonProps {
  style?: CSSProperties;
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Button = (props: ButtonProps) => {
  return (
    <ButtonStyle type="button" {...props}>
      {props.title}
    </ButtonStyle>
  );
};

import { ITheme } from "@/types/theme";

export const lightTheme: ITheme = {
  namespace: "lightTheme",
  colors: {
    primary: "#FFFFFF",
    background: "#F3F3F3",
    text: "#161617",
    secondary: "#242425",
  },
};

export const darkTheme: ITheme = {
  namespace: "darkTheme",
  colors: {
    primary: "#2F2F43",
    background: "#181828",
    text: "#FEFEFE",
    secondary: "#d7d5d5",
  },
};

export const colors = {
  blueGradiant: "linear-gradient(to right, #236BFE, #0D4ED3)",
  red: "#D36060",
  gray: "#777777",
};

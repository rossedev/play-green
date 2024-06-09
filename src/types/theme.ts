export interface ITheme {
  namespace: string;
  colors: {
    primary: string;
    background: string;
    text: string;
    secondary: string;
    border: string;
    bar?: string;
    currentBackground: string;
    currentText: string;
  };
}

import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import { ThemeProvider } from "@/context/ThemeContext";
import { GlobalStyle } from "../styles/global";
import { UserProvider } from "@/context/UserContext";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <UserProvider>
            <StyledComponentsRegistry>
              <GlobalStyle />
              {children}
            </StyledComponentsRegistry>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

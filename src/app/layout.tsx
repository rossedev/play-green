import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import { ThemeProvider } from "@/context/ThemeContext";
import { GlobalStyle } from "../styles/global";
import { UserProvider } from "@/context/UserContext";
import { ToastContainer } from "react-toastify";
import { SportsProvider } from "@/context/SportsContext";
import "react-toastify/dist/ReactToastify.css";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Play green",
  description: "Play green",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <ThemeProvider>
            <SportsProvider>
              <StyledComponentsRegistry>
                <GlobalStyle />
                <ToastContainer />
                {children}
              </StyledComponentsRegistry>
            </SportsProvider>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}

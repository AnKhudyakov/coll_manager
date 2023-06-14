import Navbar from "@/components/Navbar";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "@mui/material/styles";

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <main>{children}</main>
    </ThemeProvider>
  );
};

export default Layout;

import Navbar from "@/components/Navbar";
import { useTheme } from "@/hooks/useTheme";
import { ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import { ThemeContext } from "@/hooks/useTheme";

const Layout = ({ children }) => {
  const [theme, themeMode, mode] = useTheme();
  const memoizedColor = useMemo(
    () => ({
      toggleTheme: themeMode.toggleTheme,
      mode,
    }),
    [themeMode.toggleTheme, mode]
  );
  return (
    <ThemeContext.Provider value={memoizedColor}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <main>{children}</main>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default Layout;

import Navbar from "@/components/Navbar";
import { useTheme } from "@/hooks/useTheme";
import { ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import { ColorModeContext } from "@/hooks/useTheme";

const Layout = ({ children }) => {
  const [theme, colorMode, mode] = useTheme();
  const memoizedColor = useMemo(
    () => ({
      toggleColorMode: colorMode.toggleColorMode,
      mode,
    }),
    [colorMode.toggleColorMode, mode]
  );
  return (
    <ColorModeContext.Provider value={memoizedColor}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <main>{children}</main>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Layout;

import Header from "@/components/Header";
import { ThemeContext, useTheme } from "@/hooks/useTheme";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, error }) => {
  const { t } = useTranslation("translation", { keyPrefix: "auth" });
  const [theme, themeMode, mode] = useTheme();
  const memoizedColor = useMemo(
    () => ({
      toggleTheme: themeMode.toggleTheme,
      mode,
    }),
    [themeMode.toggleTheme, mode]
  );
  useEffect(() => {
    if (error?.status === 401) {
      toast.info(t("info"));
    }
  }, [error]);
  return (
    <ThemeContext.Provider value={memoizedColor}>
      <ThemeProvider theme={theme}>
        <Header />
        <main>{children}</main>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default Layout;

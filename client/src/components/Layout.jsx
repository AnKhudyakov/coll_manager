import Header from "@/components/Header";
import { selectRelogin } from "@/features/auth/authSlice";
import { ThemeContext, useTheme } from "@/hooks/useTheme";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children , isLoading}) => {
  const { t } = useTranslation("translation", { keyPrefix: "auth" });
  const relogin = useSelector(selectRelogin);
  const [theme, themeMode, mode] = useTheme();
  const memoizedColor = useMemo(
    () => ({
      toggleTheme: themeMode.toggleTheme,
      mode,
    }),
    [themeMode.toggleTheme, mode]
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (relogin && !isLoading) {
      toast(t("relogin"));
     // navigate("/login");
    }
  }, [relogin]);
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

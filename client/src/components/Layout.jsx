import Header from "@/components/Header";
import { setCredentials } from "@/features/auth/authSlice";
import { getUser, unsetToken } from "@/helpers/auth";
import { ThemeContext, useTheme } from "@/hooks/useTheme";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, error }) => {
  const { t } = useTranslation("translation", { keyPrefix: "auth" });
  const dispatch = useDispatch();
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
    if (error) {
      console.log("LAYOUT");
      unsetToken();
      toast(t("relogin"));
      dispatch(setCredentials({ user: null }));
      navigate("/login");
    }
  }, [error]);
  useEffect(() => {
    const user = getUser();
    if (user) {
      dispatch(setCredentials({ user }));
    } else {
      navigate("/login");
    }
  }, []);

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

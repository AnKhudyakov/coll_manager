import { createTheme } from "@mui/material";
import { useEffect, useMemo, useState, createContext } from "react";
import { useDispatch } from "react-redux";
import { themeOptions } from "@/styles/theme";
import { setThemeColor } from "@/features/theme/themeSlice";

export const ThemeContext = createContext({
  toggleTheme: () => {},
  mode: "dark",
});

export const useTheme = () => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(
    localStorage.getItem("themeMode") || "light"
  );
  const themeMode = useMemo(
    () => ({
      toggleTheme: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
      mode,
    }),
    [setMode, mode]
  );
  const theme = useMemo(() => createTheme(themeOptions(mode)), [mode]);
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
    dispatch(setThemeColor(mode));
  }, [mode]);
  return [theme, themeMode, mode];
};

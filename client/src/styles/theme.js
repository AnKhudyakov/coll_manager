export const shades = {
  primary: {
    100: "#cccccc",
    200: "#999999",
    300: "#666666",
    400: "#333333",
    500: "#515151",
    600: "#a1a1a1",
    700: "#e0e0e0",
    800: "#000000",
    900: "#ffffff",
  },
  secondary: {
    100: "#f7ccd2",
    200: "#ef99a4",
    300: "#e66677",
    400: "#de3349",
    500: "#d6001c",
    600: "#ab0016",
    700: "#f44336",
    800: "#d32f2f",
    900: "#2b0006",
  },
  neutral: {
    100: "#f5f5f5",
    200: "#ecebeb",
    300: "#e2e1e1",
    400: "#d9d7d7",
    500: "#cfcdcd",
    600: "#444444",
    700: "#333333",
    800: "rgba(12,12,12,0.8)",
    900: "#000000",
  },
};

export const themeOptions = (mode) => {
  return {
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: shades.primary[600],
            },
            secondary: {
              main: shades.secondary[400],
            },
            neutral: {
              dark: shades.neutral[700],
              main: shades.neutral[500],
              light: shades.neutral[200],
            },
            background: {
              dark: shades.neutral[800],
              main: shades.neutral[700],
              light: shades.neutral[600],
              default: "#1d1d1d",
            },
            text: {
              primary: shades.primary[100],
              secondary: shades.primary[200],
              main: shades.secondary[400],
              hover: shades.secondary[200],
              error: shades.secondary[700],
            },
          }
        : {
            primary: {
              main: shades.primary[500],
            },
            secondary: {
              main: shades.secondary[500],
            },
            neutral: {
              dark: shades.neutral[700],
              main: shades.neutral[500],
              light: shades.neutral[200],
            },
            background: {
              dark: shades.primary[200],
              main: shades.neutral[300],
              light: shades.neutral[100],
              default: shades.primary[900],
            },
            text: {
              primary: shades.primary[400],
              main: shades.secondary[500],
              hover: shades.secondary[300],
              error: shades.secondary[800],
            },
          }),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: "black",
            backgroundColor: shades.neutral[400],
            "&:hover": {
              backgroundColor: shades.neutral[500],
            },
          },
        },
      },
    },
    typography: {
      fontFamily: ["Fauna One", "sans-serif"].join(","),
      fontSize: 11,
      h1: {
        fontFamily: ["Cinzel", "sans-serif"].join(","),
        fontSize: 48,
      },
      h2: {
        fontFamily: ["Cinzel", "sans-serif"].join(","),
        fontSize: 36,
      },
      h3: {
        fontFamily: ["Cinzel", "sans-serif"].join(","),
        fontSize: 20,
      },
      h4: {
        fontFamily: ["Cinzel", "sans-serif"].join(","),
        fontSize: 14,
      },
      h5: {
        fontFamily: ["Cinzel", "sans-serif"].join(","),
        fontSize: 12,
      },
    },
  };
};

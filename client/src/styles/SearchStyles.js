import { InputBase } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.background.light, 0.55),
  "&:hover": {
    backgroundColor: alpha(theme.palette.background.main, 0.55),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginRight: "2px",
    marginLeft: "2px",
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.secondary,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "25vw",
      maxWidth: "400px",
      "&:focus": {
        width: "30vw",
        maxWidth: "400px",
      },
    },
  },
}));

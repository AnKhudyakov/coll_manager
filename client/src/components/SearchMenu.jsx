import { styled, alpha } from "@mui/material/styles";
import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
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

const SearchMenu = () => {
  const { t } = useTranslation("translation", { keyPrefix: "header" });
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.currentTarget.value);
    navigate(`/search?text=${e.target.value}`);
  };

  return (
    <Box
      zIndex={10}
      width="45%"
      maxWidth="470px"
      height="36px"
      borderRadius=" 0px 0 0 5px"
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={t("search")}
          inputProps={{ "aria-label": "search" }}
          value={value}
          onChange={handleChange}
        />
      </Search>
    </Box>
  );
};
export default SearchMenu;

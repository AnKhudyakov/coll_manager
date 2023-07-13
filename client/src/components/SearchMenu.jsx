import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "@/styles/SearchStyles";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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
      width="100%"
      maxWidth="350px"
      height="36px"
      borderRadius=" 0px 0 0 5px"
    >
      <Search >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={t("search")}
          inputProps={{ "aria-label": "search" }}
          value={value}
          onChange={handleChange}
          onBlur = {()=>setValue("")}
        />
      </Search>
    </Box>
  );
};
export default SearchMenu;

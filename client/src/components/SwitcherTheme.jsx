import React, { useContext } from "react";
import { FormGroup, IconButton } from "@mui/material";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import { ThemeContext } from "@/hooks/useTheme";

const SwitcherTheme = () => {
  const { toggleTheme, mode } = useContext(ThemeContext);

  return (
    <FormGroup>
      {mode === "dark" ? (
        <IconButton color="text.secondary" onClick={toggleTheme}>
          <WbSunnyOutlinedIcon />
        </IconButton>
      ) : (
        <IconButton color="text.secondary" onClick={toggleTheme}>
          <ModeNightOutlinedIcon />
        </IconButton>
      )}
    </FormGroup>
  );
};

export default SwitcherTheme;

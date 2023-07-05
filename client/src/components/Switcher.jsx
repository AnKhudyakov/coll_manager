import React, { useContext } from "react";
import { FormGroup, IconButton } from "@mui/material";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import { ColorModeContext } from "@/hooks/useTheme";

const Switcher = () => {
  const { toggleColorMode, mode } = useContext(ColorModeContext);

  return (
    <FormGroup sx={{ flexGrow: 1, display: "flex", mr: 1 }}>
      {mode === "dark" ? (
        <IconButton color="text.secondary" onClick={toggleColorMode}>
          <WbSunnyOutlinedIcon />
        </IconButton>
      ) : (
        <IconButton color="inherit" onClick={toggleColorMode}>
          <ModeNightOutlinedIcon />
        </IconButton>
      )}
    </FormGroup>
  );
};

export default Switcher;

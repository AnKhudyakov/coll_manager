import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

const SwitcherLang = () => {
  const { i18n } = useTranslation();

  const handleSwitchLang = useCallback(() => {
    i18n.changeLanguage(i18n.language === "en" ? "cz" : "en");
  }, [i18n]);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={i18n.language === "en"}
            onChange={handleSwitchLang}
            color="default"
          />
        }
        label={i18n.language.toUpperCase()}
        sx={{
          "& .MuiTypography-root": {
            color: "text.secondary",
          },
        }}
      />
    </FormGroup>
  );
};

export default SwitcherLang;

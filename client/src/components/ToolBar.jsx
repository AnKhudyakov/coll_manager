import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const ToolBar = ({ filter, setFilter, customFields }) => {
  const { t } = useTranslation("translation", { keyPrefix: "collection" });
  const isNonMobile = useMediaQuery("(min-width:700px)");
  return (
    <Box display="flex" gap={2} flexDirection={isNonMobile ? "row" : "column"}>
      <FormControl fullWidth>
        <TextField
          value={filter.query}
          label={t("filter")}
          onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        ></TextField>
      </FormControl>
      <Box
        display="flex"
        justifyContent={"space-between"}
        minWidth={isNonMobile ? "400px" : "100%"}
        flexDirection={isNonMobile ? "row" : "column"}
        gap={2}
      >
        <FormControl fullWidth>
          <InputLabel>{t("sort")}</InputLabel>
          <Select
            value={filter.sort}
            label={t("sort")}
            onChange={(selectedSort) =>
              setFilter({ ...filter, sort: selectedSort.target.value })
            }
          >
            {customFields
              .filter((field) => field.type !== "checkbox")
              .map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>{t("order")}</InputLabel>
          <Select
            value={filter.order}
            label={t("order")}
            onChange={(selectedSort) =>
              setFilter({ ...filter, order: selectedSort.target.value })
            }
          >
            <MenuItem value="asc">A-Z</MenuItem>
            <MenuItem value="desc">Z-A</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default ToolBar;

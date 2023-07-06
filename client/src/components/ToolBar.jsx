import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const ToolBar = ({ filter, setFilter, customFields }) => {
  const { t } = useTranslation("translation", { keyPrefix: "collection" });
  return (
    <Box display="flex" gap={3}>
      <FormControl fullWidth>
        <TextField
          value={filter.query}
          label={t("filter")}
          onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        ></TextField>
      </FormControl>
      <FormControl fullWidth sx={{ maxWidth: "200px" }}>
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
      <FormControl fullWidth sx={{ maxWidth: "200px" }}>
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
  );
};

export default ToolBar;

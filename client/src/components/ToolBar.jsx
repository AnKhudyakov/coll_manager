import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const ToolBar = ({ filter, setFilter, customFields }) => {
  return (
    <Box display="flex" gap={3}>
      <FormControl fullWidth>
        <TextField
          value={filter.query}
          label="Filter by name"
          onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        ></TextField>
      </FormControl>
      <FormControl fullWidth sx={{ maxWidth: "200px" }}>
        <InputLabel>Sort by</InputLabel>
        <Select
          value={filter.sort}
          label="Sort by"
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
        <InputLabel>Sort order</InputLabel>
        <Select
          value={filter.order}
          label="Sort order"
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

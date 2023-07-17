import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ItemRow = ({ item, index }) => {
  const navigate = useNavigate();
  return (
    <TableRow
      onClick={() => navigate(`/items/${item._id}`)}
      sx={(theme) => ({
        "&:last-child td, &:last-child th": { border: 0 },
        backgroundColor: "background.default",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: theme.palette.background.main,
        },
      })}
    >
      <TableCell component="th" scope="row">
        {index + 1}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        sx={{
          position: "sticky",
          left: 0,
          zIndex: 1,
          backgroundColor: "inherit",
          width: "150px",
        }}
      >
        {item.name}
      </TableCell>
      {item?.customFields
        .filter((field) => field.fieldType !== "textarea")
        .map((field, index) => (
          <TableCell
            key={index}
            align={field.fieldType !== "checkbox" ? "left" : "center"}
          >
            <Box>
              {field.fieldType !== "checkbox" ? (
                <Typography gutterBottom variant="h5" component="div">
                  {Object.values(field)[0]}
                </Typography>
              ) : (
                <>
                  {Object.values(field)[0] ? (
                    <CheckCircleOutlineIcon />
                  ) : (
                    <HighlightOffIcon />
                  )}
                </>
              )}
            </Box>
          </TableCell>
        ))}
    </TableRow>
  );
};

export default ItemRow;

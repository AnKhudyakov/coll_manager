import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Copyright = ({ content }) => {
  return (
    <Typography
      sx={{ m: 5 }}
      variant="body2"
      color="text.secondary"
      align="center"
    >
      {content} ©{" "}
      <Link color="inherit" to="https://github.com/AnKhudyakov" target="_blank">
        Khudyakov Andrew
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;

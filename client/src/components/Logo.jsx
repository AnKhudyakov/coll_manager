import { Box, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  const isNonMobile = useMediaQuery("(min-width:740px)");
  return (
    <Box display="flex" alignItems="center">
      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography
          color="text.main"
          variant={!isNonMobile ? "h5" : "h4"}
          sx={{
            px: 2,
            maxWidth: "130px",
            "&:hover": {
              color: "text.hover",
            },
          }}
        >
          COLLECTION MANAGER
        </Typography>
      </Link>
    </Box>
  );
};

export default Logo;

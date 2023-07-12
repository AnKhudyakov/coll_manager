import { Box, useMediaQuery } from "@mui/material";
import Logo from "./Logo";
import Navbar from "./Navbar";

const Header = () => {
  const isNonTablet = useMediaQuery("(min-width:970px)");
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        height="60px"
        bgcolor="background.dark"
        position="fixed"
        top="0"
        left="0"
        zIndex="2"
        justifyContent="space-between"
      >
        <Box
          px={2}
          width={isNonTablet ? "1250px" : "100%"}
          mx="auto"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Logo />
          <Navbar />
        </Box>
      </Box>
    </>
  );
};

export default Header;

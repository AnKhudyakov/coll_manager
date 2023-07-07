import SearchMenu from "@/components/SearchMenu";
import { selectCurrentUser, setCredentials } from "@/features/auth/authSlice";
import { unsetToken } from "@/helpers/auth";
import { shades } from "@/styles/theme";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  PersonOutline,
  SupervisorAccount,
} from "@mui/icons-material";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SwitcherLang from "./SwitcherLang";
import SwitcherTheme from "./SwitcherTheme";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const isNonTablet = useMediaQuery("(min-width:700px)");
  const handleLogout = () => {
    dispatch(setCredentials({ user: null, token: null }));
    unsetToken(navigate);
  };

  return (
    <nav>
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
          <Link to="/">
            <Box
              sx={{
                "&:hover": {
                  color: `${shades.primary[200]}`,
                },
              }}
              color="text.secondary"
            >
              COLLECTION MANAGER
            </Box>
          </Link>

          <SearchMenu />

          <Box
            px={1}
            display="flex"
            justifyContent="space-between"
            columnGap={isNonTablet ? "60px" : "15px"}
            zIndex="2"
          >
            <Link to="/">
              <IconButton color="text.secondary">
                <HomeOutlined />
              </IconButton>
            </Link>
            {user ? (
              <>
                {user.admin && (
                  <Link to="/admin">
                    <IconButton color="text.secondary">
                      <SupervisorAccount />
                    </IconButton>
                  </Link>
                )}

                <Link to={`/profile/${user._id}`}>
                  <IconButton color="text.secondary">
                    <PersonOutline />
                  </IconButton>
                </Link>
                <SwitcherTheme />
                <SwitcherLang />
                <IconButton onClick={handleLogout} color="text.secondary">
                  <LogoutOutlined />
                </IconButton>
              </>
            ) : (
              <>
                <SwitcherTheme />
                <SwitcherLang />
                <Link to="/login">
                  <IconButton onClick={(e) => {}} color="text.secondary">
                    <LoginOutlined />
                  </IconButton>
                </Link>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </nav>
  );
};

export default Navbar;

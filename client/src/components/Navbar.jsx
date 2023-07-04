import { Link, useNavigate } from "react-router-dom";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { shades } from "@/styles/theme";
import {
  HomeOutlined,
  PersonOutline,
  LoginOutlined,
  LogoutOutlined,
  SupervisorAccount,
} from "@mui/icons-material";
import SearchMenu from "@/components/SearchMenu";
import { unsetToken } from "@/helpers/auth";
import { selectCurrentUser, setCredentials } from "@/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

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
        backgroundColor="rgba(22, 22, 23, .7)"
        color="black"
        position="fixed"
        top="0"
        left="0"
        zIndex="1"
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
              color={shades.primary[100]}
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
              <IconButton sx={{ color: "rgba(255, 255, 255, .8)" }}>
                <HomeOutlined />
              </IconButton>
            </Link>
            {user ? (
              <>
                {user.admin && (
                  <Link to="/admin">
                    <IconButton sx={{ color: "rgba(255, 255, 255, .8)" }}>
                      <SupervisorAccount />
                    </IconButton>
                  </Link>
                )}

                <Link to={`/profile/${user._id}`}>
                  <IconButton sx={{ color: "rgba(255, 255, 255, .8)" }}>
                    <PersonOutline />
                  </IconButton>
                </Link>
                <IconButton
                  onClick={handleLogout}
                  sx={{ color: "rgba(255, 255, 255, .8)" }}
                >
                  <LogoutOutlined />
                </IconButton>
              </>
            ) : (
              <Link to="/login">
                <IconButton
                  onClick={(e) => {}}
                  sx={{ color: "rgba(255, 255, 255, .8)" }}
                >
                  <LoginOutlined />
                </IconButton>
              </Link>
            )}
          </Box>
        </Box>
      </Box>
    </nav>
  );
};

export default Navbar;

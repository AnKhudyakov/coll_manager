import SearchMenu from "@/components/SearchMenu";
import { selectCurrentUser, setCredentials } from "@/features/auth/authSlice";
import { unsetToken } from "@/helpers/auth";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  PersonOutline,
  SupervisorAccount,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AlertDialog from "./AlertDialog";
import SwitcherLang from "./SwitcherLang";
import SwitcherTheme from "./SwitcherTheme";

const Navbar = () => {
  const { t } = useTranslation("translation", { keyPrefix: "header" });
  const [open, setOpen] = useState(false);
  const user = useSelector(selectCurrentUser);
  const isNonTablet = useMediaQuery("(min-width:700px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setCredentials({ user: null, token: null }));
    setOpen(false);
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
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                color: "text.main",
                "&:hover": {
                  color: "text.hover",
                },
              }}
            >
              COLLECTION MANAGER
            </Typography>
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
                <IconButton
                  onClick={() => setOpen(true)}
                  color="text.secondary"
                >
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
      <AlertDialog
        open={open}
        setOpen={setOpen}
        confirmBtn={t("signoutBtn")}
        confirmText={t("confirmText")}
        confirmTitle={t("confirmTitle")}
        handleConfirm={handleLogout}
      />
    </nav>
  );
};

export default Navbar;

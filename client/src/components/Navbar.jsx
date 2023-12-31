import { useLogoutMutation } from "@/app/services/auth";
import SearchMenu from "@/components/SearchMenu";
import { selectCurrentUser, setLogout } from "@/features/auth/authSlice";
import { unsetToken } from "@/helpers/auth";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  PersonOutline,
  SupervisorAccount,
} from "@mui/icons-material";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AlertDialog from "./AlertDialog";
import NavMenu from "./NavMenu";
import SwitcherLang from "./SwitcherLang";
import SwitcherTheme from "./SwitcherTheme";

const Navbar = () => {
  const { t } = useTranslation("translation", { keyPrefix: "header" });
  const [open, setOpen] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const user = useSelector(selectCurrentUser);
  const [logout, { isLoading }] = useLogoutMutation();
  const isNonTablet = useMediaQuery("(min-width:970px)");
  const isNonMobile = useMediaQuery("(min-width:740px)");
  const isHovered = useMediaQuery("(hover:hover)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(setLogout());
      setOpen(false);
      unsetToken();
      navigate("/");
      toast.success(t("successSignout"));
    } catch (err) {
      toast.error(err.data.message);
    }
  };
  useEffect(() => {
    if (isNonMobile) setAnchorElNav(null);
  }, [isNonMobile]);
  return (
    <>
      {isNonMobile ? (
        <>
          <SearchMenu />
          <Box
            px={1}
            display="flex"
            justifyContent="space-between"
            alignItems={"center"}
            columnGap={isNonTablet ? "50px" : "20px"}
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
                  <IconButton color="text.secondary">
                    <LoginOutlined />
                  </IconButton>
                </Link>
              </>
            )}
          </Box>
        </>
      ) : (
        <>
          <SwitcherTheme />
          <SwitcherLang />
          <IconButton
            color="text.secondary"
            onClick={(e) => setAnchorElNav(e.currentTarget)}
            onMouseOver={(e) => {
              isHovered ? setAnchorElNav(e.currentTarget) : null;
            }}
          >
            <MenuOutlined fontSize="large" />
          </IconButton>
        </>
      )}
      {anchorElNav && (
        <NavMenu
          setAnchorElNav={setAnchorElNav}
          anchorElNav={anchorElNav}
          user={user}
          setOpen={setOpen}
        />
      )}
      <AlertDialog
        open={open}
        setOpen={setOpen}
        confirmBtn={t("signoutBtn")}
        confirmText={t("confirmText")}
        confirmTitle={t("confirmTitle")}
        handleConfirm={handleLogout}
      />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Navbar;

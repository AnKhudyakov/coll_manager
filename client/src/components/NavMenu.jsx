import SearchMenu from "@/components/SearchMenu";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  PersonOutline,
  SupervisorAccount,
} from "@mui/icons-material";
import { Box, Menu, MenuItem, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NavMenu = ({ setAnchorElNav, anchorElNav, user, setOpen }) => {
  const { t } = useTranslation("translation", { keyPrefix: "header" });
  const isNonMobile = useMediaQuery("(min-width:700px)");
  const navigate = useNavigate();
  return (
    <Menu
      id="apps-menu"
      MenuListProps={{
        sx: {
          width: "100%",
          maxWidth: "100%",
          height: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
        },
      }}
      anchorEl={anchorElNav}
      open={Boolean(anchorElNav)}
      onClose={() => setAnchorElNav(null)}
      sx={{
        top: "0px",
        left: isNonMobile ? 0 : "-2%",
        "& .MuiMenuItem-root": { display: "block", height: "100%" },
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          width: "30%",
          minWidth: "275px",
          padding: "10px",
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 20,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
    >
      <MenuItem
        onClick={() => {
          navigate("/");
          setAnchorElNav(null);
        }}
        sx={{
          block: "block",
          height: "100px",
          width: "100%",
        }}
      >
        <Box color="text.secondary" textAlign="center">
          <HomeOutlined />
        </Box>
        <Typography textAlign="center">{t("home")}</Typography>
      </MenuItem>

      {user ? (
        <Box width={"100%"}>
          {user.admin && (
            <MenuItem
              onClick={() => {
                navigate("/admin");
                setAnchorElNav(null);
              }}
              sx={{
                block: "block",
                height: "100px",
                width: "100%",
              }}
            >
              <Box color="text.secondary" textAlign="center">
                <SupervisorAccount />
              </Box>
              <Typography textAlign="center">{t("adminPanel")}</Typography>
            </MenuItem>
          )}

          <MenuItem
            onClick={() => {
              navigate(`/profile/${user._id}`);
              setAnchorElNav(null);
            }}
            sx={{
              block: "block",
              height: "100px",
              width: "100%",
            }}
          >
            <Box color="text.secondary" textAlign="center">
              <PersonOutline />
            </Box>
            <Typography textAlign="center">{t("profile")}</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpen(true);
              setAnchorElNav(null);
            }}
            sx={{
              block: "block",
              height: "100px",
              width: "100%",
            }}
          >
            <Box color="text.secondary" textAlign="center">
              <LogoutOutlined />
            </Box>
            <Typography textAlign="center">{t("signoutBtn")}</Typography>
          </MenuItem>
        </Box>
      ) : (
        <MenuItem
          onClick={() => {
            navigate("/login");
            setAnchorElNav(null);
          }}
          sx={{
            block: "block",
            height: "100px",
            width: "100%",
          }}
        >
          <Box color="text.secondary" textAlign="center">
            <LoginOutlined />
          </Box>
          <Typography textAlign="center">{t("signinBtn")}</Typography>
        </MenuItem>
      )}
      <Box
        sx={{
          block: "block",
          width: "100%",
        }}
      >
        <Box color="text.secondary" textAlign="center">
          <SearchMenu />
        </Box>
      </Box>
    </Menu>
  );
};

export default NavMenu;

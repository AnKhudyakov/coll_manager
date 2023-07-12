import {
  useRemoveUserMutation,
  useUpdateUserMutation,
} from "@/app/services/user";
import AlertDialog from "@/components/AlertDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Users = ({ users, setOpen, open }) => {
  const navigate = useNavigate();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [removeUser, { isLoading: isRemoving }] = useRemoveUserMutation();
  const { t } = useTranslation("translation", { keyPrefix: "admin" });
  return (
    <>
      {isUpdating || isRemoving ? (
        <Box
          display="flex"
          justifyContent="center"
          minHeight="100vh"
          alignItems="center"
          maxWidth="1250px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell
                  sx={{
                    position: "sticky",
                    left: 0,
                    zIndex: 1,
                    backgroundColor: "background.default",
                    width: "10%",
                  }}
                >
                  {t("username")}
                </TableCell>
                <TableCell align="left">{t("email")}</TableCell>
                <TableCell align="center">{t("admin")} </TableCell>
                <TableCell align="center">{t("blocked")}</TableCell>
                <TableCell align="center">{t("delete")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell
                    onClick={() => navigate(`/profile/${user._id}`)}
                    component="th"
                    scope="row"
                    sx={(theme) => ({
                      position: "sticky",
                      left: 0,
                      zIndex: 1,
                      backgroundColor: "background.default",
                      width: "10%",
                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: theme.palette.background.main,
                      },
                    })}
                  >
                    {user.username}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={user.admin}
                      onChange={(e) =>
                        updateUser({
                          id: user._id,
                          admin: e.target.checked,
                        })
                      }
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ zIndex: 999 }}>
                    <Switch
                      checked={user.blocked}
                      onChange={(e) =>
                        updateUser({
                          id: user._id,
                          blocked: e.target.checked,
                        })
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      sx={{ zIndex: 99 }}
                      aria-label="delete"
                      onClick={() => setOpen(true)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <AlertDialog
                      open={open}
                      setOpen={setOpen}
                      confirmBtn={t("delete")}
                      confirmText={t("confirmText")}
                      confirmTitle={t("confirmTitle")}
                      handleConfirm={() => removeUser(user._id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Users;

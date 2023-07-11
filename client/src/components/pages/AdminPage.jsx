import {
  useGetUsersQuery,
  useRemoveUserMutation,
  useUpdateUserMutation,
} from "@/app/services/user";
import AlertDialog from "@/components/AlertDialog";
import withAdminRedirect from "@/hocs/withAdminRedirect";
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
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "admin" });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { data: users, isLoading, error: getUserError } = useGetUsersQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [removeUser, { isLoading: isRemoving }] = useRemoveUserMutation();
  return (
    <Box pt="60px" mx="auto" height="100vh" bgcolor="background.light">
      {isLoading ? (
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
        <Box maxWidth="1250px" mx="auto">
          <Typography variant="h3" color="text.secondary" m={2}>
            {t("users")}:
          </Typography>
          {users?.length ? (
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
                          backgroundColor: "inherit",
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
          ) : (
            <Typography variant="h3" align="center" color="text.secondary">
              {t("notFound")}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

const AdminPageWithAuth = withAdminRedirect(AdminPage);

export default AdminPageWithAuth;

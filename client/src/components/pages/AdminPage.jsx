import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useRemoveUserMutation,
} from "@/app/services/user";
import { selectCurrentUser } from "@/features/auth/authSlice";
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
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AdminPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "admin" });
  const { data: users, isLoading } = useGetUsersQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [removeUser, { isLoading: isRemoving }] = useRemoveUserMutation();
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user]);
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>№</TableCell>
                  <TableCell>{t("username")}</TableCell>
                  <TableCell align="left">{t("email")}</TableCell>
                  <TableCell align="center">{t("admin")} </TableCell>
                  <TableCell align="center">{t("blocked")}</TableCell>
                  <TableCell align="center">{t("delete")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.length ? (
                  <>
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
                        <TableCell component="th" scope="row">
                          <Link to={`/profile/${user._id}`}>
                            {user.username}
                          </Link>
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
                        <TableCell align="center">
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
                            aria-label="delete"
                            onClick={() => removeUser(user._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <TableRow>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="h4"
                        align="center"
                        color="text.secondary"
                      >
                        {t("notFound")}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default AdminPage;

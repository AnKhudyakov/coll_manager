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
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AdminPage = () => {
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
  // const handleUpdate = (e) => {
  //   console.log(e.currentTarget.checked);
  //   updateUser();
  // };
  return (
    <Box
      pt="60px"
      maxWidth="1250px"
      mx="auto"
      height="100%"
      backgroundColor="rgba(255, 255, 255, 1)"
    >
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          height="100vh"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      ) : (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Username</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="center">Admin </TableCell>
              <TableCell align="center">Blocked</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={user._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Link to={`/profile/${user._id}`}>{user.username}</Link>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="center">
                  <Switch
                    checked={user.admin}
                    onChange={(e) =>
                      updateUser({ id: user._id, admin: e.target.checked })
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <Switch
                    checked={user.blocked}
                    onChange={(e) =>
                      updateUser({ id: user._id, blocked: e.target.checked })
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
          </TableBody>
        </Table>
      </TableContainer>)}
    </Box>
  );
};

export default AdminPage;

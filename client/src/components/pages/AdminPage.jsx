import { useGetUsersQuery } from "@/app/services/user";
import Users from "@/components/Users";
import withAdminRedirect from "@/hoc/withAdminRedirect";
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const AdminPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "admin" });
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const { data, isLoading, error } = useGetUsersQuery({
    page,
    limit: 5,
    sort_by: "username",
    sort_order: "asc",
  });
  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data]);
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
          <Typography variant="h3" color="text.primary" m={2}>
            {t("users")}:
          </Typography>
          {users?.length ? (
            <>
              <Users users={users} setOpen={setOpen} open={open} />
              <Pagination
                sx={{ display: "flex", justifyContent: "center", mt: 1 }}
                count={data ? data.totalPages : 1}
                page={page}
                onChange={(e, value) => setPage(value)}
              />
            </>
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

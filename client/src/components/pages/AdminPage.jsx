import { useLazyGetUsersQuery, useGetUsersQuery } from "@/app/services/user";
import Users from "@/components/Users";
import withAdminRedirect from "@/hoc/withAdminRedirect";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

const AdminPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "admin" });
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const { data, isLoading, error, refetch } = useGetUsersQuery({
    page,
    limit: 10,
    sort_by: "username",
    sort_order: "asc",
  });

  const { ref, inView, entry } = useInView({
    threshold: 0.8,
  });

  useEffect(() => {
    if (data) {
      setUsers([...users, ...data]);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (entry) {
      if (inView) {
        setPage(page + 1);
      }
    }
  }, [inView]);
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
              <Box ref={ref} width={"100%"} height={"30px"}></Box>
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

import { Box, Button, Typography } from "@mui/material";
import Profile from "@/components/Profile";
import Collections from "@/features/collection/Collections";
import { useEffect, useState } from "react";
import CollectionForm from "@/features/collection/CollectionForm";
import { selectCurrentUser, setCredentials } from "@/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCollectionsQuery,
  useGetCollectionsByUserQuery,
} from "@/app/services/collection";
import { getUserId } from "@/helpers/auth";
import { useGetUserByIdQuery } from "@/app/services/user";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "profile" });
  const { id } = useParams();
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const { data: user, isLoading: isLoadingUser } = useGetUserByIdQuery(id);
  const { data: collections, isLoading } = user?.admin
    ? useGetCollectionsQuery({
        limit: 10,
        sort_by: "items",
        sort_order: "desc",
      })
    : useGetCollectionsByUserQuery(id);
  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/login");
    }
  }, [user]);

  return (
    <Box pt="60px" height="100%" bgcolor="background.light">
      <Box
        padding="30px"
        overflow="auto"
        minHeight="100vh"
        maxWidth="1250px"
        mx="auto"
      >
        <Box m="20px 0">
          <Profile user={user} />
          <Typography variant="h3" color="text.secondary">
            {t("collections")}:
          </Typography>

          {collections && (
            <Collections variant="profile" collections={collections} />
          )}
          <Box mt={2}>
            {openForm ? (
              <CollectionForm
                setOpenForm={setOpenForm}
                variant="new"
                author={id}
              />
            ) : (
              <Button
                sx={{
                  p: 1,
                  bgcolor: "background.main",
                  color: "text.secondary",
                }}
                onClick={() => setOpenForm(true)}
              >
                {t("addButton")}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;

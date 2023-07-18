import {
  useGetCollectionsByUserQuery,
  useGetCollectionsQuery,
} from "@/app/services/collection";
import { useGetUserByIdQuery } from "@/app/services/user";
import CollectionForm from "@/features/collection/CollectionForm";
import Collections from "@/features/collection/Collections";
import Profile from "@/features/profile/Profile";
import withAuthRedirect from "@/hoc/withAuthRedirect";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "profile" });
  const { id } = useParams();
  const [openForm, setOpenForm] = useState(false);
  const {
    data: user,
    isLoading: isLoadingUser,
    error: getUserError,
  } = useGetUserByIdQuery(id);
  const {
    data: collections,
    isLoading,
    error,
  } = user?.admin
    ? useGetCollectionsQuery({
        limit: 10,
        sort_by: "items",
        sort_order: "desc",
      })
    : useGetCollectionsByUserQuery(id);
  return (
    <Box pt="60px" height="100%" bgcolor="background.light">
      <Box
        padding="30px"
        overflow="auto"
        minHeight="100vh"
        maxWidth="1250px"
        mx="auto"
      >
        <Box>
          {isLoadingUser ? (
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
            <Profile user={user} />
          )}
          <Typography variant="h3" color="text.secondary" mt={3}>
            {t("collections")}:
          </Typography>
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
            <Collections variant="profile" collections={collections} />
          )}
          <Box mt={3}>
            {openForm ? (
              <>
                <Typography variant="h3" color="text.primary">
                  {t("collectionformTitle")}
                </Typography>
                <CollectionForm
                  setOpenForm={setOpenForm}
                  variant="new"
                  author={id}
                />
              </>
            ) : (
              <Button
                sx={{
                  p: 1,
                  px: 3,
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

const ProfilePageWithAuth = withAuthRedirect(ProfilePage);

export default ProfilePageWithAuth;

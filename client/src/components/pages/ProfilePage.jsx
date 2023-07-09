import {
  useGetCollectionsByUserQuery,
  useGetCollectionsQuery,
} from "@/app/services/collection";
import { useGetUserByIdQuery } from "@/app/services/user";
import Profile from "@/components/Profile";
import CollectionForm from "@/features/collection/CollectionForm";
import Collections from "@/features/collection/Collections";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const ProfilePage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "profile" });
  const { id } = useParams();
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const { data: user, isLoading: isLoadingUser, error : getUserError } = useGetUserByIdQuery(id);
  const { data: collections, isLoading, error } = user?.admin
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
        <Box>
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

export default ProfilePage;

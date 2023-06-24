import { Box, Button, Typography } from "@mui/material";
import Profile from "@/components/Profile";
import Collections from "@/features/collection/Collections";
import { useEffect, useState } from "react";
import CollectionForm from "@/features/collection/CollectionForm";
import { selectCurrentUser, setCredentials } from "@/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetCollectionsQuery,
  useGetCollectionsByUserQuery,
} from "@/app/services/collection";
import { getUserId } from "@/helpers/auth";
const ProfilePage = () => {
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const user = useSelector(selectCurrentUser);

  const { data: collections, isLoading } = getUserId()
    ? user?.admin
      ? useGetCollectionsQuery({
          limit: 10,
          sort_by: "items",
          sort_order: "desc",
        })
      : useGetCollectionsByUserQuery(getUserId())
    : "";

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <Box
      pt="60px"
      maxWidth="1250px"
      mx="auto"
      height="100%"
      backgroundColor="rgba(255, 255, 255, 1)"
    >
      <Box padding="30px" overflow="auto" height="100%">
        <Box m="20px 0">
          <Profile user={user} />
          <Typography variant="h3">Your Collections:</Typography>
          <Collections variant="profile" collections={collections} />
          <Box mt={2}>
            {openForm ? (
              <CollectionForm setOpenForm={setOpenForm} variant="new"/>
            ) : (
              <Button onClick={() => setOpenForm(true)}>Add new</Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;

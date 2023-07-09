import { useGetCollectionByIdQuery } from "@/app/services/collection";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { Box, Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ItemForm from "@/features/item/ItemForm";
import Items from "@/features/item/Items";
import Collection from "./Collection";

const CollectionPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "collection" });
  const [openForm, setOpenForm] = useState(false);
  const { id } = useParams();
  const { data: collection, isLoading } = useGetCollectionByIdQuery(id);
  const user = useSelector(selectCurrentUser);

  return (
    <Box pt="60px" width="100%" bgcolor="background.light" minHeight="100vh">
      <Box maxWidth="1250px" mx="auto">
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
          <Box>
            <Collection collection={collection} variant="page" />
            <Typography variant="h3" mt={2} px={5} color="text.secondary">
              {t("items")}:
            </Typography>
            <Items collectionId={id} customFields={collection.customFields} />
            {(collection.author === user?._id || user?.admin) && (
              <Box px={5}>
                {openForm ? (
                  <ItemForm setOpenForm={setOpenForm} collectionId={id} />
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
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CollectionPage;

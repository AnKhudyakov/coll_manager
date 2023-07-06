import { Box, Typography } from "@mui/material";
import {
  useGetCollectionsQuery,
  useGetCollectionsByUserQuery,
} from "@/app/services/collection";
import CollectionCard from "@/features/collection/CollectionCard";
import { useEffect, useState } from "react";
import { getUserId } from "@/helpers/auth";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";

const Collections = ({ variant, collections }) => {
  const { t } = useTranslation("translation", { keyPrefix: "profile" });
  return (
    <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
      <>
        {!collections?.length && variant === "profile" && (
          <Typography variant="h4" color="text.secondary">
            {t("notFound")}
          </Typography>
        )}
        {collections?.map((collection) => (
          <CollectionCard collection={collection} key={collection?._id} />
        ))}
      </>
    </Box>
  );
};

export default Collections;

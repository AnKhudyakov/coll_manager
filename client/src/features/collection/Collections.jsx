import { Box, Typography } from "@mui/material";
import {
  useGetCollectionsQuery,
  useGetCollectionsByUserQuery,
} from "@/app/services/collection";
import CollectionCard from "@/components/CollectionCard";
import { useEffect, useState } from "react";
import { getUserId } from "@/helpers/auth";

const Collections = ({ variant }) => {
  const { data: userCollections, isLoading } =
    variant === "largest"
      ? useGetCollectionsQuery()
      : getUserId()
      ? useGetCollectionsByUserQuery(getUserId())
      : "";
      
  return (
    <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
      {!userCollections?.length && variant === "profile" && (
        <Typography>You don't have any collections yet.</Typography>
      )}
      {userCollections?.map((collection) => (
        <CollectionCard collection={collection} key={collection?._id} />
      ))}
    </Box>
  );
};

export default Collections;

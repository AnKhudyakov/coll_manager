import { Box, Typography } from "@mui/material";
import {
  useGetCollectionsQuery,
  useGetCollectionsByUserQuery,
} from "@/app/services/collection";
import CollectionCard from "@/features/collection/CollectionCard";
import { useEffect, useState } from "react";
import { getUserId } from "@/helpers/auth";
import CircularProgress from "@mui/material/CircularProgress";

const Collections = ({ variant, collections }) => {
  return (
    <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
        <>
          {!collections?.length && variant === "profile" && (
            <Typography>You don't have any collections yet.</Typography>
          )}
          {collections?.map((collection) => (
            <CollectionCard collection={collection} key={collection?._id} />
          ))}
        </>
      
    </Box>
  );
};

export default Collections;

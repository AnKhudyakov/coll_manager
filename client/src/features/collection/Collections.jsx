import { Box, Typography } from "@mui/material";
import {
  useGetCollectionsQuery,
  useGetCollectionsByUserQuery,
} from "@/app/services/collection";
import CollectionCard from "@/components/CollectionCard";
import { useEffect, useState } from "react";
import { getUserId } from "@/helpers/auth";
import CircularProgress from "@mui/material/CircularProgress";

const Collections = ({ variant, collections }) => {
  // const { data: userCollections, isLoading } =
  //   variant === "largest"
  //     ? useGetCollectionsQuery({
  //         limit: 5,
  //         sort_by: "items",
  //         sort_order: "desc",
  //       })
  //     : getUserId()
  //     ? useGetCollectionsByUserQuery(getUserId())
  //     : "";

  return (
    <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
      {/* {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          height="100vh"
          width="100%"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      ) : ( */}
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

import { Box, Typography } from "@mui/material";
import {
  useGetCollectionsQuery,
  useGetCollectionsByUserQuery,
} from "@/app/services/collection";
import CollectionCard from "@/components/CollectionCard";
import { useEffect, useState } from "react";
import { getUserId } from "@/helpers/auth";
// import {
//   selectUserCollections,
//   setUserCollections,
// } from "@/features/collection/collectionSlice";
// import { useSelector, useDispatch } from "react-redux";

const Collections = ({ variant }) => {
 // const dispatch = useDispatch();
 // const userCollections = useSelector(selectUserCollections);
  const { data: userCollections, isLoading } =
    variant === "popular"
      ? useGetCollectionsQuery()
      : useGetCollectionsByUserQuery(getUserId());

  //useEffect(() => {
  //  if (CurrentCollections) {
  //    dispatch(setUserCollections(CurrentCollections));
  // }
 // }, [CurrentCollections]);
  return (
    <Box display="flex" flexDirection="column" gap={2} mt={1}>
      {userCollections?.map((collection) => (
        <CollectionCard collection={collection} key={collection?._id} />
      ))}
    </Box>
  );
};

export default Collections;

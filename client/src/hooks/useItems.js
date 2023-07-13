import { useMemo } from "react";

export const useSortedItems = (items, sort, order) => {
  const sortedItems = useMemo(() => {
    if (sort && sort !== "Item name") {
      return [...items].sort((a, b) => {
        if (order === "asc") {
          return a.customFields
            .filter((field) => Object.keys(field).includes(sort))[0]
            [sort].localeCompare(
              b.customFields.filter((field) =>
                Object.keys(field).includes(sort)
              )[0][sort]
            );
        }
        return b.customFields
          .filter((field) => Object.keys(field).includes(sort))[0]
          [sort].localeCompare(
            a.customFields.filter((field) =>
              Object.keys(field).includes(sort)
            )[0][sort]
          );
      });
    } else if (sort && sort === "Item name") {
      return [...items].sort((a, b) => {
        if (order === "asc") {
          return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
      });
    }
    return items;
  }, [sort, items, order]);
  return sortedItems;
};

export const useItems = (items, sort, query, order) => {
  const sortedItems = useSortedItems(items, sort, order);
  const sortedAndSearchedItems = useMemo(() => {
    return sortedItems.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sortedItems]);

  return sortedAndSearchedItems;
};

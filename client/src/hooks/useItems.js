import { useMemo } from "react";

export const useSortedItems = (items, sort, order) => {
  const sortedItems = useMemo(() => {
    if (sort && sort !== "Item name") {
      return [...items].sort((a, b) => {
        const fieldA = a.customFields.filter((field) =>
          Object.keys(field).includes(sort)
        )[0];
        const fieldB = b.customFields.filter((field) =>
          Object.keys(field).includes(sort)
        )[0];
        if (order === "asc") {
          if (fieldA.fieldType !== "number") {
            console.log(fieldA[sort].localeCompare(fieldB[sort]));
            return fieldA[sort].localeCompare(fieldB[sort]);
          }
          return fieldA[sort] >= fieldB[sort] ? 1 : -1;
        }
        if (fieldA.fieldType !== "number") {
          console.log(fieldB[sort].localeCompare(fieldA[sort]));
          return fieldB[sort].localeCompare(fieldA[sort]);
        }
        return fieldA[sort] >= fieldB[sort] ? -1 : 1;
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

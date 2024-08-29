export const handleNonPrimitiveUpdates = (
  oldItems: string[],
  newItems: string[]
) => {
  const addedItems = newItems.filter(
    (item: string) => !oldItems?.includes(item)
  );

  // filter those items which are not in the updated list, meaning they were removed
  // after filtering map over to add '-' infront of the removed items
  const removedItems = newItems.length
    ? oldItems
        .filter((item) => !newItems.includes(item))
        .map((item) => `-${item}`)
    : [];

  // the items which were in both the old and new array are the unchanged ones
  const unchangedItems = newItems.filter((item: string) =>
    oldItems?.includes(item)
  );

  const updatedItems = newItems
    ? [...removedItems, ...addedItems, ...unchangedItems]
    : oldItems;

  return updatedItems;
};

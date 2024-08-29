export const handleNonPrimitiveUpdates = (
  oldItems: string[],
  newItems: string[]
) => {
  console.log("args received New:", newItems, "Old:", oldItems)

  const addedItems = newItems ? newItems.filter(
    (item: string) => !oldItems?.includes(item)
  ) : [];
  console.log(addedItems)

  // filter those items which are not in the updated list, meaning they were removed
  // after filtering map over to add '-' infront of the removed items
  console.log("inside function before remove")
  const removedItems = (newItems && newItems.length)
    ? oldItems
        .filter((item) => !newItems.includes(item))
        .map((item) => `-${item}`)
    : [];
    console.log("inside function after remove")
    console.log("removed items", removedItems)

  // the items which were in both the old and new array are the unchanged ones
  const unchangedItems = newItems && newItems.filter((item: string) =>
    oldItems?.includes(item)
  );

  const updatedItems = newItems
    ? [...removedItems, ...addedItems, ...unchangedItems]
    : oldItems;

  return updatedItems;
};

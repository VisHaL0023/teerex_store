export const getTotalCartValue = (items = []) => {
  if (!items.length) return 0;
  const total = items
    .map((item) => item.price * item.productQty)
    .reduce((total, n) => total + n);
  return total;
};

export const getTotalItems = (items = []) => {
  if (!items.length) return 0;
  const total = items
    .map((item) => item.productQty)
    .reduce((total, n) => total + n);
  return total;
};

export const isItemInCart = (items, productId) => {
  if (!items.length) return;
  return items.some((item) => item.id === productId);
};

export const handleBasedOnSearch = (value, updatedData) => {
  return updatedData.filter(({ name }) => {
    return name.toLowerCase().indexOf(value.toLowerCase()) > -1;
  });
};

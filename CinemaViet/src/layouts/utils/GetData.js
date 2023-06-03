export const CustomListCategory = (cates) => {
  const lstCateCustom = cates.map((x) => ({
    value: x.categoryId,
    label: x.categoryName,
  }));

  return lstCateCustom;
};

export const CustomListCast = (casts) => {
  const lstCastCustom = casts.map((x) => ({
    value: x.castId,
    label: x.castName,
  }));

  return lstCastCustom;
};

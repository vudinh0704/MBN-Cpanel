export const pageConverter = (offset, limit) => {
  return (offset + limit) / limit;
};

export const pageCounter = (total, limit) => {
  let x = total % limit;
  return (total - x) / limit + (x !== 0 ? 1 : 0);
};

export const getPageInfo = (offset, limit, total) => {
  return {
    page: pageConverter(offset, limit),
    pageCount: pageCounter(total, limit)
  };
};

export const addIndex = (items, offset) => {
  for (let i = 0, j = offset + 1; i < items.length; i++) items[i].index = i + j;
};

export const formatInputKeyword = ({ keyword }) => {
  if (keyword.length == 0) {
    return '';
  }
  keyword = keyword.trim();
  keyword = keyword.toLowerCase();
  return keyword;
};

export const urlFragmentParser = hashedUrl => {
  let params = hashedUrl.substring(1);
  const result = params.split('&').reduce((result, item) => {
    let parts = item.split('=');
    result[parts[0]] = parts[1];
    return result;
  }, {});
  return result;
};

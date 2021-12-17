const size = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

export const device = (function () {
  let resp = { up: {}, only: {} };
  let keys = Object.keys(size);
  for (let i = 0, l = keys.length; i < l; i++) {
    let key = keys[i];
    let min = size[key];
    resp.up[key] = style => `@media (min-width: ${min}px) { ${style} }`;
    if (i < l) {
      let max = size[keys[i + 1]] - 0.2;
      resp.only[key] = style =>
        `@media (min-width: ${min}px) and (max-width: ${max}px) { ${style} }`;
    }
  }
  return resp;
})();

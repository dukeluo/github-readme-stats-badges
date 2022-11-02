const isArray = (x: any) =>
  x != null &&
  x.length >= 0 &&
  Object.prototype.toString.call(x) === "[object Array]";

const isObject = (x: any) =>
  Object.prototype.toString.call(x) === "[object Object]";

const isEmpty = (x: any) =>
  x === "" ||
  (isArray(x) && x.length) === 0 ||
  (isObject(x) && Object.keys(x).length === 0);

export default isEmpty;

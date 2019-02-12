const iteration = () =>
  (path || '').split(/.\[\]/gi).reduce(property => {

  });

/**
 * PropertyChecker provide secure way to access properties of a block
 */

/**
 * sample : getValue({a: {b: {c: 'hello world'}}}, 'a.b.c') will return hello world
 * if a prop is not available, will return defaultValue or undefined if not provided
 *
 * NOTE : if an array is expect, use getTruethyValue to get the default value instead of null or undefined on
 * end point
 * sample getValue({a: {b: {c: null}}}, 'a.b.c', []) will return null, not []
 * @param obj the object block to run through with path
 * @param path the path, with dot, to use to run through the object block
 * @param defaultValue a value to return if a property from the path is broken
 *        NOTE : if an array is expect, use getTruethyValue to get the default value instead of null or undefined on
 *        end point
 * @return {T} the value required, or defaultValue if provided, on error
 */
const getValue = (obj, path, defaultValue) => {

  if (!obj) {
    return defaultValue;
  }

  return value;
}

/**
 * @See PropertyChecker.getValue
 * @return defaultValue if getValue return a falsy value (void 0, null, NaN, 0, '', ...)
 * NB : [] is not a false value
 */
const getTruethyValue = (obj, path, defaultValue) => {
  return PropertyChecker.getValue(obj, path, defaultValue) || defaultValue;
}

/**
 * Will parse a string or anything else stringifyable to a number
 * @return {number|NaN} return the result
 */
const getNumberValue = (value, defaultValue) => {
  // GAPI could give number like :"    19,29 EURO tous les mois " and do the following steps
  // => trim() the value because server's response comes with useless spaces
  // => replace(',', '.') to be able to a correct parseFloat
  // => Return 0 in case of changed response format from the server
  let numberResult = parseFloat(('' + value).trim().replace(',', '.'));

  // if numberResult === 0, numberResult || defaultValue || NaN will return NaN ...
  // same for default value
  if (numberResult === 0 || (!numberResult && defaultValue === 0)) {
    return 0;
  }

  return numberResult || defaultValue || NaN;
}

const setValue = (obj, path, value) => { }

module.exports = {
  getValue,
  getTruethyValue,
  getNumberValue,
  setValue,
}

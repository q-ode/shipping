/**
 * Validates if a parameter is null or empty
 *
 * @param {*} param - the parameter to be validated
 *
 * @return {boolean} - check value
 */
const validateParameter = (param) => {
  return !(!param || param.trim() === '');
};

module.exports = {
  validateParameter
};
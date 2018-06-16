/**
 * Gets the error messages from a sequelize error response object.
 *
 * @param {SequelizeValidationError} response - sequelize error object
 *
 * @return {Array} - an array of all error messages
 */
const getError = (response) => {
  const messages = [];
  if (response.errors) {
    response.errors.forEach((error) => {
      messages.push(error.message);
    });
  }

  return messages;
};

module.exports = {
  getError
};
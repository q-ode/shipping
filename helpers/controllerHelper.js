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

const formatMessages = (messages) => {
  if (messages.length === 1) {
    return messages[0];
  } else if (messages.length > 1) {
    const commaDelimitedMessage = messages.join(', ');

    const positionOfLastComma =
      commaDelimitedMessage.lastIndexOf(',');
    const commaDelimitedMessageEngingWithAndSymbol =
      `${commaDelimitedMessage.substring(0, positionOfLastComma)} &${commaDelimitedMessage.substring(positionOfLastComma + 1)}`;

    return commaDelimitedMessageEngingWithAndSymbol;
  }

  return messages;
};

module.exports = {
  validateParameter,
  formatMessages,
};

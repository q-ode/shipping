const countries = require('country-list')();

module.exports = (sequelize, DataTypes) => {
  const customerAddresses = sequelize.define('customerAddresses', {
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    street: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        checkEmpty: (value) => {
          if (value.trim() === '') {
            throw new Error('Street cannot be empty');
          }
        },
      },
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkEmpty: (value) => {
          if (value.trim() === '') {
            throw new Error('Country Code cannot be empty');
          }
        },
        isIn: {
          args: [countries.getCodes()],
          msg: 'Country given not supported',
        },
      },
    },
  }, {});
  customerAddresses.associate = function (models) {
    customerAddresses.belongsTo(models.customers);
  };
  return customerAddresses;
};

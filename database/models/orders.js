const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkEmpty: (value) => {
          if (value.trim() === '') {
            throw new Error('Customer name cannot be empty');
          }
        }
      }
    },
    customerAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        checkEmpty: (value) => {
          if (value.trim() === '') {
            throw new Error('Customer address cannot be empty');
          }
        }
      }
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkEmpty: (value) => {
          if (value.trim() === '') {
            throw new Error('Item name cannot be empty');
          }
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isFloat: {
          msg: 'Item price must be a number'
        },
        checkNumber: (value) => {
          if (parseInt(value) < 0) {
            throw new Error('Invalid item price');
          }
        }
      }
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['EUR', 'USD']], // this will be give a more robust reference
          msg: 'Currency given not supported'
        },
        checkEmpty: (value) => {
          if (value.trim() === '') {
            throw new Error('Currency cannot be empty');
          }
        }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      default: Sequelize.NOW
    }
  }, {
    hooks: {
      beforeUpdate: setUpdatedDate
    }
  });

  orders.associate = function (models) {
    // associations can be defined here
  };

  return orders;
};

const setUpdatedDate = function (order, options) {
  order.updatedAt = new Date();
};
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('orders', {
    customerName: DataTypes.STRING,
    customerAddress: DataTypes.TEXT,
    item: DataTypes.STRING,
    price: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      default: Sequelize.NOW
    }
  }, {
    hooks: {
      beforeUpdate: setUpdatedDate
    }
  });

  Orders.associate = function (models) {
    // associations can be defined here
  };

  return Orders;
};

const setUpdatedDate = function (order, options) {
  order.updatedAt = new Date();
};
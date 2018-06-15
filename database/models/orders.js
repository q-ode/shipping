module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('orders', {
    id: DataTypes.INTEGER,
    customerName: DataTypes.STRING,
    customerAddress: DataTypes.TEXT,
    item: DataTypes.STRING,
    price: DataTypes.INTEGER,
    currency: DataTypes.STRING
  }, {});

  Orders.associate = function(models) {
    // associations can be defined here
  };

  return Orders;
};
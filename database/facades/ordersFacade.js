const Orders = require('../models').orders;

/**
 * Wraps the orders model and provides the functions more elegantly
 * this also ensures that only fields relevant to orders are returned.
 */
const ordersFacade = {
  /**
   * Queries the orders table for order details based on customer name.
   *
   * @param {String} customerName - name of customer
   *
   * @return {Promise<Array>} - a list of orders
   */
  getOrdersByCustomerName(customerName) {
    return Orders.findAll({
      attributes: ['id', 'item', 'price', 'currency'],
      where: {
        customerName: customerName
      }
    });
  }
};

module.exports = ordersFacade;

const Orders = require('../models').orders;
const modelHelper = require('../../helpers/modelHelper');
const sequelize = require('sequelize');

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
        customerName: customerName.trim()
      }
    });
  },

  /**
   * Queries the orders table for order details based on customer address.
   *
   * @param {String} customerAddress - address of customer
   *
   * @return {Promise<Array>} - a list of orders
   */
  getOrdersByCustomerAddress(customerAddress) {
    return Orders.findAll({
      attributes: ['id', 'item', 'price', 'currency'],
      where: {
        customerAddress: customerAddress.trim()
      }
    });
  },

  /**
   * Creates a new order, and uses a promise to return an appropriate response.
   *
   * @param {Object} payload - object containing required fields
   *
   * @return {Promise<*>} - on success it returns the order on error it returns
   * an array of failed validations
   */
  createOrder(payload) {
    return new Promise((resolve, reject) => {
      const { customerName, customerAddress, item, price, currency } = payload;

      Orders.create({
        customerName, customerAddress, item, price, currency
      })
        .then((order) => {
          resolve(order);
        })
        .catch((error) => {
          reject(modelHelper.getError(error));
        });
    });
  },

  /**
   * Updates and order, and uses a promise to return an appropriate response.
   *
   * @param {Number} id - unique id of the order to be updated
   * @param {Object} newValues - object containing new fields to be updated
   *
   * @return {Promise<*>} - on success it returns the order on error it returns
   * an array of failed validations
   */
  updateOrder(id, newValues) {
    return new Promise((resolve, reject) => {
      Orders.update(newValues, { where: { id }, returning: true })
        .then((response) => {
          /* manual array access here because Sequelize returns an array.
          The first value is the number of rows affected and the second is an
          array of the rows, which will always be an array of one object as the
          id is the primary key.
          */
          if (parseInt(response[0]) === 1) {
            resolve(response[1][0]);
          } else {
            reject(['No records updated.'])
          }
        })
        .catch((error) => {
          reject(modelHelper.getError(error));
        });
    });
  },

  /**
   * Deletes and order, and uses a promise to return an appropriate response.
   *
   * @param {Number} id - unique id of the order to be updated
   *
   * @return {Promise<*>} - on success it returns the order on error it returns
   * an array of failed validations
   */
  deleteOrder(id) {
    return new Promise((resolve, reject) => {
      Orders.destroy({ where: { id } })
        .then((noOfDeletedRecords) => {
          if (parseInt(noOfDeletedRecords) > 0) {
            resolve(noOfDeletedRecords);
          } else {
            reject(['No record deleted.'])
          }
        })
        .catch((error) => {
          reject(modelHelper.getError(error));
        });
    });
  },

  /**
   * Gets all the items ordered and their frequency
   *
   * @return {Promise<Array>} - a list of all ordered items with their counts
   */
  getAllOrderedItemsWithCount() {
    return Orders.findAll({
      attributes: ['item', [sequelize.fn('count', sequelize.col('item')), 'count']],
      group: ['item'],
      raw: true
    });
  }
};

module.exports = ordersFacade;

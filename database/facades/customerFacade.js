const Customers = require('../models').customers;
const CustomerAddresses = require('../models').customerAddresses;
const modelHelper = require('../../helpers/modelHelper');

/**
 * Wraps the orders model and provides the functions more elegantly
 * this also ensures that only fields relevant to orders are returned.
 */
const customersFacade = {

  /**
   * Queries the customers table to get a customer by the id provided. It
   * includes the addresses belonging to the customer.
   *
   * @param {Integer} customerId - the customer id
   *
   * @return {Promise<Object>} - the customer object
   */
  getCustomer(customerId) {
    return new Promise((resolve, reject) => {
      Customers.findById(customerId, {
        include: [{ model: CustomerAddresses, as: 'addresses' }],
      })
        .then((customer) => {
          if (customer) {
            resolve(customer);
          } else {
            reject();
          }
        })
        .catch(error => reject(error));
    });
  },

  /**
   * Updates a customer, and uses a promise to return an appropriate response.
   *
   * @param {Number} id - unique id of the order to be updated
   * @param {Object} newValues - object containing new fields to be updated
   *
   * @return {Promise<*>} - on success it returns the order on error it returns
   * an array of failed validations
   */
  updateCustomer(id, newValues) {
    return new Promise((resolve, reject) => {
      Customers.update(newValues, { where: { id }, returning: true })
        .then((response) => {
          /* manual array access here because Sequelize returns an array.
          The first value is the number of rows affected and the second is an
          array of the rows, which will always be an array of one object as the
          id is the primary key.
          */
          if (parseInt(response[0], 10) === 1) {
            resolve(response[1][0]);
          } else {
            reject(['No records updated']);
          }
        })
        .catch((error) => {
          reject(modelHelper.getError(error));
        });
    });
  },

  /**
   * Deletes a customer, and uses a promise to return an appropriate response.
   *
   * @param {Number} id - unique id of the customer to be deleted
   *
   * @return {Promise<*>} - on success it returns the order on error it returns
   * an array of failed validations
   */
  deleteCustomer(id) {
    return new Promise((resolve, reject) => {
      Customers.destroy({ where: { id } })
        .then((noOfDeletedRecords) => {
          if (parseInt(noOfDeletedRecords, 10) > 0) {
            resolve(noOfDeletedRecords);
          } else {
            reject(['No record deleted']);
          }
        })
        .catch((error) => {
          reject(modelHelper.getError(error));
        });
    });
  },
};

module.exports = customersFacade;

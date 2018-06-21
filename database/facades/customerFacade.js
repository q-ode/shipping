const Sequelize = require('sequelize');
const Customers = require('../models').customers;
const CustomerAddresses = require('../models').customerAddresses;
const Orders = require('../models').orders;
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
            resolve({
              id: customer.id,
              firstname: customer.firstname,
              lastname: customer.lastname,
              dob: customer.dob,
              email: customer.email,
              addresses: customer.addresses,
              createdAt: customer.createdAt,
              updatedAt: customer.updatedAt,
            });
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
            // TODO: update orders table with new customer name in the background
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

  /**
   * Queries the orders table to get all unique customers by item name.
   *
   * @param {String} item - the item name
   *
   * @return {Promise<Object>} - the customer object
   */
  getCustomersByItem(item) {
    return new Promise((resolve, reject) => {
      Orders.findAll({
        attributes: ['customerName'],
        where: { item },
      })
        .then((customerNames) => {
          const formattedCustomerNames =
            customerNames.map(customerName => customerName.customerName);

          this.getCustomersByName(formattedCustomerNames)
            .then(customers => resolve(customers))
            .catch(error => reject(error));
        })
        .catch(error => reject(error));
    });
  },

  /**
   * Queries the database for customers based on their fullname i.e. combination
   * of firstname and lastname.
   *
   * @param {Array<String>} customerNames - the names of the customers
   *
   * @return {Promise<Array<Customers>>} - the customers found
   */
  getCustomersByName(customerNames) {
    return Customers.findAll({
      attributes:
        ['id', 'firstname', 'lastname', 'dob', 'email', 'createdAt', 'updatedAt'],
      where:
        Sequelize.where(Sequelize.fn('concat', Sequelize.col('firstname'), ' ', Sequelize.col('lastname')), {
          $in: customerNames,
        }),
      raw: true,
    });
  },
};

module.exports = customersFacade;

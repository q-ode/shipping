const Customers = require('../models').customers;
const CustomerAddresses = require('../models').customerAddresses;

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
};

module.exports = customersFacade;
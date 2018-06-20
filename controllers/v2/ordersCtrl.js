const ordersFacade = require('../../database/facades/ordersFacade');
const customersFacade = require('../../database/facades/customerFacade');
const validateParameter = require('../../helpers/controllerHelper').validateParameter;

/**
 * The controller for the Orders resource
 */
const ordersCtrl = {

  /**
   * Returns all orders belonging to a particular customer
   *
   * @param req - HTTP Request containing the customer id
   * @param res - HTTP Response
   *
   * @return {Array} - A list of orders belonging to the customer
   */
  getCustomerOrders(req, res) {
    const customerId = req.params.id;

    if (!validateParameter(customerId)) {
      return res.status(400).send({ message: 'Invalid parameter.' });
    }

    customersFacade.getCustomer(customerId)
      .then((customer) => {
        ordersFacade
          .getOrdersByCustomerName(`${customer.firstname} ${customer.lastname}`)
          .then(orders => res.send(orders));
      })
      .catch(() => res.status(404).send({ message: 'Customer not found' }));
  },
};

module.exports = ordersCtrl;

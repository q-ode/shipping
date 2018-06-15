const ordersFacade = require('../database/facades/ordersFacade');
const validateParameter = require('../helpers/controller').validateParameter;

/**
 * The controller for the Orders resource
 */
const ordersCtrl = {

  /**
   * Returns all orders belonging to a particular customer
   *
   * @param req - HTTP Request containing the customer :name
   * @param res - HTTP Response
   *
   * @return {Array} - A list of orders belonging to the customer
   */
  getCustomerOrders(req, res) {
    const customerName = req.params.name;

    if (!validateParameter(customerName)) {
      return res.status(400).send({ message: 'Invalid parameters.' });
    }

    ordersFacade.getOrdersByCustomerName(customerName)
      .then(orders => {
        res.send(orders);
      });
  },

  /**
   * Returns all orders based on customer address
   *
   * @param req - HTTP Request containing the address
   * @param res - HTTP Response
   *
   * @return {Array} - A list of orders for that customer address
   */
  getAddressOrders(req, res) {
    const customerAddress = req.params.address;

    if (!validateParameter(customerAddress)) {
      return res.status(400).send({ message: 'Invalid parameters.' });
    }

    ordersFacade.getOrdersByCustomerAddress(customerAddress)
      .then(orders => {
        res.send(orders);
      });
  },
};

module.exports = ordersCtrl;

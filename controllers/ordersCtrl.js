const ordersFacade = require('../database/facades/ordersFacade');

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
};

const validateParameter = (param) => {
  return !(!param || param.trim() === '');
};

module.exports = ordersCtrl;

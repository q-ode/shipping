const ordersFacade = require('../../database/facades/ordersFacade');
const validateParameter = require('../../helpers/controllerHelper').validateParameter;
const formatMessages = require('../../helpers/controllerHelper').formatMessages;
const sortHelper = require('../../helpers/sortHelper');

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
      return res.status(400).send({ message: 'Invalid parameter.' });
    }

    ordersFacade.getOrdersByCustomerName(customerName)
      .then((orders) => {
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
      return res.status(400).send({ message: 'Invalid parameter' });
    }

    ordersFacade.getOrdersByCustomerAddress(customerAddress)
      .then((orders) => {
        res.send(orders);
      });
  },

  /**
   * Creates an order based on the fields passed
   *
   * @param req - HTTP Request containing the order values
   * @param res - HTTP Response
   *
   * @return {Object} - The created order
   */
  create(req, res) {
    ordersFacade.createOrder(req.body)
      .then(order => res.status(201).send(order))
      .catch(errors => res.status(400).send({ message: formatMessages(errors) }));
  },

  /**
   * Update an order based on the fields passed
   *
   * @param req - HTTP Request containing the order values
   * @param res - HTTP Response
   *
   * @return {Object} - The created order
   */
  update(req, res) {
    const orderId = req.params.id;

    if (!validateParameter(orderId)) {
      return res.status(400).send({ message: 'Invalid parameter.' });
    }

    ordersFacade.updateOrder(orderId, req.body)
      .then(order => res.send(order))
      .catch(errors => res.status(400).send({ message: formatMessages(errors) }));
  },

  /**
   * Deletes an order based on the id
   *
   * @param req - HTTP Request containing the order id
   * @param res - HTTP Response
   */
  delete(req, res) {
    const orderId = req.params.id;

    if (!validateParameter(orderId)) {
      return res.status(400).send({ message: 'Invalid parameter' });
    }

    ordersFacade.deleteOrder(orderId)
      .then(() => res.send())
      .catch(errors => res.status(404).send({ message: formatMessages(errors) }));
  },

  /**
   * Gets a list of all items ordered and the quantity of each
   *
   * @param req - HTTP Request
   * @param res - HTTP Response
   *
   * @return {Array} - and array of items and their count
   */
  getItems(req, res) {
    ordersFacade.getAllOrderedItemsWithCount()
      .then((items) => {
        res.send(sortHelper.sortByCountAndAlphabet(items));
      });
  },
};

module.exports = ordersCtrl;

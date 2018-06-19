const validateParameter = require('../../helpers/controllerHelper').validateParameter;
const customersFacade = require('../../database/facades/customerFacade');

/**
 * The controller for customer resource
 */
const customersCtrl = {

  /**
   * This gets a customer by the id, it also includes all the customer addresses.
   *
   * @param req - Http Request containing the customer id
   * @param res - HTTP Response
   *
   * @return {Object} - the customer
   */
  get(req, res) {
    const customerId = req.params.id;

    if (!validateParameter(customerId)) {
      return res.status(400).send({ message: 'Invalid parameter' });
    }

    customersFacade.getCustomer(parseInt(customerId, 10))
      .then((customer) => {
        res.send(customer);
      })
      .catch(() => res.status(404).send({ message: 'Not found' }));
  },
};

module.exports = customersCtrl;

const ordersCtrl = require('../controllers/ordersCtrl');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({ message: 'success' });
  });

  /*
    Customers
   */
  app.get('/customers/:name/orders', ordersCtrl.getOrdersByCustomer);
};

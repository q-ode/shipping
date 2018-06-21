const customersCtrl = require('../../controllers/v2/customersCtrl');
const ordersCtrl = require('../../controllers/v2/ordersCtrl');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.send({ version: '2.0', message: 'success' });
});

/**
 * Customers
 */
router.get('/customers/:id', customersCtrl.get);
router.put('/customers/:id', customersCtrl.update);
router.delete('/customers/:id', customersCtrl.delete);
router.get('/items/:item/customers', customersCtrl.getCustomersByItem);

/**
 * Orders
 */
router.get('/customers/:id/orders', ordersCtrl.getCustomerOrders);
router.get('/customers/:id/spend', customersCtrl.getTotalSpend);

module.exports = router;

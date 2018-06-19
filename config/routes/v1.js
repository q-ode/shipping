const ordersCtrl = require('../../controllers/v1/ordersCtrl');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.send({ version: '1.0', message: 'success' });
});
/**
 * Orders
 */
router.post('/orders', ordersCtrl.create);
router.put('/orders/:id', ordersCtrl.update);
router.delete('/orders/:id', ordersCtrl.delete);

router.get('/customers/:name/orders', ordersCtrl.getCustomerOrders);
router.get('/addresses/:address/orders', ordersCtrl.getAddressOrders);

/**
 * Items
 */
router.get('/orders/items', ordersCtrl.getItems);

module.exports = router;

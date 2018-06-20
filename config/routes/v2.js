const customersCtrl = require('../../controllers/v2/customersCtrl');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.send({ version: '2.0', message: 'success' });
});

/**
 * Customers
 */
router.get('/customers/:id', customersCtrl.get);
router.put('/customers/:id', customersCtrl.update);

module.exports = router;

const chai = require('chai');
const expect = chai.expect;

const ordersFacade = require('../../../database/facades/ordersFacade');

describe('Orders Facade', () => {
  describe('#getOrdersByCustomerName', () => {
    it('Should return correct number of orders for a valid customer', (done) => {
      ordersFacade.getOrdersByCustomerName('Peter Lustig')
        .then((orders) => {
          expect(orders.length).to.equal(4);
          done();
        })
    });

    it('Should return fields relating to an order', (done) => {
      ordersFacade.getOrdersByCustomerName('Peter Lustig')
        .then((orders) => {
          expect(orders[0]).to.have.property('item');
          expect(orders[0]).to.have.property('price');
          expect(orders[0]).to.have.property('currency');
          done();
        })
    });

    it('Should NOT return fields unrelated to an order', (done) => {
      ordersFacade.getOrdersByCustomerName('Peter Lustig')
        .then((orders) => {
          expect(orders[0]).to.have.not.any.keys(
            'customerName', 'customerAddress'
          );
          done();
        });
    });

    it('Should return no orders for an invalid customer', (done) => {
      ordersFacade.getOrdersByCustomerName('xxxxxxxxxx')
        .then((orders) => {
          expect(orders).to.be.empty;
          done();
        })
    });
  });
});

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

  describe('#getOrdersByCustomerAddress', () => {
    it('Should return correct number of orders for a valid address', (done) => {
      ordersFacade.getOrdersByCustomerAddress('Steindamm 80')
        .then((orders) => {
          expect(orders.length).to.equal(4);
          done();
        })
    });

    it('Should return fields relating to an order', (done) => {
      ordersFacade.getOrdersByCustomerAddress('Steindamm 80')
        .then((orders) => {
          expect(orders[0]).to.have.property('item');
          expect(orders[0]).to.have.property('price');
          expect(orders[0]).to.have.property('currency');
          done();
        })
    });

    it('Should NOT return fields unrelated to an order', (done) => {
      ordersFacade.getOrdersByCustomerAddress('Steindamm 80')
        .then((orders) => {
          expect(orders[0]).to.have.not.any.keys(
            'customerName', 'customerAddress'
          );
          done();
        });
    });

    it('Should return no orders for an invalid customer address', (done) => {
      ordersFacade.getOrdersByCustomerAddress('xxxxxxxxxx')
        .then((orders) => {
          expect(orders).to.be.empty;
          done();
        })
    });
  });

  describe('#getOrdersByCustomerAddress', () => {
    it('Should return correct number of orders for a valid address', (done) => {
      ordersFacade.getOrdersByCustomerAddress('Steindamm 80')
        .then((orders) => {
          expect(orders.length).to.equal(4);
          done();
        })
    });

    it('Should return fields relating to an order', (done) => {
      ordersFacade.getOrdersByCustomerAddress('Steindamm 80')
        .then((orders) => {
          expect(orders[0]).to.have.property('item');
          expect(orders[0]).to.have.property('price');
          expect(orders[0]).to.have.property('currency');
          done();
        })
    });

    it('Should NOT return fields unrelated to an order', (done) => {
      ordersFacade.getOrdersByCustomerAddress('Steindamm 80')
        .then((orders) => {
          expect(orders[0]).to.have.not.any.keys(
            'customerName', 'customerAddress'
          );
          done();
        });
    });

    it('Should return no orders for an invalid customer address', (done) => {
      ordersFacade.getOrdersByCustomerAddress('xxxxxxxxxx')
        .then((orders) => {
          expect(orders).to.be.empty;
          done();
        })
    });
  });

  describe('#createOrder', () => {
    it('Should create an order given valid parameters', (done) => {
      const sampleOrder = {
        customerName: 'John Doe',
        customerAddress: 'Sesame street, 80F',
        item: 'Something borrowed',
        price: 20,
        currency: 'USD'
      };

      ordersFacade.createOrder(sampleOrder)
        .then((order) => {
          expect(order.id).to.not.be.null;
          done();
        })
    });

    it('Should NOT create an order with a missing field', (done) => {
      const sampleOrder = {
        customerAddress: 'Sesame street, 80F',
        item: 'Something borrowed',
        price: 20,
        currency: 'USD'
      };

      ordersFacade.createOrder(sampleOrder)
        .catch((error) => {
          expect(error).to.deep.equal(['orders.customerName cannot be null']);
          done();
        });
    });

    it('Should NOT create an order with an empty field', (done) => {
      const sampleOrder = {
        customerName: '    ',
        customerAddress: 'Sesame street, 80F',
        item: 'Something borrowed',
        price: 20,
        currency: 'USD'
      };

      ordersFacade.createOrder(sampleOrder)
        .catch((error) => {
          expect(error).to.deep.equal(['Customer name cannot be empty']);
          done();
        });
    });

    it('Should NOT create an order with an invalid currency', (done) => {
      const sampleOrder = {
        customerName: 'John Doe',
        customerAddress: 'Sesame street, 80F',
        item: 'Something borrowed',
        price: 20,
        currency: 'YNV'
      };

      ordersFacade.createOrder(sampleOrder)
        .catch((error) => {
          expect(error).to.deep.equal(['Currency given not supported']);
          done();
        });
    });
  });

  describe('#updateOrder', () => {
    it('Should update an order given valid parameters', (done) => {
      const newValues = {
        customerName: 'John Doe',
        customerAddress: 'Sesame street, 80F',
        item: 'Something borrowed',
        price: 20,
        currency: 'USD'
      };

      ordersFacade.updateOrder(8, newValues)
        .then((order) => {
          expect(order.customerName).to.equal(newValues.customerName);
          done();
        })
    });

    it('Should NOT update an order that doesn\'t exist', (done) => {
      const newValues = {
        customerName: 'John Doe',
        customerAddress: 'Sesame street, 80F',
        item: 'Something borrowed',
        price: 20,
        currency: 'USD',
      };

      ordersFacade.updateOrder(30, newValues)
        .catch((errors) => {
          expect(errors).to.deep.equal(['No records updated']);
          done();
        })
    });
  });

  describe('#deleteOrder', () => {
    it('Should delete an order given valid id', (done) => {
      ordersFacade.deleteOrder(8)
        .then((noOfDeletedRecords) => {
          expect(noOfDeletedRecords).to.equal(1);
          done();
        });
    });

    it('Should return and error for an invalid id', (done) => {
      ordersFacade.deleteOrder(20)
        .catch((error) => {
          expect(error).to.deep.equal(['No record deleted']);
          done();
        });
    });
  });

  describe('#getAllOrderedItemsWithCount', () => {
    it('Should return an item with the count', (done) => {
      ordersFacade.getAllOrderedItemsWithCount()
        .then((items) => {
          expect(items[0]).to.have.property('item');
          expect(items[0]).to.have.property('count');
          done();
        });
    });
  });
});

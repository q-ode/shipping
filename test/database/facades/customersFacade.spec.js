const chai = require('chai');
const expect = chai.expect;

const customersFacade = require('../../../database/facades/customerFacade');

describe('Customers Facade', () => {
  describe('#getCustomer', () => {
    it('Should return correct customer for a given id', (done) => {
      customersFacade.getCustomer(1)
        .then((customer) => {
          expect(customer.firstname).to.equal('Peter');
          done();
        });
    });

    it('Should return correct customer addresses along with customer', (done) => {
      customersFacade.getCustomer(1)
        .then((customer) => {
          expect(customer.address).to.not.be.null;
          done();
        });
    });
  });
});
